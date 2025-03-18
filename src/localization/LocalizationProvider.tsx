import React, { useMemo, ReactNode, useState } from 'react';

import { LocalizationContext } from './LocalizationContext';
import defaultTranslations from './translations/en';

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [translations, setTranslations] = useState(defaultTranslations);

  const value = useMemo(() => {
    const translate = (key: string, params?: Record<string, string>): string => {
      let translation = translations[key] || key;

      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          translation = (translation).replace(`{{${paramKey}}}`, value);
        });
      }

      return translation;
    };

    return {
      t: translate,
      setTranslations,
    };
  }, [translations]);

  return (
    <LocalizationContext value={value}>
      {children}
    </LocalizationContext>
  );
};
