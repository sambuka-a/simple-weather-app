import { useDispatch, useSelector } from "react-redux"
import { selectSearch, selectCoordinates , setSearch, setSuggestionTrigger } from "./search-slice"; 
import { getCurrentWeather } from '../currentWeather/currentWeather-slice'
import { getAirQuality } from "../currentWeather/chunks/airQuality/airQuality-slice";

export const useSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector(selectSearch);
    const coordinates = useSelector(selectCoordinates)
    
    const handleSearch = (e) => { 
        dispatch(setSuggestionTrigger(true));
        dispatch(setSearch({name: e.target.value}))};

    const handleGetweather = () => {
        if (coordinates) {
            dispatch(getCurrentWeather(coordinates));
            dispatch(getAirQuality(coordinates));
        }
    }

    return [search, handleSearch, handleGetweather];
}