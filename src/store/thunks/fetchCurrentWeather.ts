import { appDispatch } from '../store';
import { WeatherService } from '../../services/WeatherService';
import { currentWeatherSlice } from '../slices/currentWeatherSlice';

export const fetchCurrentWeather = (payload: string) => async (dispatch: appDispatch) => {
    dispatch(currentWeatherSlice.actions.fetchCurrentWeather())

    const res = await WeatherService.getCurrentWeather(payload);
    try {
        if (res.status === 200) {
            dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(res));
        } else {
            dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(res));
        }
    } catch (error) {
        console.log(error);
    }

}