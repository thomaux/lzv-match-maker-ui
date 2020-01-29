import { inject, injectable } from 'inversify';
import { CreateListingRequest } from '../../create-listing/CreateListingRequest';
import { ListingsQueryModel } from '../../search-listing/ListingsQueryModel';
import { Gym, Region } from '../models';
import { HttpService } from './HttpService';

@injectable()
export class ApiService {

    private apiRoot = 'https://localhost:8443/api';

    constructor(@inject(HttpService) private httpService: HttpService) {}

    findListings(query: ListingsQueryModel) {
        return this.httpService.get(`${this.apiRoot}/listing${query.toQueryString()}`);
    }
    
    getRegions(): Promise<Region[]> {
        return this.httpService.get(this.apiRoot + '/region');
    }
    createListing(createListingRequest: CreateListingRequest): Promise<number> {
        return this.httpService.post('listing', createListingRequest);
    }

    getGymsForRegion(regionId: number): Promise<Gym[]> {
        return this.httpService.get(`${this.apiRoot}/region/${regionId}/gyms`)
    }
}