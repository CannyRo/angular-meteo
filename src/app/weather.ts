
export interface Weather {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: Current;
    hourly_units: HourlyUnits;
    hourly: Hourly;
    daily_units: DaylyUnits;
    daily: Daily;
}

interface CurrentUnits {
    time: string;
    interval: string;
    temperature_2m: string;
    apparent_temperature: string;
    relativehumidity_2m: string;
    is_day: string;
    precipitation: string;
    weathercode: string;
    windspeed_10m: string;
    winddirection_10m: string;
    windgusts_10m: string;
}

interface Current {
    time: string;
    interval: number;
    temperature_2m: number;
    apparent_temperature: number;
    relativehumidity_2m: number;
    is_day: number;
    precipitation: number;
    weathercode: number;
    windspeed_10m: number;
    winddirection_10m: number;
    windgusts_10m: number;
}

interface HourlyUnits {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    precipitation_probability: string;
    weathercode: string;
    windspeed_10m: string;
    winddirection_10m: string;
    windgusts_10m: string;
}

interface Hourly {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
    windgusts_10m: number[];
}

interface DaylyUnits {
    time: string;
    weathercode: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
}

interface Daily {
    time: string[];
    weathercode: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
}