'use client';

import React, { useContext } from 'react';
import { MixpanelPageContext, MixpanelPageProviderProps } from './types';

const Context = React.createContext<MixpanelPageContext>({ source: '' });

export const useMixpanelPageContext = () => useContext(Context);

export const MixpanelPageProvider: React.FC<MixpanelPageProviderProps> = (props) => {
  const { children, source } = props;

  React.useEffect(() => {
    window.mixpanel.track_pageview({ source });
  }, [source]);

  return <Context.Provider value={{ source }}>{children}</Context.Provider>;
};
