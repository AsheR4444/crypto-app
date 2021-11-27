import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space } from 'antd'

export const Footer = () => (
    <>
        <Typography.Title level={5} style={{ color: 'white' }}>
            Cryptoverse
            <br />
            All rights Reserved
        </Typography.Title>
        <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
        </Space>
    </>
)
