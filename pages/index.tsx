import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";

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
  return (
    <div className={styles.container}>
      <div className="container">MODE = {process.env.NODE_ENV || "none"}</div>
    </div>
  );
};

export default Home;
