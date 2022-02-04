import { Fragment } from 'react';

import Header from '../Header';

import { Image } from './styles';

const Loader = (): JSX.Element => (
  <Fragment>
    <Header />
    <Image xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle
        fill="none"
        cx="12"
        cy="12"
        r="10"
        stroke="#FECACA"
        strokeWidth="4"
      />
      <path
        fill="#F87170"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </Image>
  </Fragment>
);

export default Loader;
