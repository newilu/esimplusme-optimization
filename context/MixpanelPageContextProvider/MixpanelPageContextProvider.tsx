import React, { useContext } from "react";
import mixpanel from "mixpanel-browser";
import { MixpanelPageContext, MixpanelPageProviderProps } from "./types";

const Context = React.createContext<MixpanelPageContext>({ source: "" });

export const useMixpanelPageContext = () => useContext(Context);

export function MixpanelPageProvider(props: MixpanelPageProviderProps) {
  const { children, source } = props;

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.$isMixpanelLoaded) {
      mixpanel.track_pageview({ source });
    }
  }, [source]);

  const value = React.useMemo(() => ({ source }), [source]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
