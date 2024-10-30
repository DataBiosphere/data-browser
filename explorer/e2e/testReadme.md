## Data Explorer End-To-End Tests

### Test Information

All tests are stored in `/explorer/e2e`. Playwright will run tests in any file with the suffix `*.spec.ts`, so long as these files are stored in `/explorer/e2e`.
Tests for a specific configuration are stored as `config_name/config_name-test_name.spec.ts`. While these are the tests
that Playwright actually runs, most test code is stored in `e2e/testFunctions.ts`. These functions contain the
code that runs for all tests, except for tests that are not reused between configurations and that only run in one tab. This allows tests to be repeated
for different tabs in different configurations without reusing code, and means that information that tests
depend on can be stored in one place to make adjusting tests to changes in user-facing content straightforward.
Config-specific constants used for tests are kept in the `config_name/config_name-tabs.ts`, and use interfaces and
custom types in `testInterfaces.ts`.

### Running Tests

#### Running Locally

To run all tests locally, run `npm run test:anvil-cmg` or `npm run test:anvil-catalog`. If there is no server running
on `localhost:3000`, this will create a dev build of the correct configuration and run the tests on Chromium, Firefox, and Webkit (Safari). The tests may be flaky
if run on the `dev:<config>` version instead of a dev build, as the site will run too slow and they may time out. Traces
and screenshots from any tests that fail will be output to `explorer/playwright-report`. To manually run an individual test file,
run `npx playwright test e2e/path-to/filename.spec.ts -c <config_file>`. The available config files are `playwright_anvil.config.ts`
and `playwright_anvil-catalog.config.ts`. To run an individual test, add the argument `-g <test_name>`. More information
about command line options for the test can be found in [Playwright's Documentation](https://playwright.dev/docs/test-cli).
To debug or write tests, it can be useful to use Playwright's UI mode with `npx playwright test --ui`, which allows you
to easily run individual tests, and view the actions Playwright takes step by step and their result.

#### Running in GitHub

All tests are run automatically when a pull request is made, using GitHub Actions. These actions create a dev build
for each configuration, then run the test. When a test passes, it will become visible on GitHub. If one fails, screenshots
and traces can be downloaded from GitHub. To view step by step what happened in the test, visit `trace.playwright.dev`
in a web browser and upload the `trace.zip` file. This web app, which runs entirely in browser, allows you to step
through the actions taken as part of the test and view the impact on the web page.

### Current Tests

#### AnVIL-CMG

- Filters (`anvil-filters.spec.ts`)
  - Check that all filters specified in `e2e/anvil/anvil-tabs.ts` are present, and that clicking them opens a menu with checkboxes
    - This filter runs on all tabs in `anvil-tabs.ts`
  - Check that checking up to the first five entries in the first filter on the datasets tab works and that it does not remove all elements from the list of tabs
  - Check that selecting a filter causes the selected checkbox entries to remain selected across all tabs
    - Currently uses the fourth filter and starts on the "Files" tab
  - Check that the counts next to the filter checkbox match the number of entries once the filter is selected
    - Checks an arbitrary list of six filters on the datasets and activities tab
  - Check that the filter tabs appear with the correct text when the filter is selected, and that they cause the filter to become deselected when clicked
    - Checks an arbitrary list of three filters on the "Files" and "BioSamples" tabs
  - Check that the clear all button deselects all filters, after an arbitrary list is selected
    - Uses an arbitrary list of three filters and runs on the "Files" tab
- Pagination (`anvil-pagination.spec.ts`)
  - Check that, on the first page, the back button is disabled and the forward button is enabled
    - Uses the "Donors" tab only
  - Check that paginating forward on the donors tab keeps the currently displayed page number correct, and that on the last page the back button is enabled and the forward button is enabled
    - Uses a filter to reduce the number of paginations necessary
    - Uses the "Donors" tab only
  - Check that paginating forwards by up to five pages changes the content on the first row of the table, and that paginating backwards causes that text to remain the same
    - Uses the "BioSamples" tab only
- Sort (`anvil-sort.spec.ts`)
  - Check that clicking each table header (the sort button) does not cause the first and last rows of the table to become empty
    - Runs on all headers (so all sort buttons) on all tabs
    - Does not check that any actual sorting occurs, only that the sort buttons exist and do not break the site
    - This limitation is difficult to avoid without making the test dependent on the site data
- Navigation
  - Check that tabs appear as selected properly when tabs are accessed
    - Runs on all tabs
    - `anvil-urls.spec.ts`
  - Check that selecting a different tab changes the current url and that each tab has the correct data headers
    - Runs from "Datasets" to "Activities", "Activities" to "Datasets", "Datasets" to "Files", "Datasets" to "Donors", "Datasets" to "BioSamples"
    - `anvil-tabs-buttons.spec.ts`
  - All tests rely on correct lists of tabs, columns, and filters in `anvil-tabs.ts`
- Backpages (`anvil-backpages.spec.ts`)
  - Test the export process on the "Datasets" tab
    - Selects the first dataset that does not have access control enabled and goes to the export tab on its backpage. Then, selects one filter checkbox for each category, then finally selects the "Export to Terra" button
    - Checks that buttons, text, and loading text appear as expected, and that a new tab appears when the "Export to Terra" button is pressed
    - Relevant text constants are stored in `anvil-tabs.ts`
    - Currently disabled as the export button is disabled
  - Test that access control works properly on the "Datasets" tab
    - Selects a non-access-controlled tab and checks that text associated with access being granted is present, then repeats for an access-controlled tab
    - Relevant text constants are stored in `anvil-tabs.ts`
    - Currently disabled as the export button is disabled
  - Test that data in the sidebar of the "Datasets" tab is the same as the text displayed in the main table
    - Enables all non-preselected columns and read values from all columns in the first row, including n-tag cells. Then selects the backpage for the first row and checks that all matching columns are reflected
    - Requires a list of the values in the sidebar to be present in `anvil-tabs.ts` and that plural labels are defined there for any columns that include n-tag cells
- Index Export (`anvil-index-export-button.spec.ts`)
  - Test the "File Manifest Request" workflow works
    - Runs through the export workfl.ow for "File Manifest Request" Workflow, checking that loading screens and text appear correctly on each page
    - Checks that a download occurs when the "Download Manifest" is clicked
    - Runs only on the Files tab
  - Tests that the counts in the "Selected Data Summary" box match the counts on the index page
    - Does not apply filters
    - Runs only on the BioSamples tab

#### AnVIL-Catalog

- Check that tabs appear as selected properly when tabs are accessed (`anvilcatalog-url.spec.ts`)
  - Runs on all tabs
- Check that selecting a different tab changes the current url and that each tab has the correct data headers
  - Runs from "Studies" to "Consortia", from "Workspaces" to "Studies", and from "Consortia" to "Workspaces"
  - `anvilcatalog-tabs-buttons.spec.ts`
- Sort (`anvil-sort.spec.ts`)
  - Check that clicking each table header (the sort button) does not cause the first and last rows of the table to become empty
    - Runs on all headers (so all sort buttons) on all tabs
- Edit Columns Button (`anvilcatalog-select-tabs.spec.ts`)
  - Check that the checkboxes in the "Edit Columns" button are activated/deselected and deactivated/selected where proper
    - Runs on all tabs
  - Check that selecting all checkboxes in the Edit Columns menu adds the correct headers to the table
    - Only runs on the "Consortia" tab (other tabs do not have editable columns)
- Filters (`anvilcatalog-filters.spec.ts`)
  - Search filters bar
    - Check that filters can be selected through the search bar
    - Check that filters can be deselected through the search bar
    - Both tests run on all tabs
- All tests rely on correct lists of tabs, columns, and filters in `anvilcatalog-tabs.ts`

### Candidate Additional Tests (anvil-cmg):

- File download
- File copy button
- Top counts (# activities, files, biosamples)
- Sign in (probably smoke test / existence only for ease)
- "Contact Us" form
- Edit columns Button (already on AnVIL-Catalog)
- Smoke test buttons at bottom of screen (logos, help, privacy)
- Smoke test "Help & Documentation" buttons
