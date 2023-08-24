import { pageTitlesForAnalytics } from 'utils/constants';
import { PropsWithChildren } from 'react';

export interface MixpanelPageProviderProps extends PropsWithChildren {
  source: pageTitlesForAnalytics;
}
export interface MixpanelPageContext {
  source: pageTitlesForAnalytics | '';
}
