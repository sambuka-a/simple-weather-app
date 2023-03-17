import axios from 'axios'

const LOCATION_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'
const AIRQ_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const api = {
  fetchLocation: async (location) => {
    const response = await axios.get(`${LOCATION_URL}?name=${location}`)
    return response.data
  },
  fetchWeather: async ({lat, lon, timezone, date}) => {
    const response = await axios.get(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,cloudcover,visibility,windspeed_10m,winddirection_10m&timezone=${timezone}&start_date=${date}&end_date=${date}`)
    return response.data
  },
  fetchAQ: async ({lat, lon, date, timezone}) => {
    const response = await axios.get(`${AIRQ_URL}?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi&timezone=${timezone}&start_date=${date}&end_date=${date}`)
    return response.data
  },
}

export default api;