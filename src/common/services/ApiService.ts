import { inject, injectable } from 'inversify';
import { CONSTANTS } from '../../constants';
import { CreateListingRequest } from '../../create-listing/CreateListingModel';
import { ListingsQueryModel } from '../../search-listing/ListingsQueryModel';
import { CreatedResponse, Gym, Listing, Region, Team } from '../models';
import { HttpService } from './HttpService';

@injectable()
export class ApiService {

    constructor(
        @inject(CONSTANTS.ApiRoot) private apiRoot: string,
        @inject(CONSTANTS.AuthRoot) private authRoot: string,
        @inject(HttpService) private httpService: HttpService) { }

    findListings(query: ListingsQueryModel): Promise<Listing[]> {
        return this.httpService.get(`${this.apiRoot}/listing${query.toQueryString()}`);
    }

    listTeams(): Promise<Team[]> {
        return this.httpService.get(this.apiRoot + '/team');
    }

    getRegions(): Promise<Region[]> {
        return this.httpService.get(this.apiRoot + '/region');
    }
    createListing(createListingRequest: CreateListingRequest): Promise<CreatedResponse> {
        return this.httpService.post(this.apiRoot + '/listing', createListingRequest);
    }

    getGymsForRegion(regionId: number): Promise<Gym[]> {
        return this.httpService.get(`${this.apiRoot}/region/${regionId}/gyms`);
    }

    logout(): Promise<void> {
        return this.httpService.delete(this.authRoot);
    }
}