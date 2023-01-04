export type Weather = {
    name: string;
    main: {
        temp: number,
        pressure: number,
        humidity: number,
    },
    wind: {
        speed: number,
    },
    weather: {
        description: string,
    },
}