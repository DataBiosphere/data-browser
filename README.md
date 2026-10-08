# HCA Data Browser

The HCA Data Browser is built using [Next.js](https://nextjs.org/).

## Development Environment Setup

## Prerequisites

Node.js 22.12.0 is required to run the app.

### 1. Clone the Repo

        git clone https://github.com/DataBiosphere/data-browser.git [folder_name]

### 2. Install Client-Side Dependencies

From the project root directory, install client-side dependencies:

		npm install

### 3. Development Server

To start the development server, run the following from the `explorer` directory:

		npm run dev:hca-dcp

You can hit the server at `http://localhost:3000`.

## End-to-end tests

This project has end-to-end tests powered by Playwright, currently only for the `anvil-cmg` configuration and in progress for `anvil-catalog`. To run tests, run `npm run test:anvil-cmg` from the `explorer` folder. Tests will also run by default on pull request.

When updating tabs and columns on the anvil-cmg configuration, please update `explorer/e2e/anvil/anvil-tabs.ts` to reflect the changes  

## Refresh CellXGene projects in HCA Data Explorer
To update HCA scripts in the HCA Data Explorer, navigate to the `explorer` directory and run:
```bash
npm run get-cellxgene-projects-hca
```
This will save any updates to `explorer/site-config/hca-dcp/ma-dev/scripts/out/cellxgene-projects.json` based on HCA links provided by CELLxGENE.


## Refresh diagnosis term names in AnVIL Data Explorer

The Diagnosis filter and column in the AnVIL Data Explorer show names for HP, OMIM and Orphanet term IDs, for example "Abnormality of the kidney (HP:0000077)". The names come from `site-config/anvil-cmg/dev/index/common/diagnosis.ts`, which is generated. An ID that isn't in that file shows up raw.

### When to re-run

- New AnVIL datasets have been indexed, or raw IDs such as `OMIM:310200` show up in the Diagnosis filter or column.
- The Human Phenotype Ontology or Orphadata has published a new release.

### How to run

Run:

```bash
npm run refresh-diagnosis-terms:anvil-cmg
```

No login is needed. The script:

1. Collects the term IDs in the `diagnoses.disease` and `diagnoses.phenotype` facets of the public AnVIL Azul datasets endpoint, and keeps the IDs already in `diagnosis.ts`.
2. Looks up every ID in the latest source files, so names that have changed upstream are updated:
   - HP: `hp.obo` from the latest Human Phenotype Ontology release
   - OMIM: `phenotype.hpoa` from the same release
   - Orphanet (`ORPHA:` or `Orphanet:`): Orphadata's disease list, `en_product1.xml`
3. Writes `diagnosis.ts`, formatted with Prettier.

It takes about a minute, most of it downloading the source files.

### Reading the output

The last lines list the IDs that have no name, grouped by prefix. They will show up raw in the UI.

- An HP, OMIM or Orphanet ID in this list isn't in the source files. That's expected for a handful of retired OMIM IDs.
- Other prefixes, such as `MONDO`, are not looked up. Malformed values, such as `H:0010609`, are data problems to report to the Azul team.

The script stops with an error, and leaves `diagnosis.ts` unchanged, if:

- a download takes longer than 2 minutes. This is usually a stalled connection; run the script again.
- a source file gives no names at all. The download probably returned an error page, or the file's format has changed. Open the URL in the error to see which.

### Checking the result

1. Run `git diff site-config/anvil-cmg/dev/index/common/diagnosis.ts`. Expect added IDs and a few updated names. An ID is removed only if the sources no longer name it, and it then appears in the list of IDs with no name.
2. Run `npm run dev:anvil-cmg`, open the Diagnosis filter, and check that the IDs you were fixing now show names.
3. Commit `diagnosis.ts`.

### Limits

The script reads the datasets endpoint only, because the other endpoints return diagnosis values only to signed-in users, and Azul keeps at most 100 diagnosis values per dataset ([azul#8369](https://github.com/DataBiosphere/azul/issues/8369)). An ID that appears only on the Donors or BioSamples tabs, and isn't already in `diagnosis.ts`, stays raw until it shows up in the datasets facets.
