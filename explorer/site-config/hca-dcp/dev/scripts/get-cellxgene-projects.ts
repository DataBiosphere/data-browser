import fsp from "fs/promises";
import got from "got";
import { CellxGeneProjectMapping } from "../../../../app/viewModelBuilders/azul/hca-dcp/common/projectMapper/projectEdits/entities";

/**
 * Generates a list of CELLxGENE collection IDs with corresponding HCA project IDs, and saves it to ./out/cellxgene-projects.json to be used by the explorer.
 * Usage: `npm run get-cellxgene-projects-hca`
 */

interface CellxGeneCollection {
  collection_id: string;
  links: { link_url: string }[];
}

const cellxgeneProjectsFilePath =
  "./site-config/hca-dcp/dev/scripts/out/cellxgene-projects.json";

getCellxGeneProjects();

async function getCellxGeneProjects(): Promise<void> {
  const collections = JSON.parse(
    (await got("https://api.cellxgene.cziscience.com/curation/v1/collections"))
      .body
  ) as CellxGeneCollection[];
  const cellxgeneProjects: CellxGeneProjectMapping[] = [];
  for (const collection of collections) {
    for (const { link_url } of collection.links) {
      const match =
        /^https:\/\/(?:explore\.)?data\.humancellatlas\.org(?:\/explore)?\/projects\/([^/?#]+)/.exec(
          link_url
        );
      if (match)
        cellxgeneProjects.push({
          cellxgeneId: collection.collection_id,
          hcaProjectId: match[1],
        });
    }
  }
  // Sort to create nicer diffs
  cellxgeneProjects.sort((a, b) =>
    a.hcaProjectId.localeCompare(b.hcaProjectId)
  );
  await fsp.writeFile(
    cellxgeneProjectsFilePath,
    JSON.stringify(cellxgeneProjects, undefined, 2)
  );
  console.log(`Saved to ${cellxgeneProjectsFilePath}`);
}
