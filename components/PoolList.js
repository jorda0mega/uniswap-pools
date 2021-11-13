import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const ALL_POOLS_QUERY = gql`
  query allPools($first: Int!, $skip: Int!) {
    pools(orderBy: createdAtTimestamp, orderDirection: desc, first: $first, skip: $skip) {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      txCount
      totalValueLockedUSD
      volumeUSD
    }
  }
`

export const allPoolsQueryVars = {
  skip: 0,
  first: 10,
}

export default function PoolList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POOLS_QUERY,
    {
      variables: allPoolsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePools = networkStatus === NetworkStatus.fetchMore

  const loadMorePools = () => {
    fetchMore({
      variables: {
        skip: allPools.length,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading pools." />
  if (loading && !loadingMorePools) return <div>Loading</div>

  const { pools } = data
  // const areMorePools = allPools.length < _allPoolsMeta.count
  const areMorePools = true;

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pool
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TX Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TVL (USD)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Volume (USD)
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pools.map((pool, personIdx) => (
                  <tr key={pool.id} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pool.txCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.totalValueLockedUSD}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.volumeUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}