import React, { FunctionComponent, useState } from "react";
import { Banks } from "./banks";
import { Branches } from "./branches";
import { SearchContextProvider } from "./searchContext";

export const Search: FunctionComponent = () => {
  const [state, change] = useState({ code: '' });

  return (
    <SearchContextProvider value={{
      code: state.code,
      change: (code) => {
        change({...state, code });
      }
    }}>
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
