import React from 'react'

import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './styles/card.scss'

import { Weather } from '../store/types/types';

interface IProps {
    weather: Weather,
}

export const Card = ({ weather } :IProps) => {
    const mmSt = Math.round(weather.main.pressure * 0.750062);

    const date = new Date()
    const todayDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

    return  <MuiCard sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
                Погода в городе: {weather.name}
            </Typography>
            <Typography variant="h5" component="div">
            </Typography>
            <Typography sx={{ fontSize: 17 }} gutterBottom color="text.secondary">
                На {todayDate}
            </Typography>
            <Typography variant="body2">
                {`Ветер: ${weather.wind.speed} м. в сек`}
                <br/>
                {`Температура: ${weather.main.temp} градусов`}
                <br/>
                {`Осадки: ${weather.weather[0].description}`}
                <br/>
                {`Давление: ${mmSt} мм. РТ. СТ.`}
                <br/>
                {`Влажность: ${weather.main.humidity}%`}
            </Typography>
        </CardContent>
    </MuiCard>
}