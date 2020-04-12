import { Gym } from './GymModel';

export interface Team {
    id: string;
    name: string;
    level: number;
    gym: Gym;
    ownerId: string;
}