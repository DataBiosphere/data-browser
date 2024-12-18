import gspread
from enum import Enum
from googleapiclient.discovery import build


import gspread_formatting

class FILE_OVERRIDE_BEHAVIORS(Enum):
    OVERRIDE_IF_IN_SAME_PLACE = 1
    EXIT_IF_IN_SAME_PLACE = 2
    EXIT_ANYWHERE = 3

class WORKSHEET_OVERRIDE_BEHAVIORS(Enum):
    OVERRIDE = 1
    EXIT = 2

FONT_SIZE_PTS = 10
PTS_PIXELS_RATIO = 4/3
DEFAULT_BUFFER_CHARS = 2

def extract_credentials(authentication_response):
    """Extracts the credentials from the tuple from api.authenticate"""
    return authentication_response[3]

def authenticate_gspread(authentication_response):
    """Authenticates the gspread client using the credentials in the tuple from api.authenticate"""
    gc = gspread.authorize(extract_credentials(authentication_response))
    return gc

def authenticate_drive_api(authentication_response):
    """Authenticates the Drive API using the credentials in the tuple from api.authenticate"""
    return build('drive', 'v3', credentials=extract_credentials(authentication_response))

def check_sheet_exists(gc, sheet_name):
    """
    Determine if a sheet named 'sheet_name' exists anywhere in the project. 

    :param gc: the gspread client
    :param sheet_name: the name of the sheet to check for
    :returns: True if the sheet exists, otherwise False
    """
    try:
        gc.open(sheet_name)
        return True
    except gspread.exceptions.SpreadsheetNotFound:
        return False

def execute_drive_list(drive_api, search_params):
    """
    Execute a files().list() request on the Drive API with the given search parameters.
    Returns the 'files' components of the response.

    Positional arguments:
    :param drive_api: the Drive API object
    :param search_params: the search parameters, see https://developers.google.com/drive/api/v3/search-files
    :returns: the 'files' components of the response
    """
    files_found = []
    page_token = None
    while True:
        request = drive_api.files().list(q=search_params, spaces="drive", pageToken=page_token)
        response = request.execute()
        page_token = response.get("nextPageToken", None)
        files_found += response.get("files", [])
        if page_token is None:
            break
    return files_found

def search_for_folder_id(drive_api, folder_name, allow_trashed = False, allow_duplicates = False):
    """
    Search for a folder by name in the Drive API.
    Returns a list of folder ids that match the search criteria.

    :param drive_api: the Drive API object
    :param folder_name: the name of the folder to search for
    :param allow_trashed: whether to include trashed folders in the search, defaults to False
    :param allow_duplicates: whether to allow multiple folders with the same name, defaults to False
    :returns: a list of folder ids that match the search criteria
    """
    search_params = f"name = '{folder_name}' and mimeType = 'application/vnd.google-apps.folder'"
    if not allow_trashed:
        search_params += " and trashed = false"
    
    files = execute_drive_list(drive_api, search_params)
    files_exact_match = tuple(filter(lambda file: file["name"] == folder_name, files))
    
    if len(files_exact_match) > 1:
        if not allow_duplicates:
            raise RuntimeError("Too many files returned")
    
    return [file["id"] for file in files_exact_match]   


def create_sheet_in_folder(authentication_response, sheet_name, parent_folder_name=None, override_behavior=FILE_OVERRIDE_BEHAVIORS.EXIT_ANYWHERE):
    """
    Create a new sheet in the project with the given name and parent folder.
    Returns the new sheet.

    :param authentication_response: the service parameters tuple
    :param sheet_name: the name of the new sheet
    :param parent_folder_name: the name of the parent folder for the new sheet
    :param override_behavior: the behavior to take if the sheet already exists
    :returns: the gspread.Spreadsheet object of the new sheet
    :rtype: gspread.Spreadsheet
    """
    # Build Drive API
    drive_credentials = extract_credentials(authentication_response)
    gc = gspread.authorize(drive_credentials)
    drive_api = build('drive', 'v3', credentials=drive_credentials)
    parent_folder_id = None if parent_folder_name is None else search_for_folder_id(drive_api, parent_folder_name)[0] 
    
    # Check if sheet already exists and handle based on input
    if check_sheet_exists(gc, sheet_name):
        if override_behavior == FILE_OVERRIDE_BEHAVIORS.EXIT_ANYWHERE:
            raise RuntimeError("Sheet already exists")
        matching_search =  f"name = '{sheet_name}' and mimeType = 'application/vnd.google-apps.spreadsheet'"
        if parent_folder_id is None:
            matching_search += " and 'root' in parents"
        else:
            matching_search += f" and '{parent_folder_id}' in parents"
        matching_files = execute_drive_list(drive_api, matching_search)
            
        if len(matching_files) > 0:
            if override_behavior == FILE_OVERRIDE_BEHAVIORS.EXIT_IF_IN_SAME_PLACE:
                raise RuntimeError("File already exists in the same folder")
            elif override_behavior == FILE_OVERRIDE_BEHAVIORS.OVERRIDE_IF_IN_SAME_PLACE:
                for file in matching_files:
                    drive_api.files().delete(fileId=file["id"]).execute()
    # Create file body
    body = {
        'name': sheet_name,
        'mimeType': 'application/vnd.google-apps.spreadsheet',
    }
    if parent_folder_id is not None:
        body["parents"] = [parent_folder_id]
    request = drive_api.files().create(body=body)
    new_sheet = request.execute()

    # Get id of fresh sheet
    spread_id = new_sheet["id"]
     
    # Open new file
    return gc.open_by_key(spread_id)

