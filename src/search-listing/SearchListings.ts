import { Component, Vue, Watch } from 'vue-property-decorator';
import { Dictionary } from 'vue-router/types/router';
import { RegionSelect } from '../common/components';
import { Listing, Region } from '../common/models';
import { ApiService } from '../common/services/ApiService';
import { lazyInject } from '../container';
import { ListingsQueryModel, ListingsQueryObject } from './ListingsQueryModel';
import template from './SearchListings.html';

@Component({
    template,
    components: {
        RegionSelect
    }
})
export class SearchListings extends Vue {

    listings: Listing[] = [];

    regions: Region[] = [];

    queryModel = new ListingsQueryModel();
    isQueryModelInitialized = false; // TODO: is it OK to keep this flag on the main component or should we move it down to the region-select?

    @lazyInject(ApiService)
    apiService: ApiService;

    async beforeMount(): Promise<void> {
        const queryParams: ListingsQueryObject<string> = this.$router.currentRoute.query;
        this.regions = await this.apiService.getRegions();

        if(queryParams.regionId) {
            const regionId = parseInt(queryParams.regionId, 10);
            this.queryModel.region = this.regions.find(r => r.id === regionId);
        }

        if(queryParams.level) {
            this.queryModel.level = parseInt(queryParams.level, 10);
        }

        this.isQueryModelInitialized = true;

        this.filterListings();
    }

    async filterListings(): Promise<void> {
        this.$router.replace({
            path: '/search',
            query: this.queryModel.toQueryObject() as Dictionary<string>
        });

        this.listings = await this.apiService.findListings(this.queryModel);
    }

    @Watch('queryModel.region')
    @Watch('queryModel.level')
    onQueryModelChanged(): void {
        this.filterListings();
    }
}
