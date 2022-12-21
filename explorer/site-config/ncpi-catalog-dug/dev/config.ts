import logoDug from "images/logoNcpiDug.svg";
import { SiteConfig } from "../../../app/config/common/entities";
import ncpiDevConfig from "../../ncpi-catalog/dev/config";
import { studiesEntityConfig } from "./index/studiesEntityConfig";

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
