import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Index.module.scss';
import favicon from '../public/favicon.png';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Trans, useTranslation } from 'react-i18next';
import { initializeI18Next } from '../app/utilities/i18n8n8n8n';

type Props = {
  soon?: Boolean;
  mongo?: String; 
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const mongo = process.env.MONGO_URL;
  return {
    props: {
      soon: true,
      mongo,
    },
  };
};

initializeI18Next();

const Home: NextPage<Props> = (props) => {
  const { t } = useTranslation();

  const [count, setCount] = React.useState(0);
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
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
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <input type="number" value={count} min={0} max={100} onChange={(e) => setCount(parseInt(e.target.value))} />
        </div>
        <div>
          <Trans count={count || 0}>apple</Trans>
        </div>
        <div>
          <code>{props.mongo}</code>
        </div>
        <div>
          <code lang='javascript'>console.log(`bahman damia`)</code>
        </div>
      </div>
    </div>
  );
};

export default Home;
