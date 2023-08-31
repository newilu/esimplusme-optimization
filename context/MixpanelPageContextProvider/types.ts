import { PropsWithChildren } from "react";

export interface MixpanelPageProviderProps extends PropsWithChildren {
  source: string;
}
export interface MixpanelPageContext {
  source: string;
}
