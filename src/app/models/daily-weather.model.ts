export interface DailyWeather{
    minTemp: number;
    maxTemp: number;
    main: string;
    description?: string;
    icon?: string;
    dayNumber?: number;
    dayText?: string;
    date: string;
    dateShort: number;
    id: number;
    dataByHours: any;
    hummidity: number;
    wind: number;
    temp: number;
}