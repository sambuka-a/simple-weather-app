import React from 'react'
import { useSelector } from "react-redux"
import { Legend, XAxis, YAxis, Area, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Typography } from 'antd'

import '../../../../index.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { selectAirQuality } from './airQuality-slice';

const AirQualityGraph = () => {
  const { Title } = Typography
  const {status, error, airQ} = useSelector(selectAirQuality)

  if(error) {
    return (
      <div className='error'>
        <Title level={4}>Air Quality</Title>
        <div>{error}</div>
      </div>)
  }

  let graphData = airQ.time?.reduce((acc, item, index) => {
    const obj = {
      time: item.slice(11, item.length),
      'pm 2.5': airQ.pm2_5[index],
      'pm 10': airQ.pm10[index],
      eaqi: airQ.european_aqi[index],
      ozone: airQ.ozone[index],
      co: airQ.carbon_monoxide[index],
      no2: airQ.nitrogen_dioxide[index],
      so2: airQ.sulphur_dioxide[index],
    };
    acc.push(obj)
    return acc
  }, [])

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="customTooltip">
            {payload.map((i) => (
              <div className='tempGraphData' key={i.name} style={{color: i.color}}>
                <p>{i.name}</p>
                <div>
                  <p>{`${i.value} μg/m³`}</p>
                </div>
              </div>
            )
            )}
            <div className='tempGraphData'>
              <div>
                <p>Ozone</p>
                <p>NO2</p>    
                <p>SO2</p>    
                <p>CO</p>    
                <p>EAQI</p>    
              </div>
              <div>
                <p>{`${payload[0].payload.ozone} μg/m³`}</p>
                <p>{`${payload[0].payload.no2} μg/m³`}</p>
                <p>{`${payload[0].payload.so2} μg/m³`}</p>
                <p>{`${payload[0].payload.co} μg/m³`}</p>
                <p>{`${payload[0].payload.eaqi}`}</p>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

  return (
    <>
      <div className='weather_title'>
        <Title level={4}>Air Quality</Title>
      </div>
      {status === 'loading' && <div className='skeletonWrapper'><Skeleton count={5}/></div>}
      {(status === 'received' && !error) && (
        <ResponsiveContainer width='100%' height={350}>
            <ComposedChart data={graphData}
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis padding={{ left: 0, right: 0 }} dataKey="time" />
              <YAxis padding={{ top: 10, left: 30, right: 30 }} label={{ value: 'μg/m³', position: 'insideLeft', angle: -90, textAnchor: 'middle' }} />
              <Area type="monotone" dataKey="pm 2.5" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="pm 10" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              <Tooltip content = {<CustomTooltip />}/>
              <Legend verticalAlign="bottom" height={36}/>
            </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
)}

export default AirQualityGraph