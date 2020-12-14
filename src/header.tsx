import React, { FunctionComponent, useCallback, useState } from "react";

export const Header: FunctionComponent = () => {
  const [state, change] = useState({
    burger: false,
  });

  const burgerCallback = useCallback((e) => {
    e.preventDefault();
    change({ ...state, burger: !state.burger });
  }, [state.burger])

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <a className="button is-light" href="/">
              <span>Zengin Code</span>
              <span className="is-hidden-mobile">&nbsp;/ 統一金融機関コード</span>
            </a>
          </div>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={burgerCallback}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${state.burger ? 'is-active' : ''}`}>
          <nav className="navbar-end">
            <div className="navbar-item">
              <a className="button is-flex-mobile is-link is-light" href="https://github.com/zengin-code" aria-label="GitHub">
                <span className="icon">
                  <i className="fab fa-fw fa-github" />
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
