import { useRequestFileLocation } from "app/hooks/useRequestFileLocation";
import React, { useEffect } from "react";
import { Button } from "../common/Button/button";

interface ExportToTerraProps {
  params: URLSearchParams;
  url: string;
}

export const ExportToTerra = ({
  params,
  url,
}: ExportToTerraProps): JSX.Element => {
  const { data, isLoading, isSuccess, run } = useRequestFileLocation(
    `${url}?${params.toString()}`
  );

  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log(data);
    }
  }, [data, isLoading, isSuccess]);

  const handleClick = (): void => {
    run();
  };

  return (
    <div>
      <span>Select File Types</span>
      <Button onClick={handleClick}>Request link</Button>
    </div>
  );
};
