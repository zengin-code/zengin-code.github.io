import React, { FunctionComponent, useState } from "react";
import { Table } from "react-fluid-table";
import useFetch from "use-http";
import { Loading } from "./loading";

interface BranchData {
  readonly code: string;
  readonly name: string;
  readonly kana: string;
  readonly hira: string;
  readonly roma: string;
}

export const Branches: FunctionComponent<{ code: string }> = ({ code }) => {
  const [ state, update ] = useState('');
  const { loading, error, data } = useFetch<Record<string,BranchData>>(`/api/branches/${code}.json`, {}, [code])
  const branches = data ? Object.values(data).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10)) : [];
  const filteredBranches = branches.filter((branch) => {
    if (state) {
      return Object.values(branch).reduce((match, field) => match || field.includes(state), false);
    } else {
      return true;
    }
  })

  if (loading) {
    return <Loading message="Loading branches..." />;
  }

  return (
    <div className="section">
      {error ? (
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
                  value={state}
                  onChange={(e) => update(e.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </form>
          {data && <Table
            columns={[
              { key: 'code', header: 'Code', width: 120 },
              { key: 'name', header: 'Name' },
            ]}
            data={filteredBranches}
            className="is-fullwidth"
            tableHeight={300}
           />}
          <div className="notification is-info is-light mt-3">
            <p>This data by <a href={`/api/branches/${code}.json`}>https://zengin-code.github.io/api/branches/{code}.json</a> .</p>
            <p>You can use this JSON like API.</p>
          </div>
        </>
      )}
    </div>
  )
}
