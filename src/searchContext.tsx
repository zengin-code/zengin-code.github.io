import { createContext, useContext } from "react";

export const SearchContext = createContext({ code: '', change: (_: string) => {} });
export const SearchContextProvider = SearchContext.Provider;
export const useSearchContext = () => useContext(SearchContext)
