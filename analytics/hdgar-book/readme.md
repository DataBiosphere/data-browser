## Installing

* In Anaconda Prompt, navigate to this directory

* Install the environment:

  `conda env create -f environment.yml`

## Running

* Activate the environment:

  `conda activate hdgar-book`

* Build the book:

  * As a website:

    `jupyter-book build ./`

  * As a PDF:
  
    `jupyter-book build ./ --builder pdfhtml`

  The output will be located under the `_build` directory, in the appropriate subfolder for the build type

* If you need to delete the previous build results, you can use the `clean` command:

  `jupyter-book clean ./ --all`

## Updating the report

* In `user-analytics.ipynb`:
  * Replace the two mentions of each time period with the new time periods
  * Update the two time period variables
  * If necessary, adjust page breaks, `split_vertical` parameters, `rows_limit` parameters, and/or cell order to make the tables pack more neatly into the pages of the PDF

* In `data-analytics.ipynb`:
  * Update the DCP release passed to `hca.plot_ethnicity` and given in the description following it

* After exporting, rename the PDF to "HCA DCP Data Portal Analytics Report - <end date>.pdf"
