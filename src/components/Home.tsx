import React, { useState } from 'react'
import cn from 'classnames'

import { TextField, Button } from '@mui/material'

import { Card } from './Card'

import { useCustomDispatch, useCustomSelector } from '../hooks/store';
import { fetchCurrentWeather } from '../store/thunks/fetchCurrentWeather';

import WeatherMap from "./WeatherMap";

import './styles/home.scss';
import './styles/form.scss';

export const Home = () => {
    const [city, setCity] = useState('Ростов-На-Дону')
    const [state, setState] = useState('form')

    const dispatch = useCustomDispatch();
    const { weather } = useCustomSelector(state => state.currentWeatherSliceReducer);

    const handleClick = async () => {
        await dispatch(fetchCurrentWeather(city))
        setState('card')
    }

    const renderForm = () => {
        return <div className="form">
            <TextField id="outlined-basic" label="Название города" value={city} className="form__input" onChange={(event) => setCity(event.target.value)}></TextField>
            <Button onClick={handleClick} className="form__button" variant="text">Показать погоду</Button>
        </div>
    }

    const renderCard = () => {
        return <div>
            <Card weather={weather} />
            <div className="home__button-back">
                <Button onClick={() => setState('form')} className="card-block__button" variant="text">Назад</Button>
            </div>
        </div>
    }

    return <div className="home-block">
        <div className={cn("home__window", {"home__window_big" : state === 'card'})}>
            {   state === 'form' ? renderForm() : null  }
            {   state === 'card' ? renderCard() : null  }
        </div>
        { state === 'card' ? <WeatherMap city={weather.name} /> : null }
    </div>
}
