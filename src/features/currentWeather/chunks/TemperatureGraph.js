import React from 'react'
import { useSelector } from "react-redux"
import { Legend, Line, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';
import { Typography } from 'antd'

import '../../../index.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { selectCurrentWeather } from '../currentWeather-slice';

const TemperatureGraph = () => {
  const { Title } = Typography
  const {status, error, hourly} = useSelector(selectCurrentWeather)

  if(error) {
    return (
      <div className='error'>
        <Title level={4}>Temperature</Title>
        <div>{error}</div>
      </div>)
  }

  let graphData = hourly?.time?.reduce((acc, item, index) => {
    const obj = {
      time: item.slice(11, item.length),
      temperature: hourly.temperature_2m[index],
      feels: hourly.apparent_temperature[index],
      rain: hourly.rain[index],
      humidity: hourly.relativehumidity_2m[index],
      clouds: hourly.cloudcover[index],
      visibility: hourly.visibility[index],
      windDir: hourly.winddirection_10m[index],
      windSpeed: hourly.windspeed_10m[index],
    };
    acc.push(obj)
    return acc
  }, [])

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        function convertWindDirection(angle) {
          const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
          return directions[Math.round(angle / 45) % 8];
        }

        return (
          <div className="customTooltip">
            {payload.map((i) => (
              <div className='tempGraphData' style={{color: i.color}} key={i.name}>
                <p>{i.name}</p>
                <div className='units'>
                  <p>{i.value}</p>
                  <p>{i.unit}</p>
                </div>                 
              </div>
            )
            )}
            <div className='tempGraphData'>
              <div>
                <p>Humidity</p>
                <p>Wind direction</p>    
              </div>
              <div>
                <p>{`${payload[0].payload.humidity} %`}</p>
                <p>{`${convertWindDirection(payload[0].payload.windDir)}`}</p>
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
      <Title level={4}>Weather</Title>
    </div>
    {status === 'loading' && <div className='skeletonWrapper'><Skeleton count={5}/></div>}
    {(status === 'received' && !error) && (        
      <ResponsiveContainer width='100%' height={350}>
          <ComposedChart data={graphData}
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <XAxis padding={{ left: 0, right: 0 }} dataKey="time" />
              <ReferenceLine y={0} stroke="green" strokeDasharray="5 5" />
              <YAxis padding={{ top: 10, left: 30, right: 30 }} label={{ value: ['°C', '\nkm/h'], position: 'insideLeft', angle: -90, textAnchor: 'middle' }} />
              <Bar name={'Rain'} dataKey="rain" barSize={20} baseValue={10} unit={'mm'} fill="#413ea0" />
              <Tooltip content = {<CustomTooltip />}/>
              <Line type="monotone" name={'Temperature'} unit={'°C'} dataKey="temperature" stroke="#757761" />
              <Line type="monotone" name={'Feels like'} unit={'°C'} dataKey="feels" stroke="#f4e76e" />
              <Line type="monotone" name={'Wind speed'} unit={'km/h'} dataKey="windSpeed" stroke="#8ff7a7" />
              <Legend verticalAlign="bottom" height={36}/>
          </ComposedChart>
      </ResponsiveContainer>
      )}
    </>
)}

export default TemperatureGraph