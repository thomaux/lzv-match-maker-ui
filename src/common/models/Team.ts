import { Gym } from './Location';

export interface Team {
    id: string;
    name: string;
    level: number;
    gym: Gym;
    ownerId: string;
}