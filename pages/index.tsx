import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";

type Props = {
  soon?: boolean;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      soon: false,
    } as Props,
  };
};

const Home: NextPage<Props> = (props) => {
  return <div className={styles.container}>Coming soon ...</div>;
};

export default Home;
