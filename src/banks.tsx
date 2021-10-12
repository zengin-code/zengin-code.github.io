import React, { FunctionComponent, useCallback, useState } from "react";
import { useSearchContext } from "./searchContext";
import { Table } from "react-fluid-table";
import useFetch from 'use-http';
import { Loading } from "./loading";

interface BankData {
  readonly code: string;
  readonly name: string;
  readonly kana: string;
  readonly hira: string;
  readonly roma: string;
}

export const Banks: FunctionComponent = () => {
  const ctx = useSearchContext();
  const [state, update] = useState('');
  const { loading, error, data } = useFetch<Record<string, BankData>>('/api/banks.json', {}, []);
  const banks = data ? Object.values(data).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10)) : [];
  const filteredBanks = banks.filter((bank) => {
    if (state) {
      return Object.values(bank).reduce((match, field) => match || field.includes(state), false);
    } else {
      return true;
    }
  })
  const onRowClick = useCallback((_, { index }) => {
    const bank = filteredBanks[index];
    if (bank) {
      ctx.change(bank.code)
    }
  }, [ctx.change, filteredBanks])

  return (
    <div className="section">
      <form className="form mb-3">
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="search"
              className="input"
              placeholder="ex: 0005 or みつびし or mitsubishi or 三菱"
              value={state}
              onChange={(e) => update(e.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </form>
      { error ? <div>{error.message}</div> : null }
      { loading ? <Loading message="loading banks..." /> : null }
      { banks.length > 0 && <Table
        columns={[
          { key: 'code', header: 'Code', width: 120 },
          { key: 'name', header: 'Name' },
        ]}
        data={filteredBanks}
        tableHeight={300}
        className="is-fullwidth"
        onRowClick={onRowClick}
      /> }
      <div className="notification is-info is-light mt-3">
        <p>This data by <a href="/api/banks.json">https://zengin-code.github.io/api/banks.json</a> .</p>
        <p>You can use this JSON like API.</p>
      </div>
    </div>
  )
}
