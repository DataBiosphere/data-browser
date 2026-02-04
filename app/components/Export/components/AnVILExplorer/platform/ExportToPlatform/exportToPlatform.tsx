import { JSX } from "react";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import { useFileManifest } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifest";
import { useFileManifestFileCount } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifestFileCount";
import { useFileManifestFormat } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifestFormat";
import { useRequestFileLocation } from "@databiosphere/findable-ui/lib/hooks/useRequestFileLocation";
import { useRequestManifest } from "@databiosphere/findable-ui/lib/hooks/useRequestManifest/useRequestManifest";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/FluidPaper/fluidPaper";
import { Loading } from "@databiosphere/findable-ui/lib/components/Loading/loading";
import { ExportManifestDownloadFormatForm } from "@databiosphere/findable-ui/lib/components/Export/components/ExportForm/components/ExportManifestDownloadFormatForm/exportManifestDownloadFormatForm";
import { ExportButton } from "@databiosphere/findable-ui/lib/components/Export/components/ExportForm/components/ExportButton/exportButton";
import { ExportForm } from "@databiosphere/findable-ui/lib/components/Export/components/ExportForm/exportForm";
import {
  Section,
  SectionActions,
  SectionContent,
} from "@databiosphere/findable-ui/lib/components/Export/export.styles";
import { Button } from "@mui/material";
import {
  REL_ATTRIBUTE,
  ANCHOR_TARGET,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { PAPER_PANEL_STYLE } from "@databiosphere/findable-ui/lib/components/common/Paper/paper";
import { MANIFEST_DOWNLOAD_FORMAT } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { Props } from "./types";

export const ExportToPlatform = ({
  buttonLabel,
  description,
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  speciesFacetName,
  successTitle,
  title,
}: Props): JSX.Element => {
  useFileManifest(filters, fileSummaryFacetName);
  useFileManifestFileCount(filters, speciesFacetName, fileSummaryFacetName);

  const fileManifestFormatState = useFileManifestFormat(
    MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB
  );
  const { fileManifestFormat } = fileManifestFormatState;

  const requestManifest = useRequestManifest(fileManifestFormat, formFacet);
  const { requestMethod, requestUrl } = requestManifest;

  const response = useRequestFileLocation(requestUrl, requestMethod);
  const url = "";

  return url ? (
    <FluidPaper>
      <Section>
        <SectionContent>
          <h3>{successTitle}</h3>
        </SectionContent>
        <SectionActions>
          <Button
            {...BUTTON_PROPS.PRIMARY_CONTAINED}
            href={url}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
          >
            {buttonLabel}
          </Button>
        </SectionActions>
      </Section>
    </FluidPaper>
  ) : (
    <div>
      <Loading
        loading={response.isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your link will be ready shortly..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <h3>{title}</h3>
            <p>{description}</p>
          </SectionContent>
          <ExportForm
            Button={renderButton}
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            onRequestManifest={(): void => response.run()}
          >
            <ExportManifestDownloadFormatForm
              fileManifestFormatState={fileManifestFormatState}
              manifestDownloadFormats={[MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB]}
            />
          </ExportForm>
        </Section>
      </FluidPaper>
    </div>
  );
};

/**
 * Build the export button.
 * @param props - Button props e.g. "onClick" to request manifest.
 * @returns button element.
 */
function renderButton({ ...props }): JSX.Element {
  return <ExportButton {...props}>Request Link</ExportButton>;
}
