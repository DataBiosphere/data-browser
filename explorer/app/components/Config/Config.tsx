import { config } from "app/config/config";
import React from "react";
import { SiteConfig } from "../../config/common/entities";

export const ConfigContext = React.createContext<SiteConfig>(config());

export const ConfigProvider = ConfigContext.Provider;
