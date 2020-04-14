export interface Location {
    id: number;
    name: string;
}

export interface Region extends Location {
    lowestPossibleLevel: number;
}

export interface Gym extends Location {
    regionId: number;
}