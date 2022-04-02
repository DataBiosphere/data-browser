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