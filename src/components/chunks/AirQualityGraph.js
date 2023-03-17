import React from 'react'
import { useSelector } from "react-redux"
import { Legend, Line, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';

import '../../../index.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { selectCurrentWeather } from '../currentWeather-slice';

const TemperatureGraph = () => {

  const {status, error, hourly} = useSelector(selectCurrentWeather)
  
  console.log(hourly);

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
          <div className="custom-tooltip">
            {payload.map((i) => (
              <p style={{color: i.color}} key={i.name}>{`${i.name} : ${i.value} ${i.unit}`}</p>
            )
            )}
            <p>{`Humidity : ${payload[0].payload.humidity} %`}</p>
            <p>{`Wind direction : ${convertWindDirection(payload[0].payload.windDir)}`}</p>
          </div>
        );
      }
      return null;
    };

  return (
    <>
    {status === 'loading' && <Skeleton count={5} />}
    {(status === 'received' && !error) && (
        <ResponsiveContainer width='100%' height={350}>
            <ComposedChart data={graphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis padding={{ left: 10, right: 10 }} dataKey="time" />
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