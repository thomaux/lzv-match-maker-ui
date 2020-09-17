import { ValidationResult } from './ValidationResult';

export const required = (v: unknown): ValidationResult => !!v || 'Dit veld is verplicht';