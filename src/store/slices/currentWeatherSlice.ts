import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Weather } from '../types/types';

type CurrentWeather = {
    name: string,
    weather: Weather,
    isLoading: boolean,
    response: {
        status: number,
        message: string,
    }
};

const initialState: CurrentWeather = {
    name: '',
    weather: {
        name: '',
        main: {
            temp: 0,
            pressure: 0,
            humidity: 0,
        },
        wind: {
            speed: 0,
        },
        weather: {
            description: '',
        },
    },
    isLoading: false,
    response: {
        status: 0,
        message: '',
    }
};

export const currentWeatherSlice = createSlice({
    name: 'current_weather',
    initialState,
    reducers: {
        fetchCurrentWeather(state) {
            state.isLoading = true;
        },
        fetchCurrentWeatherSuccess(state, action:
            PayloadAction<AxiosResponse<Weather>>
        ) {
            state.weather = action.payload.data;
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            }
        },
        fetchCurrentWeatherError(state, action:
            PayloadAction<AxiosResponse<Weather>>
        ) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            }
        }
    }
})

export default currentWeatherSlice.reducer