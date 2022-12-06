/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

// SSR
// export async function getServerSideProps({ params }) {
//   const resp = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   );

//   return {
//     props: {
//       pokemon: await resp.json(),
//     },
//   };
// }

// to genrate the all the pages at build time we have to know what all possible ids are there
// we have to know those ids at build time
export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false, // in case id value for which page is not generated, we might need a fallback page
  };
}

// SSG
export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30, // as static pages generated at build time, and if after build there is some changes in data which we are getting from api in that case we can give option to check the api after 30s when user hits the page
  };
}

export default function Details({ pokemon }) {
  // client side rendering
  // we are making the request
  // can be cheked in network tab as id.json
  // check the page source code it should be empty
  //   const {
  //     query: { id },
  //   } = useRouter();

  //   const [pokemon, setPokemon] = useState(null);

  //   useEffect(() => {
  //     async function getPokemon() {
  //       const resp = await fetch(
  //         `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  //       );
  //       console.log("helloo");
  //       setPokemon(await resp.json());
  //     }
  //     if (id) {
  //       getPokemon();
  //     }
  //   }, [id]);

  //   if (!pokemon) {
  //     return null;
  //   }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
