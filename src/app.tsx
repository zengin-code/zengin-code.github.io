import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import 'bulma/bulma.sass';

import React, { FunctionComponent } from "react";
import { Header } from "./header";
import { Hero } from './hero';
import { Search } from './search';

export const App: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Hero />

      <Search />
    </>
  )
}
