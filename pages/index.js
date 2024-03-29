import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
// ssr
// when we call this page getServerSideProps runs the first and gather all the data
// and returns the props
// and our page render with the props
// export async function getServerSideProps() {
//   const resp = await fetch(
//     "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
//   );

//   return {
//     props: {
//       pokemon1: await resp.json(),
//     },
//   };
// }

// SSG
// page will build in build time
export async function getStaticProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }) {
  // client side rendering
  // const [pokemon, setPokemon] = useState([]);
  // useEffect(() => {
  //   async function getPokemon() {
  //     const resp = await fetch(
  //       "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  //     );
  //     setPokemon(await resp.json());
  //   }
  //   getPokemon();
  // }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>SSG vs SSR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      {/* <h2>Pokemon List 2</h2>
      <div className={styles.grid}>
        {pokemon1.map((pokemon) => (
          <div className={styles.card} key={pokemon.id + "44"}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}
