import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setSearch, setSuggestionTrigger } from '../search/search-slice'
import { getSuggestions, selectSuggestions } from "./suggestions-slice";
import { selectSearch, selectSuggestionTrigger } from "../search/search-slice";
import { List } from 'antd';


const Suggestions = () => {
  const dispatch = useDispatch();
  const town = useSelector(selectSearch);
  let townLength = town.length
  let display = useSelector(selectSuggestionTrigger)
  const {status, error, list} = useSelector(selectSuggestions);
  let date = new Date().toISOString().slice(0, 10)

    useEffect(() => {
      (townLength > 2) && 
      dispatch(getSuggestions(town));

    }, [town, dispatch]);

  const handleSuggestion = (suggestion) => {
    dispatch(setSuggestionTrigger(false))
    dispatch(setSearch(suggestion))
  }

  let locale = {
    emptyText: true,
  };

  return (
    <>
      {error && 'error'}
      {display && list.length > 1 && 
        <List className="suggestionsList"
        size="small"
        locale={locale}
        loading={status === 'loading'}
        bordered
        dataSource={list}
        renderItem={(i) => 
          <List.Item onClick={() => handleSuggestion(
            {
              name: i.name, 
              timezone: i.timezone, 
              lat: i.latitude.toFixed(2), 
              lon: i.longitude.toFixed(2),
              date: date,
            })
          }>
            {i.name} {<small>{i.admin1}</small>}
          </List.Item>}
      />
      }
    </>
  )
}

export default Suggestions