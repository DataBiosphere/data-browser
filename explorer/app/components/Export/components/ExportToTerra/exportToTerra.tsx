import { Loading } from "app/components/Loading/loading";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { PAPER_PANEL_STYLE } from "../../../common/Paper/paper";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

interface ExportToTerraProps {
  params: URLSearchParams;
  url: string;
}

export const ExportToTerra = ({
  params,
  url,
}: ExportToTerraProps): JSX.Element => {
  const { data, isIdle, isLoading, isSuccess, run } = useRequestFileLocation(
    `${url}?${params.toString()}`
  );
  return (
    <>
      {/* Export is idle or loading */}
      {(isIdle || isLoading) && (
        <div>
          <Loading
            loading={isLoading}
            panelStyle={PAPER_PANEL_STYLE.FLUID}
            text="Your link will be ready shortly..."
          />
          <ExportToTerraNotStarted run={run} />
        </div>
      )}
      {/* Export is successful */}
      {isSuccess && (
        <ExportToTerraReady
          terraUrl={`https://app.terra.bio/#import-data?${data?.location}`}
        />
      )}
    </>
  );
};
