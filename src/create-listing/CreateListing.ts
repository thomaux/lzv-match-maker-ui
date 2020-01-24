import { Component, Vue, Watch } from 'vue-property-decorator';
import * as components from '../common/components';
import { Gym } from '../common/models/GymModel';
import { Region } from '../common/models/RegionModel';
import { createListing, getGymsForRegion } from '../common/services/ApiService';
import template from './CreateListing.html';
import { ListingModel } from './ListingModel';

@Component({
    template,
    components
})
export class CreateListing extends Vue {

    model: ListingModel = new ListingModel(); 

    region: Region = {} as Region;
    gyms: Gym[] = [];

    beforeMount() {
        this.model.date = '2020-12-31T22:00:00.000Z';
    }

    create() {
        createListing(this.model.toCreateListingRequest());
    }

    @Watch('region')
    async onRegionChanged(region: Region){
        this.gyms = region ? await getGymsForRegion(region._id) : [];
    }
}
