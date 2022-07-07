import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import favicon from "../public/favicon.png";
import { GetServerSideProps } from "next";
import Head from "next/head";

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

const Home: NextPage<Props> = (props) => {
  console.log(favicon)
  return (
    <div className={styles.container}>
      <Head>
        <title>BioG | Online Avatar Maker</title>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <div className="container">
        MODE = You are in {process.env.NODE_ENV || "none"} mode
      </div>
    </div>
  );
};

export default Home;
