import { AppProps } from 'next/app';

import '@styles/main.css';

const MyApp = ({ pageProps, Component }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
