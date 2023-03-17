import React from 'react'
import { useSelector } from "react-redux"

import '../../../index.css'

import { Typography } from 'antd'
import { selectCurrentWeather } from '../currentWeather-slice';
    
const CurrentLocation = () => {
    const { Text } = Typography
    const {status, error, raw} = useSelector(selectCurrentWeather)

  return (
    <>
      {error && error}
      {status === 'loading' && <h2>Loading...</h2>}
      {(status === 'received' && !error) && (
        <div className='locationInfo'>
          <div>
            <Text strong >{`${raw.latitude} °N `}</Text>
            <Text strong >{`${raw.longitude} °S`}</Text>
          </div>
          <Text strong >{`${raw.elevation}m Above sea`}</Text>
          <small>{`Time zone ${raw.timezone}`}</small>
          <small>{`Time in GMT ${raw.timezone_abbreviation}`}</small>

      </div>
    )}
    </>
  )
}

export default CurrentLocation