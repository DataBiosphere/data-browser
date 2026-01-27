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
This will save any updates to `explorer/site-config/hca-dcp/dev/scripts/out/cellxgene-projects.json` based on HCA links provided by CELLxGENE.

