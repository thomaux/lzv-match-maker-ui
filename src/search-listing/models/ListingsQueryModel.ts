import { Dictionary } from 'vue-router/types/router';
import { Region } from '../../common/models';

export interface ListingsQuery extends Dictionary<string | string[]> {
    regionId?: string;
    level?: string;
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

    toQuery(): ListingsQuery {
        const queryObject: ListingsQuery = {};

        if (this.region) {
            queryObject.regionId = '' + this.region.id ;
        }
        if (this.level) {
            queryObject.level = '' + this.level;
        }

        return queryObject;
    }

    static toQueryString(query: ListingsQuery): string {
        const keysWithValue = Object.keys(query);
        return keysWithValue.length ? '?' + keysWithValue.map(key => key + '=' + query[key]).join('&') : '';
    }
}