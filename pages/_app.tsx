import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '@styles/main.css';

const MyApp = ({ pageProps, Component }: AppProps) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
