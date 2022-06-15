import { config } from "app/config/config";
import { SiteConfig } from "app/config/model";
import React from "react";

export const ConfigContext = React.createContext<SiteConfig>(config());

export const ConfigProvider = ConfigContext.Provider;
