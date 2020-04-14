import { inject, injectable } from 'inversify';
import { CONSTANTS } from '../../constants';
import { CreateListingRequest } from '../../create-listing/models/CreateListingModel';
import { UpsertTeamRequest } from '../../manage-team/models/UpsertTeamModel';
import { CreatedResponse, Gym, Listing, Region, Team } from '../models';
import { HttpService } from './HttpService';

@injectable()
export class ApiService {

    constructor(
        @inject(CONSTANTS.ApiRoot) private apiRoot: string,
        @inject(CONSTANTS.AuthRoot) private authRoot: string,
        @inject(HttpService) private httpService: HttpService) { }

    findListings(query: string): Promise<Listing[]> {
        return this.httpService.get(`${this.apiRoot}/listing${query}`);
    }

    listTeams(): Promise<Team[]> {
        return this.httpService.get(this.apiRoot + '/team');
    }

    updateTeam(id: string, updateTeamRequest: UpsertTeamRequest): Promise<Team> {
        return this.httpService.put(`${this.apiRoot}/team/${id}`, updateTeamRequest);
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