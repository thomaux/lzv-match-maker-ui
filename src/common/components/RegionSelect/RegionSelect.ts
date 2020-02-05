import { Component, Prop, Vue } from 'vue-property-decorator';
import { lazyInject } from '../../../container';
import { Region } from '../../models';
import { ApiService } from '../../services/ApiService';
import template from './RegionSelect.html';

@Component({
    template
})
export class RegionSelect extends Vue {

    @Prop()
    value: Region;

    regionId = 0;

    regions = [];

    @lazyInject(ApiService)
    apiService: ApiService;

    async beforeMount() {
        this.regions = await this.apiService.getRegions();
    }

    mounted() {
        this.regionId = this.value ?  this.value._id : 0;
    }

    update(regionId: any) {
        regionId = parseInt(regionId); // TODO: check if this is still required?
        this.$emit('input', this.regions.find(r => r._id === regionId));
    }
}