import { createContext, useState, ReactNode, useContext } from 'react';

type PageContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PageContext = createContext<PageContextType>({
  page: 1,
  setPage: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [page, setPage] = useState(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}