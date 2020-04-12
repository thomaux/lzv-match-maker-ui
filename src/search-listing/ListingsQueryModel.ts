import { Region } from '../common/models/RegionModel';

export interface ListingsQueryObject<T> {
    regionId?: T;
    level?: T;
}

export class ListingsQueryModel {

    region: Region = null;
    private _level: number = null;

    get level(): number {
        return this._level;
    }

    set level(level: number) {
        if(this.region && this.region.lowestPossibleLevel < level) {
            throw new Error('Cannot set level lower than region minimum');
        }
        this._level = level;
    }

    get lowestPossibleLevel(): number {
        return this.region ? this.region.lowestPossibleLevel : 5;
    }

    clear(): void {
        this.region = null;
        this.level = null;
    }

    toQueryString(): string {
        const queryObject = this.toQueryObject();
        const keysWithValue = Object.keys(queryObject);

        return keysWithValue.length ? '?' + keysWithValue.map(key => key + '=' + queryObject[key]).join('&') : '';
    }

    toQueryObject(): ListingsQueryObject<number> {
        const queryObject: ListingsQueryObject<number> = {};

        if (this.region) {
            queryObject.regionId = this.region.id ;
        }
        if (this.level) {
            queryObject.level = this.level;
        }

        return queryObject;
    }
}