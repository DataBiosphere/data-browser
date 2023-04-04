### How to run

First, run `npm ci` from the files directory with Node 16.15.1 to download the correct packages.
Then, enter `npm run update-[database]-source` to update the source from a particular dataset,
for instance `npm run update-anvil-source` to retrieve studies from AnVIL. Alternatively, to update all datasets,
run `npm run update-all-ncpi-sources` to update all 4 datasets at once.

### Manual data retrieval

The KFDRC (Kid's First) and AnVIL datasets cannot be queried automatically, making additional steps necessary before
their corresponding scripts can be run.

#### KFDRC

Visit [this page](https://kf-api-fhir-service.kidsfirstdrc.org/ResearchStudy?_total=accurate) and login with a Google
account to get the data. Click the link at the top of the page to get the "Raw JSON", then download the file to
`files/ncpi-catalog/out/kfdrc-studies.json`. You may have to create the `out` folder manually. After this is done, you
may update the source file with `npm run update-kfdrc-source`.

#### AnVIL

Ensure that there is a folder `files/anvil-catalog/out`. Then, obtain the AnVIL dataset by
running `npm run build-anvil-db`.
Ensure that a file `anvil-studies.json` was created in that folder.
Then, running `npm run update-anvil-source` will update the source from that file.