def fill_worksheet_with_df(
        sheet,
        df,
        worksheet_name,
        overlapBehavior,
        options={
            "bold_header": True,
            "center_header": True,
            "freeze_header": True,
            "column_widths": {"justify": True, "buffer_chars": DEFAULT_BUFFER_CHARS}
        }
    ):
    """
    Fill a worksheet with the contents of a DataFrame.
    If the worksheet already exists, the behavior is determined by overlapBehavior.
    The options dictionary can be used to customize the formatting of the worksheet.

    :param sheet: the gspread.Spreadsheet object
    :param df: the DataFrame to fill the worksheet with
    :param worksheet_name: the name of the worksheet to fill. Cannot be "Sheet1"
    :param overlapBehavior: the behavior to take if the worksheet already exists.
    :param options: the formatting options for the worksheet. 
        Should be a dictionary with optional elements "bold_header", "center_header", "freeze_header", and "column_widths", optional
    """
    # Sheet1 is special since it's created by default, so it's not allowed
    assert worksheet_name != "Sheet1"

    # Check if worksheet already exists and handle based on overlapBehavior
    try: 
        worksheet = sheet.worksheet(worksheet_name)
        if overlapBehavior == WORKSHEET_OVERRIDE_BEHAVIORS.EXIT:
            raise RuntimeError("Worksheet already exists")
    except gspread.exceptions.WorksheetNotFound:
        worksheet = sheet.add_worksheet(
            title=worksheet_name, rows=df.shape[0], cols=df.shape[1]
        )
    
    # Add data to worksheet
    worksheet.update([df.columns.values.tolist()] + df.values.tolist())

    # Format worksheet
    # Justify Column Widths
    if "column_widths" not in options or options["column_widths"]["justify"]:
        text_widths = df.astype(str).columns.map(
            lambda column_name: df[column_name].astype(str).str.len().max()
        )
        header_widths = df.columns.str.len()
        buffer_chars = (
            DEFAULT_BUFFER_CHARS 
            if ("column_widths" not in options or "buffer_chars" not in options["column_widths"]) 
            else options["column_widths"]["buffer_chars"]
        )
        column_widths = [
            round((max(len_tuple) + buffer_chars) * FONT_SIZE_PTS * 1/PTS_PIXELS_RATIO)
            for len_tuple in zip(text_widths, header_widths)
        ]
        column_positions = [
            gspread.utils.rowcol_to_a1(1, i + 1)[0] for i, _ in enumerate(column_widths)
        ]
        gspread_formatting.set_column_widths(worksheet, zip(column_positions, column_widths))
    # Freeze Header
    if "freeze_header" not in options or options["freeze_header"]:
        gspread_formatting.set_frozen(worksheet, rows=1)
    format_options = gspread_formatting.CellFormat()
    # Bold Header
    if "bold_header" not in options or options["bold_header"]:
        format_options += gspread_formatting.CellFormat(textFormat=gspread_formatting.TextFormat(bold=True))
    # Center Header
    if "center_header" not in options or options["center_header"]:
        format_options += gspread_formatting.CellFormat(horizontalAlignment="CENTER")
    gspread_formatting.format_cell_range(
        worksheet,
        f"A1:{gspread.utils.rowcol_to_a1(1, len(df.columns))}",
        format_options
    )

    # Delete Sheet1 if it has been created by default
    if "Sheet1" in [i.title for i in sheet.worksheets()]:
        sheet.del_worksheet(sheet.worksheet("Sheet1"))

def fill_spreadsheet_with_df_dict(sheet, df_dict, overlapBehavior, options={}):
    """
    Fill a sheet with the contents of a dictionary of DataFrames.
    The keys of the dictionary are the names of the worksheets, and the values contain the data to be placed in the sheet.
    If any worksheets would be overidden, the behavior is determined by overlapBehavior.

    :param sheet: the gspread.Spreadsheet object
    :param df_dict: the dictionary of DataFrames to fill the worksheets with
    :param overlapBehavior: the behavior to take if any of the worksheets already exist
    :param options: the formatting options for the worksheets.
        Should be a dictionary with optional elements "bold_header", "center_header", "freeze_header", and "column_widths", optional
    """
    if overlapBehavior == WORKSHEET_OVERRIDE_BEHAVIORS.EXIT:
        for worksheet_name in df_dict.keys():
            try:
                sheet.worksheet(worksheet_name)
                raise RuntimeError("Worksheet already exists")
            except gspread.exceptions.WorksheetNotFound:
                pass
    for worksheet_name, df in df_dict.items():
        fill_worksheet_with_df(sheet, df, worksheet_name, overlapBehavior, options=options)

