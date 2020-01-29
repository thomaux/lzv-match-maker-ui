import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '../common/services/ApiService';
import template from './SearchListings.html';
import { ListingsQuery } from './ListingsQuery';
import { ListingsQueryModel } from './ListingsQueryModel';
import { lazyInject } from '../container';

@Component({
    template,
    components: {
        ListingsQuery
    }
})
export class SearchListings extends Vue {

    listings: any[] = [];
    queryString = {};

    @lazyInject(ApiService)
    apiService: ApiService;

    beforeMount() {
        this.queryString = this.$router.currentRoute.query;
    }

    async filterListings(query: ListingsQueryModel) {
        this.$router.replace({
            path: '/search',
            query: query.toQueryObject() as any
        });

        this.listings = await this.apiService.findListings(query);
    }
}
