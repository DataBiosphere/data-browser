import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { RoundedLoading } from "../../../Loading/loading.styles";
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
          <RoundedLoading loading={isLoading} />
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
