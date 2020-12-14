import React, { FunctionComponent, useEffect, useState } from "react";
import { Html5Table, useDebouncedState, createFilter, useFilter } from 'window-table';
import { Loading } from "./loading";

interface BranchData {
  readonly code: string;
  readonly name: string;
  readonly kana: string;
  readonly hira: string;
  readonly roma: string;
}

interface State {
  loading: boolean;
  branches: BranchData[];
  invalid: boolean;
}

const filter = createFilter(['code', 'name', 'kana', 'hira', 'roma'])

export const Branches: FunctionComponent<{ code: string }> = ({ code }) => {
  const [state, change] = useState<State>({ loading: false, invalid: true, branches: [] });
  const [text, debouncedText, setText] = useDebouncedState('');

  useEffect(() => {
    if (!code) {
      change({ ...state, loading: false, branches: [], invalid: true });
      return
    }

    change({ ...state, loading: true, invalid: false });

    fetch(`/api/branches/${code}.json`)
      .then((res) => res.json())
      .then((branches: { [key: string]: BranchData}) => {
        return Object.values(branches).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10))
      })
      .then((branches) => {
        change({ ...state, branches, loading: false, invalid: false });
      })
      .catch(() => {
        change({ ...state, loading: false, invalid: true });
      });
  }, [code])

  const branches = useFilter(filter, state.branches, debouncedText) as BranchData[];

  if (state.loading) {
    return <Loading message="Loading branches..." />;
  }

  return (
    <div className="section">
      {state.invalid ? (
        <div className="notification has-text-centered">
          <p>Select a bank</p>
        </div>
      ) : (
        <>
          <form className="form mb-3">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="search"
                  className="input"
                  placeholder="ex: 0001 or ginza or ぎんざ or 銀座"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </form>
          <Html5Table
            columns={[
              { key: 'code', title: 'Code', width: 1 },
              { key: 'name', title: 'Name', width: 2 },
            ]}
            data={branches}
            className="is-fullwidth"
            style={{ height: 'min(30rem,100vh)', overflow: 'hidden' }}
          />
          <div className="notification is-info is-light mt-3">
            <p>This data by <a href={`/api/branches/${code}.json`}>https://zengin-code.github.io/api/branches/{code}.json</a> .</p>
            <p>You can use this JSON like API.</p>
          </div>
        </>
      )}
    </div>
  )
}
