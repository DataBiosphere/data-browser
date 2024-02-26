import { LogoExplorer } from "../../logoExplorer";

const anvilExplorer = "/images/anvilExplorer.png";
const NHGRI_ANVIL = "NHGRI Analysis Visualization and Informatics Lab-space";

export interface ANVILExplorerProps {
  url: string;
}

export const ANVILExplorer = ({ url }: ANVILExplorerProps): JSX.Element => {
  return (
    <LogoExplorer
      alt={NHGRI_ANVIL}
      height={[32, 44]}
      src={[anvilExplorer, anvilExplorer]}
      url={url}
    />
  );
};
