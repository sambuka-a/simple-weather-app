import React from 'react'
import { useSelector } from "react-redux"
import '../../../../index.css'

import { FrownTwoTone, MehTwoTone, SmileTwoTone, AlertTwoTone } from '@ant-design/icons';
import { Popover, Typography } from 'antd'
import { selectAirQuality } from './airQuality-slice';

const AirQuality = () => {
  const {status, error, airQ} = useSelector(selectAirQuality)
  const { Text } = Typography

  if(error) {
    return <>{error}</>
  }
  
  console.log(airQ);

  let currentDate = `${new Date().toISOString().slice(0, 14)}00`
  const index = airQ?.time?.indexOf(currentDate)

  const data = {
    pm2_5: airQ.pm2_5[index],
    pm_10: airQ.pm10[index],
    eaqi: airQ.european_aqi[index],
    ozone: airQ.ozone[index],
    co: airQ.carbon_monoxide[index],
    no2: airQ.nitrogen_dioxide[index],
    so2: airQ.sulphur_dioxide[index],
  }
  
  const content = (
    <div className='weatherDetails'>
      <div>
        <p key={1}>Ozone</p>
        <p key={2}>CO</p>
        <p key={3}>NO2</p>
        <p key={4}>SO2</p>
      </div>
      <div>
      <p><strong>{data.ozone} μg/m³</strong></p>
      <p><strong>{data.co} μg/m³</strong></p>
      <p><strong>{data.no2} μg/m³</strong></p>
      <p><strong>{data.so2} μg/m³</strong></p>
      </div>
    </div>
    );

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {(status === 'received' && !error) && (
        <div className='pmData'>
          <div className='pmDetailsIcon'>
              <Popover placement={'bottomRight'} title="In Details" content={content} overlayInnerStyle={{borderRadius: '10px'}}>
                {data.eaqi <= 40 && <SmileTwoTone className='smile' twoToneColor="#52c41a"/>}
                {(data.eaqi >= 41 && data.eaqi <= 60) && <MehTwoTone className='smile'/>}
                {(data.eaqi >= 61 && data.eaqi <= 100) && <FrownTwoTone className='smile' twoToneColor="#eb2f96"/>}
                {data.eaqi > 100 && <AlertTwoTone twoToneColor="#aa1a16"/>}
              </Popover>
          </div>
          <div className='pmDetails'>
            <Text type='secondary'>{`PM2.5 ${data.pm2_5} mg/m³`}</Text>
            <Text type='secondary'>{`PM10 ${data.pm_10} mg/m³`}</Text>
          </div>
        </div>
      )}
    </>
  )
}

export default AirQuality