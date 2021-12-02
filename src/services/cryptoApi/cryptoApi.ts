import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createRequest } from '../utils'

const baseUrl = 'https://coinranking1.p.rapidapi.com'
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f205768ce7mshfdc27489b7a8e07p1f6fecjsn9d2e1c745280',
}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`, cryptoApiHeaders),
        }),
    }),
})

export const { useGetCryptosQuery } = cryptoApi
