import { Card, Col, Row } from 'antd';
import React from 'react';
import { useSelector } from "react-redux"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import AirQuality from './chunks/airQuality/AirQuality';
import CurrentWeather from './chunks/CurrentWeather';
import CurrentLocation from './chunks/LocationInfo';
import TemperatureGraph from './chunks/TemperatureGraph';
import AirQualityGraph from './chunks/airQuality/AirQualityGraph'

import { selectCurrentWeather } from '../currentWeather/currentWeather-slice';

export const CurrentWeatherCard = () => {
  const { status, error } = useSelector(selectCurrentWeather)
  let loading = ((status === 'loading') && true)

  return (
    <>
      {error && error}
      {status === 'idle' && <Skeleton/>}
      {status !== 'idle' && (
        <div className='wrapper'>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col xs={24} md={8} xl={8}>
              <Card loading={loading} title="Location" bordered={false}>
                <CurrentLocation/>
              </Card>
            </Col>
            <Col xs={24} md={8} xl={8}>
              <Card loading={loading} title="Current Weather" bordered={false}>
                <CurrentWeather/>
              </Card>
            </Col>
            <Col xs={24} md={8} xl={8}>
              <Card loading={loading} title="Air Quality" bordered={false}>
                <AirQuality/>
              </Card>
            </Col>
          </Row>
        </div>
        <TemperatureGraph/>
        <AirQualityGraph />
      </div>
      )}
    </>
  )
}