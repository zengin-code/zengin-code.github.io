import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";
import { Html5Table, useDebouncedState, createFilter, useFilter } from 'window-table';
import { Loading } from "./loading";
import { useSearchContext } from "./searchContext";

interface BankData {
  readonly code: string;
  readonly name: string;
  readonly kana: string;
  readonly hira: string;
  readonly roma: string;
}

interface State {
  loading: boolean;
  banks: BankData[];
}

const filter = createFilter(['code', 'name', 'kana', 'hira', 'roma'])

const Row: FunctionComponent<HTMLAttributes<HTMLTableRowElement> & { row: BankData }> = ({ row, className, ...props }) => {
  const ctx = useSearchContext();

  return (
    <tr
      {...props}
      onClick={() => {
        ctx.change(row.code);
      }}
      className={`${className} ${row.code === ctx.code ? 'is-selected' : ''}`}
    />
  );
}

export const Banks: FunctionComponent = () => {
  const [state, change] = useState<State>({ loading: false, banks: [] });
  const [text, debouncedText, setText] = useDebouncedState('');

  useEffect(() => {
    change({ ...state, loading: true });
    fetch('/api/banks.json')
      .then((res) => res.json())
      .then((banks: { [key: string]: BankData}) => {
        return Object.values(banks).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10))
      })
      .then((banks) => {
        change({ ...state, banks, loading: false })
      })
      .catch(() => {
        change({ ...state, loading: false });
      })
  }, [])

  const banks = useFilter(filter, state.banks, debouncedText) as BankData[];

  if (state.loading) {
    return <Loading message="Loading banks..." />;
  }

  return (
    <div className="section">
      <form className="form mb-3">
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="search"
              className="input"
              placeholder="ex: 0005 or みつびし or mitsubishi or 三菱"
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
        data={banks}
        className="is-fullwidth"
        style={{ height: 'min(30rem,100vh)', overflow: 'hidden' }}
        Row={Row}
      />
      <div className="notification is-info is-light mt-3">
        <p>This data by <a href="/api/banks.json">https://zengin-code.github.io/api/banks.json</a> .</p>
        <p>You can use this JSON like API.</p>
      </div>
    </div>
  )
}
