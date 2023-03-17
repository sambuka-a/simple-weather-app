import React from 'react'
import { useSelector } from "react-redux"

import '../../../index.css'

import { Popover, Image, Typography } from 'antd'
import { selectCurrentWeather } from '../currentWeather-slice';

const CurrentWeather = () => {
    const {status, error, current} = useSelector(selectCurrentWeather)
    const { Title } = Typography

    console.log(current);

    const convertWindDirection = (angle) => {
      const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
      return directions[Math.round(angle / 45) % 8];
    }

    const convertWMOCodes = (code) => {
      console.log(code);
      let descr = 'Unknown'
      if(code >= 0) {
        const descriptions = ['Clear sky', 'Mainly clear', 'Partly cloudy', 'Overcast', 'Fog', 'Rime fog', 'Light drizzle', 'Moderate drizzle', 'Heavy drizzle', 'Light freezing drizzle', 'Moderate freezing drizzle', 'Dense intensity freezing drizzle', 'Slight rain', 'Moderate rain', 'Heavy intensity rain', 'Freezing rain', 'Heavy intensity freezing rain', 'Slight snow', 'Moderate snow', 'Heavy intensity snow', 'Snow grains', 'Slight rain showers', 'Moderate rain showers', 'Violent Rain Showers', 'Slight Rain Showers', 'Heavy snow showers', 'Slight Thunderstorm', 'Moderate Thunderstorm', 'Slight hail thunderstorm', 'Heavy hail Thunderstorm']
        descr = descriptions[code]
      }
      return descr
    } 
    
    const content = (
      <div>
        <p key={1}>{<small>Condition : </small>}<strong>{convertWMOCodes(current?.weathercode)}</strong></p>
        <p key={2}>{<small>Wind direction : </small>}<strong>{convertWindDirection(current?.winddirection)}</strong></p>
        <p key={3}>{<small>Wind : </small>}<strong>{current?.windspeed} km/h</strong></p>
      </div>
      );

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {(status === 'received' && !error) && (
        
      <div className='currentWeather'>
        <Popover placement={'bottomLeft'} title="In Details" content={content}>
          <Title level={1}>{`${current.temperature}°C`}</Title>
        </Popover>
      </div>
    )}
    </>
  )
}

export default CurrentWeather