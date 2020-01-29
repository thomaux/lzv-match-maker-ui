import { Component, Vue, Watch } from 'vue-property-decorator';
import * as components from '../common/components';
import { Gym } from '../common/models/GymModel';
import { Region } from '../common/models/RegionModel';
import { ApiService } from '../common/services/ApiService';
import template from './CreateListing.html';
import { ListingModel } from './ListingModel';
import { lazyInject } from '../container';

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


    beforeMount() {
        this.model.date = '2020-12-31T22:00:00.000Z';
    }

    create() {
        this.apiService.createListing(this.model.toCreateListingRequest());
    }

    @Watch('region')
    async onRegionChanged(region: Region){
        this.gyms = region ? await this.apiService.getGymsForRegion(region._id) : [];
    }
}
