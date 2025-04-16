// data traffic from external

export interface IEarthQuakeLog {
    Depth: number;
    Timestamp: string;
    Longitude: number;
    Latitude: number;
    Location: string;
    Magnitude: number;
}

// components

export interface ILatestEarthquakes {
    allEarthquakes: IEarthQuakeLog[];
}

export interface ITopFive {
    allEarthquakes: IEarthQuakeLog[];
}

export interface ILogRow {
    earthquakeLog: IEarthQuakeLog;
}

export interface ILocationLink {
    location: string;
    lat: number;
    lon: number;
}

export interface IMagnitude {
    magnitude: number;
}