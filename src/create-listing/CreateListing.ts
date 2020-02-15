import { Component, Vue, Watch } from 'vue-property-decorator';
import * as components from '../common/components';
import { Gym } from '../common/models/GymModel';
import { Region } from '../common/models/RegionModel';
import { ApiService } from '../common/services/ApiService';
import { lazyInject } from '../container';
import template from './CreateListing.html';
import { CreateListingRequest } from './CreateListingRequest';
import { ListingModel } from './ListingModel';

@Component({
    template,
    components
})
export class CreateListing extends Vue {

    model: ListingModel = new ListingModel();

    region: Region = {} as Region;
    gyms: Gym[] = [];

    @lazyInject(ApiService)
    apiService: ApiService;

    create(): void {
        this.apiService.createListing(new CreateListingRequest(this.model.teamName, this.model.gymId, this.model.date, this.model.levelRange));
    }

    @Watch('region')
    async onRegionChanged(region: Region): Promise<void> {
        this.gyms = region ? await this.apiService.getGymsForRegion(region._id) : [];
        this.model.clearGymAndLevelRange();
    }
}
