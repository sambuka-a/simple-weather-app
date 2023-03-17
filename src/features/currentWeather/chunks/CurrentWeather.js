import { useSelector } from "react-redux"

import { Popover, Typography } from 'antd'
import { selectCurrentWeather } from '../currentWeather-slice';
import '../../../index.css'
import 'weather-icons/css/weather-icons.css';

const CurrentWeather = () => {
  const {status, error, current} = useSelector(selectCurrentWeather)
  const { Title } = Typography
  
  if(status === 'rejected' && error) {
    return <>{error}</>
  }

  let code = current?.weathercode
  const codes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99]
  let codeIndex = codes.indexOf(code)
  let icon
  let hour = +current?.time.slice(11,13)

  const descriptions = ['Clear sky', 'Mainly clear', 'Partly cloudy', 'Overcast', 'Fog', 'Rime fog', 'Light drizzle', 'Moderate drizzle', 'Heavy drizzle', 'Light freezing drizzle', 'Moderate freezing drizzle', 'Slight rain', 'Moderate rain', 'Heavy intensity rain', 'Freezing rain', 'Heavy intensity freezing rain', 'Slight snow', 'Moderate snow', 'Heavy intensity snow', 'Snow grains', 'Slight rain showers', 'Moderate rain showers', 'Violent Rain Showers', 'Heavy snow showers', 'Slight Thunderstorm', 'Moderate Thunderstorm', 'Slight hail thunderstorm', 'Heavy hail Thunderstorm']
  
  let descr = descriptions[codeIndex]
  const iconsDay = ['wi-day-sunny', 'wi-day-cloudy', 'wi-day-cloudy-high', 'wi-cloudy', 'wi-day-fog', 'wi-fog', 'wi-day-sprinkle', 'wi-sprinkle', 'wi-sprinkle', 'wi-day-sleet', 'wi-sleet', 'wi-day-rain', 'wi-rain-mix', 'wi-rain', 'wi-rain-wind', 'wi-rain-wind', 'wi-day-snow', 'wi-day-snow-wind', 'wi-snow', 'wi-day-hail', 'wi-day-showers', 'wi-showers', 'wi-showers', 'wi-day-snow-wind', 'wi-snow-wind', 'wi-day-storm-showers', 'wi-day-thunderstorm', 'wi-thunderstorm']
  const iconsNight = ['wi-night-clear', 'wi-night-partly-cloudy','wi-night-alt-cloudy', 'wi-cloudy', 'wi-night-fog', 'wi-night-sprinkle', 'wi-sprinkle', 'wi-sprinkle', 'wi-night-sleet', 'wi-sleet', 'wi-night-rain', 'wi-night-alt-rain-mix', 'wi-rain', 'wi-rain-wind', 'wi-rain-wind', 'wi-night-alt-snow', 'wi-night-snow-wind', 'wi-snow', 'wi-night-hail', 'wi-night-alt-showers', 'wi-showers', 'wi-showers', 'wi-night-snow-wind', 'wi-snow-wind', 'wi-night-storm-showers', 'wi-night-thunderstorm', 'wi-thunderstorm']
    
  if(codeIndex >= 0 && (hour > 6 && hour < 18)) {
      icon = `${iconsDay[codeIndex]} day`
    } else if(codeIndex >= 0){
      icon = `${iconsNight[codeIndex]} night`
    } else {
      icon = 'wi-refresh day'
    }


  const convertWindDirection = (angle) => {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
  }
  
  const content = (
    <div className="weatherDetails">
      <div>
        <p key={1}>Condition</p>
        <p key={2}>Wind direction</p>
        <p key={3}>Wind</p>
      </div>
      <div>
        <p><strong>{descr}</strong></p>
        <p><strong>{convertWindDirection(current?.winddirection)}</strong></p>
        <p><strong>{current?.windspeed} km/h</strong></p>
      </div>
    </div>
    );

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {(status === 'received' && !error) && (
        
      <div className='currentWeather'>
        <div className="w_icon">
          <Popover placement={'bottomLeft'} title="In Details" content={content} overlayInnerStyle={{borderRadius: '10px'}}>
            <i className={`wi ${icon}`}></i>
            </Popover>
        </div>
        <div className="wDescr">
          <Title level={2}>{`${current.temperature}°C`}</Title>
        </div>
      </div>
    )}
    </>
  )
}

export default CurrentWeather