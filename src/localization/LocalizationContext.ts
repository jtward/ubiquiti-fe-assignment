import { createContext } from 'react';

interface LocalizationContextType {
  t: (key: string, params?: Record<string, string>) => string;
  setTranslations: (translations: Record<string, string>) => void;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);
