import fsp from "fs/promises";
import got from "got";

interface CellxGeneCollection {
  collection_id: string;
  links: { link_url: string }[];
}

interface CellxGeneProjectMapping {
  cellxgeneId: string;
  hcaProjectId: string;
}

const cellxgeneProjectsFilePath = "./scripts/out/cellxgene-projects.json";

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
  await fsp.writeFile(
    cellxgeneProjectsFilePath,
    JSON.stringify(cellxgeneProjects, undefined, 2)
  );
  console.log(`Saved to ${cellxgeneProjectsFilePath}`);
}
