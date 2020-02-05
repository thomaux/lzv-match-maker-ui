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

    regionId = -1;

    regions: Region[] = [];

    @lazyInject(ApiService)
    apiService: ApiService;

    async beforeMount() {
        this.regions = await this.apiService.getRegions();
    }

    mounted() {
        if(this.value) {
            this.regionId = this.value._id;
        }
    }

    update(value: string) {
        const regionId = parseInt(value, 10);
        this.$emit('input', this.regions.find(r => r._id === regionId));
    }
}