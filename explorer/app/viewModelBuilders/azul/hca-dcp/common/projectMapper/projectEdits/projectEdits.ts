import cellxgeneProjects from "../../../../../../../site-config/hca-dcp/dev/scripts/out/cellxgene-projects.json";
import { baseProjectEdits, CZ_CELLXGENE } from "./constants";
import { CellxGeneProjectMapping, ProjectEdit } from "./entities";

export const projectEdits = addCellxGeneProjectEdits(
  baseProjectEdits,
  cellxgeneProjects
);

function addCellxGeneProjectEdits(
  projectEdits: ProjectEdit[],
  cellxgeneProjects: CellxGeneProjectMapping[]
): ProjectEdit[] {
  projectEdits = projectEdits.slice();
  for (const { cellxgeneId, hcaProjectId } of cellxgeneProjects) {
    const url = `https://cellxgene.cziscience.com/collections/${cellxgeneId}`;
    const editIndex = projectEdits.findIndex((e) => e.entryId === hcaProjectId);
    if (editIndex === -1) {
      projectEdits.push({
        analysisPortals: [
          {
            ...CZ_CELLXGENE,
            url,
          },
        ],
        entryId: hcaProjectId,
      });
    } else {
      const edit = projectEdits[editIndex];
      if (!edit.analysisPortals?.find((p) => p.url === url)) {
        projectEdits[editIndex] = {
          ...edit,
          analysisPortals: [
            ...(edit.analysisPortals || []),
            {
              ...CZ_CELLXGENE,
              url,
            },
          ],
        };
      }
    }
  }
  return projectEdits;
}
