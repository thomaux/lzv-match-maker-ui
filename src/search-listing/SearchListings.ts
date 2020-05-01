import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import { LocationSelect } from '../common/components';
import { Listing } from '../common/models';
import { ApiService } from '../common/services/ApiService';
import { lazyInject } from '../container';
import { ListingsQuery, ListingsQueryModel } from './models/ListingsQueryModel';
import template from './SearchListings.html';
import './SearchListings.scss';

@Component({
    template,
    components: {
        LocationSelect
    }
})
export class SearchListings extends Vue {

    listings: Listing[] = [];

    queryModel = new ListingsQueryModel();

    @Ref()
    readonly locationSelect: LocationSelect;

    @lazyInject(ApiService)
    apiService: ApiService;

    async mounted(): Promise<void> {
        const queryParams: ListingsQuery = this.$router.currentRoute.query;
        const searchParams = new URLSearchParams();

        if (queryParams.regionId) {
            this.locationSelect.init(parseInt(queryParams.regionId, 10));
            searchParams.append('regionId', queryParams.regionId);
        } else {
            this.locationSelect.init(null);
        }

        if (queryParams.level) {
            this.queryModel.level = parseInt(queryParams.level, 10);
            searchParams.append('level', queryParams.level);
        }

        this.listings = await this.apiService.findListings('?' + searchParams.toString());  
    }

    async filterListings(queryObject: ListingsQueryModel | ListingsQuery): Promise<void> {
        const query = queryObject instanceof ListingsQueryModel ? queryObject.toQuery() : queryObject;
        this.$router.replace({
            path: '/search',
            query
        });

        this.listings = await this.apiService.findListings(ListingsQueryModel.toQueryString(query));
    }

    get sortedListings(): Listing[] {
        return this.listings.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    @Watch('queryModel.region')
    @Watch('queryModel.level')
    onQueryModelChanged(): void {
        this.filterListings(this.queryModel);
    }
}
