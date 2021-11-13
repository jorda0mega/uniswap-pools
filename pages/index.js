import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import PoolList, {
  ALL_POOLS_QUERY,
  allPoolsQueryVars
} from '../components/PoolList'
import { addApolloState, initializeApollo } from '../lib/apolloClient'

const people = [
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
]

export default function Pools({ pools }) {
  return (
    <div className={styles.main}>
      <p className="font-medium py-2 text-left">All Pools</p>
      <PoolList />
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POOLS_QUERY,
    variables: allPoolsQueryVars,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  })
}