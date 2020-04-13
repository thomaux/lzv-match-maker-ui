import { Component, Vue, Watch } from 'vue-property-decorator';
import * as components from '../common/components';
import { Gym } from '../common/models/GymModel';
import { Region } from '../common/models/RegionModel';
import { ApiService } from '../common/services/ApiService';
import { lazyInject } from '../container';
import template from './CreateListing.html';
import { CreateListingModel } from './CreateListingModel';
import { AuthService } from '../common/services/AuthService';
import { Team } from '../common/models';

@Component({
    template,
    components
})
export class CreateListing extends Vue {

    model: CreateListingModel = null;
    regions: Region[] = [];
    team: Team = null;

    region: Region = null;
    gyms: Gym[] = [];

    ready = false;

    @lazyInject(ApiService)
    apiService: ApiService;

    @lazyInject(AuthService)
    authService: AuthService;

    async beforeMount(): Promise<void> {
        this.team = await this.authService.getTeamOfLoggedInUser();
        this.model = new CreateListingModel(this.team);

        this.regions = await this.apiService.getRegions();
        this.region = this.regions.find(r => r.id === this.team.gym.regionId);

        this.gyms = await this.apiService.getGymsForRegion(this.region.id);

        this.ready = true;
    }

    create(): void {
        this.apiService.createListing(this.model.toRequestBody());
    }

    @Watch('region')
    async onRegionChanged(region: Region): Promise<void> {
        if(!this.ready) {
            return;
        }
        this.gyms = await this.apiService.getGymsForRegion(region.id);
        this.model.clearGymAndLevelRange();
    }
}
