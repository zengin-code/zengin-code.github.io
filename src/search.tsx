import React, { FunctionComponent, useCallback, useState } from "react";
import { Banks } from "./banks";
import { Branches } from "./branches";
import { SearchContextProvider } from "./searchContext";

export const Search: FunctionComponent = () => {
  const [state, update] = useState({ code: '' });
  const { code } = state;
  const change = useCallback((code: string) => {
    update(() => ({ code }))
  }, [update])

  return (
    <SearchContextProvider value={{ code, change }}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <Banks />
          </div>

          <div className="column">
            <Branches code={state.code} />
          </div>
        </div>
      </div>
    </SearchContextProvider>
  )
}
