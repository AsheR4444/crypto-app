/* eslint-disable react/jsx-one-expression-per-line */
import type { FC, ChangeEvent } from 'react'
import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {
    Typography, Row, Col, Card, Input,
} from 'antd'

import { useGetCryptosQuery } from '~/services'

type CryptocurrenciesProps = { simplified?: boolean }

export const Cryptocurrencies:FC<CryptocurrenciesProps> = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins)

        const filteredData:any = cryptosList?.data?.coins.filter(
            (coin:any) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    return (
        <>
            <div className="search-crypto">
                {!simplified && (
                    <Input
                        placeholder="Search currency"
                        // eslint-disable-next-line max-len
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                )}
            </div>
            {isFetching ? (<Typography.Title level={6}>Loading... </Typography.Title>) : (
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {cryptos?.map((currency:any) => (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img src={currency.iconUrl} className="crypto-image" alt={currency.slug} />}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>MarketCap: {millify(currency.marketCap)}</p>
                                    <p>DailyChange: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
