import React from 'react'
import millify from 'millify'
import {
    Typography, Row, Col, Statistic,
} from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '~/services/cryptoApi'

import { Cryptocurrencies } from '~/components/Cryptocurrencies'
import { News } from '~/components/News'

const { Title } = Typography

export const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const gloabalStats = data?.data?.stats

    return (
        <>
            <Title level={2} className="heading">Global Crypto stats</Title>

            {isFetching ? (<Title level={6}>Loading...</Title>) : (
                <>
                    <Row>
                        <Col span={12}>
                            <Statistic title="Total Cryptocurrencies" value={millify(gloabalStats.total)} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Total Exchanges" value={millify(gloabalStats.totalExchanges)} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Total Market Cap" value={millify(gloabalStats.totalMarketCap)} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Total 24h Volume" value={millify(gloabalStats.total24hVolume)} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Total Markets" value={millify(gloabalStats.totalMarkets)} />
                        </Col>
                    </Row>
                    <div className="home-heading-container">
                        <Title level={2} className="home-title">Top 10 Cryptocurrencies</Title>
                        <Title level={3} className="show-more">
                            <Link to="/cryptocurrencies">Show More</Link>
                        </Title>
                    </div>
                    <Cryptocurrencies simplified />
                    <div className="home-heading-container">
                        <Title level={2} className="home-title">Latest news</Title>
                        <Title level={3} className="show-more">
                            <Link to="/news">Show More</Link>
                        </Title>
                    </div>
                    <News simplified />
                </>
            )}

        </>
    )
}
