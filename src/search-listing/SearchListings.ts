import { Component, Vue } from 'vue-property-decorator';
import { Dictionary } from 'vue-router/types/router';
import { ApiService } from '../common/services/ApiService';
import { lazyInject } from '../container';
import { ListingsQuery } from './ListingsQuery';
import { ListingsQueryModel, ListingsQueryObject } from './ListingsQueryModel';
import template from './SearchListings.html';

@Component({
    template,
    components: {
        ListingsQuery
    }
})
export class SearchListings extends Vue {

    listings: object[] = [];

    queryModel = new ListingsQueryModel();
    isQueryModelInitialized = false; // TODO: is it OK to keep this flag on the main component or should we move it down to the region-select?

    @lazyInject(ApiService)
    apiService: ApiService;

    async beforeMount(): Promise<void> {
        const queryParams: ListingsQueryObject<string> = this.$router.currentRoute.query;

        if(queryParams.regionId) {
            const regions = await this.apiService.getRegions();
            this.queryModel.region = regions.find(r => r.id === queryParams.regionId);
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
}
