import React, { useState } from 'react'
import type { FC } from 'react'
import {
    Select, Typography, Row, Col, Avatar, Card,
} from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery, useGetCryptosQuery } from '~/services'

const { Text, Title } = Typography
const { Option } = Select

type NewsProps = { simplified?: boolean }

export const News:FC<NewsProps> = ({ simplified }) => {
    const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
    const demoImageSrc = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
    const { data } = useGetCryptosQuery(100)
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 100,
    })

    return (
        <>
            {!cryptoNews?.value ? (<Title level={6}>Loading...</Title>) :
                (
                    <Row gutter={[24, 24]}>
                        {!simplified && (
                            <Col span={24}>
                                <Select
                                    showSearch
                                    className="select-news"
                                    placeholder="select a crypto"
                                    optionFilterProp="children"
                                    onChange={(value:any) => setnewsCategory(value)}
                                    filterOption={
                                        (input:any, option:any) => {
                                            // eslint-disable-next-line max-len
                                            option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
                                        }
                                    }
                                >
                                    <Option value="Cryptocurrency">
                                        Cryptocurrency
                                    </Option>
                                    {
                                        data?.data?.coins.map((coin:any) => (
                                            <Option value={coin.name}>{coin.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        )}
                        {cryptoNews.value.map((news:any) => (
                            <Col xs={24} sm={12} lg={8} key={news.datePublished}>
                                <Card hoverable className="news-card">
                                    <a href={news.url} target="_blank" rel="noreferrer">
                                        <div className="news-image-container">
                                            <Title className="news-title" level={4}>
                                                {news.name}
                                            </Title>
                                            <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImageSrc} alt="News avatar" />
                                        </div>
                                        <p>
                                            {
                                                news.description > 100
                                                    ? `${news.description.substring(0, 100)}...`
                                                    : news.description
                                            }
                                        </p>
                                        <div className="provider-container">
                                            <>
                                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageSrc} alt="news" />
                                                <Text className="provider-name">
                                                    {news.provider[0]?.name}
                                                </Text>
                                            </>
                                            <Text>
                                                {moment(news.datePublished).startOf('minute').fromNow()}
                                            </Text>
                                        </div>
                                    </a>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
        </>
    )
}
