import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import ncpiDevConfig from "../../ncpi-catalog/dev/config";
import { studiesEntityConfig } from "./index/studiesEntityConfig";

const logoDug = "/images/logoNcpiDug.svg";

const config: SiteConfig = {
  ...ncpiDevConfig,
  entities: [studiesEntityConfig],
  layout: {
    ...ncpiDevConfig.layout,
    header: {
      ...ncpiDevConfig.layout.header,
      logo: {
        ...ncpiDevConfig.layout.header.logo,
        src: logoDug,
      },
    },
  },
};

export default config;
