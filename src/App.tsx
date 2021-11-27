import React from 'react'
import {
    Routes, Route,
} from 'react-router-dom'
import { Layout } from 'antd'

import { Homepage } from '~/components/Homepage'
import { Exchanges } from '~/components/Exchanges'
import { Navbar } from '~/components/Navbar'
import { Cryptocurrencies } from '~/components/Cryptocurrencies'
import { CryptoDetails } from '~/components/CryptoDetails'
import { News } from '~/components/News'
import { Footer } from '~/components/Footer'

export const App = () => (
    <div className="app">
        <Navbar />
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/exchanges" element={<Exchanges />} />
                        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                        <Route path="/news" element={<News />} />
                    </Routes>
                </div>
            </Layout>
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
)
