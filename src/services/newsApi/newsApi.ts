import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createRequest } from '../utils'

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const cryptoApiNewsHeaders = {
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'f205768ce7mshfdc27489b7a8e07p1f6fecjsn9d2e1c745280',
}

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`, cryptoApiNewsHeaders),
        }),
    }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
