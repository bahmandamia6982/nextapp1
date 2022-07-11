import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import favicon from '../public/favicon.png';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Trans, useTranslation } from 'react-i18next';
import { initialize } from '../source/Utils/i18n';
type Props = {
  soon?: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      soon: true,
    },
  };
};

initialize();

const Home: NextPage<Props> = (props) => {
  const { t } = useTranslation();

  const [count, setCount] = React.useState(0);

  console.warn(t('direction'));

  return (
    <div className={styles.container}>
      <Head>
        <title>BioG | Online Avatar Maker</title>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <div className="container">
        <div>MODE = You are in {process.env.NODE_ENV || 'none'}</div>
        <div>
          <Trans srcLang="ku" values={{ version: 10 }}>
            biog
          </Trans>
        </div>
        <div>
          Direction → 
          <span style={{ textTransform: 'uppercase', color: '#29c' }}>
            <Trans>direction</Trans>
          </span>
        </div>
        <div>
          <Trans count={count}>apple</Trans>
        </div>
        <div style={{ padding: 20 }}>
          <input type="number" value={count} min={0} max={100} onChange={(e) => setCount(parseInt(e.target.value))} />
        </div>
      </div>
    </div>
  );
};

export default Home;
