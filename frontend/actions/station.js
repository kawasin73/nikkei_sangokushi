const Actions = {
  SET_STATIONS: 'station/set_stations',
};

import { getStations } from '../api/request';

export default Actions

export function loadStations() {
  return async(dispatch) => {
    console.log("loadStations")
    let stations = await getStations();
    dispatch(setStations(stations));
  };
}

function setStations(stations) {
  return {
    type: Actions.SET_STATIONS,
    stations: stations,
  };
}
