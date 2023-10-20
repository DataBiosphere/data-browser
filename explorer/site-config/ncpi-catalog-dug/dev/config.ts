import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../app/components";
import ncpiDevConfig from "../../ncpi-catalog/dev/config";
import { studiesEntityConfig } from "./index/studiesEntityConfig";

const logoDug = "/images/logoNcpiDug.svg";

// Template constants
const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const SLOGAN = "NIH Cloud Platform Interoperability Effort";

const config: SiteConfig = {
  ...ncpiDevConfig,
  entities: [studiesEntityConfig],
  layout: {
    ...ncpiDevConfig.layout,
    header: {
      ...ncpiDevConfig.layout.header,
      Logo: C.Logo({
        alt: SLOGAN,
        height: 40,
        link: `${BROWSER_URL}/ncpi`,
        src: logoDug,
      }),
    },
  },
};

export default config;
