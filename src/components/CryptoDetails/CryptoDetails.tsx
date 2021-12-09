import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import {
    Col,
    Row,
    Typography,
    Select,
} from 'antd'
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    ThunderboltOutlined,
    CheckOutlined,
    NumberOutlined,
} from '@ant-design/icons'

import { useGetCryptoDetailsQuery } from '~/services'

const { Title, Text } = Typography
const { Option } = Select

export const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d')
    const { coinId } = useParams()
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const cryptoDetails = data?.data?.coin
    console.log(cryptoDetails)

    if (isFetching) return (<Title>Loading</Title>)

    const time:any = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

    const stats:any = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ]

    const genericStats:any = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ]

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.coin.name}
                    {cryptoDetails.coin.slug}
                    Price
                </Title>
                <p>
                    {cryptoDetails.name}
                    live price in US Dollar (USD).
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value:any) => setTimePeriod(value)}>
                {time.map((date:any) => <Option key={date}>{date}</Option>)}
            </Select>
        </Col>
    )
}
