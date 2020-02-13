import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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

    selectedRegion = null;

    regions: Region[] = [];

    @lazyInject(ApiService)
    apiService: ApiService;

    async beforeMount() {
        this.regions = await this.apiService.getRegions();
    }

    mounted() {
        if (this.value) {
            this.selectedRegion = this.value;
        }
    }

    @Watch('value')
    foo() {
        if(!this.value) {
            this.selectedRegion = null;
        }
    }
}