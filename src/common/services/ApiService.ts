import { inject, injectable } from 'inversify';
import { CONSTANTS } from '../../constants';
import { CreateListingRequest } from '../../create-listing/CreateListingRequest';
import { ListingsQueryModel } from '../../search-listing/ListingsQueryModel';
import { Gym, Region } from '../models';
import { HttpService } from './HttpService';

@injectable()
export class ApiService {

    constructor(
        @inject(CONSTANTS.ApiRoot) private apiRoot: string,
        @inject(HttpService) private httpService: HttpService) { }

    findListings(query: ListingsQueryModel) {
        return this.httpService.get(`${this.apiRoot}/listing${query.toQueryString()}`);
    }

    getRegions(): Promise<Region[]> {
        return this.httpService.get(this.apiRoot + '/region');
    }
    createListing(createListingRequest: CreateListingRequest): Promise<number> {
        return this.httpService.post(this.apiRoot + '/listing', createListingRequest);
    }

    getGymsForRegion(regionId: number): Promise<Gym[]> {
        return this.httpService.get(`${this.apiRoot}/region/${regionId}/gyms`)
    }
}