import React, { FunctionComponent, useState } from "react";

const INSTALLATION_CODES = {
  rb: 'gem install zengin_code',
  js: 'npm install zengin-code',
  py: 'pip install zengin_code',
};

const USAGE_CODES: typeof INSTALLATION_CODES = {
  rb: "require 'zengin_code'\n\nZenginCode::Bank.all",
  js: "const zenginCode = require('zengin-code');\n\nzenginCode['0001'];",
  py: 'from zengin_code import Bank\n\nBank.all',
};

interface State {
  language: keyof typeof INSTALLATION_CODES;
}

export const Hero: FunctionComponent = () => {
  const [state, change] = useState<State>({ language: 'rb' });
  const installationCode = INSTALLATION_CODES[state.language];
  const usageCode = USAGE_CODES[state.language];

  return (
    <div className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title">統一金融機関コードデータセット</h1>
              <p className="subtitle">Zengin Code はプログラム上で統一金融機関コードを手軽に読み込める、データセットライブラリです。</p>
            </div>
            <div className="column">
              <div className="tabs is-toggle is-centered is-small">
                <ul>
                  <li className={state.language === 'rb' ? 'is-active' : ''}><a onClick={(e) => {e.preventDefault(); change({ ...state, language: 'rb' })}} href="#">Ruby</a></li>
                  <li className={state.language === 'js' ? 'is-active' : ''}><a onClick={(e) => {e.preventDefault(); change({ ...state, language: 'js' })}} href="#">JavaScript</a></li>
                  <li className={state.language === 'py' ? 'is-active' : ''}><a onClick={(e) => {e.preventDefault(); change({ ...state, language: 'py' })}} href="#">Python</a></li>
                </ul>
              </div>
              <div className="content">
                <h5>Installation</h5>
                <pre><code className="is-family-monospace">{installationCode}</code></pre>
                <h5>Usage</h5>
                <pre><code className="is-family-monospace">{usageCode}</code></pre>

                <div className="has-text-right">
                  <a className="button is-link is-light" href={`https://github.com/zengin-code/zengin-${state.language}`}>See more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
