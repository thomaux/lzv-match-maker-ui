import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { lazyInject } from '../../../container';
import { Gym, Location, Region } from '../../models';
import { ApiService } from '../../services/ApiService';
import template from './LocationSelect.html';

@Component({
    template
})
export class LocationSelect extends Vue {

    @Prop()
    value: Location;

    @Prop({ default: 'gym' })
    locationType: 'region' | 'gym';

    @Prop({ default: 'Regio' })
    regionLabel: string;

    @Prop({ default: 'Sporthal' })
    gymLabel: string;

    regions: Region[] = [];
    region: Region = null;
    gyms: Gym[] = [];
    gym: Gym = null;

    @lazyInject(ApiService)
    apiService: ApiService;

    async init(regionId: number, gymId?: number): Promise<void> {
        this.regions = await this.apiService.getRegions();
        this.region = this.regions.find(r => r.id === regionId);

        // add a watch on the locationType property
        this.$watch(this.locationType, (newValue: Region | Gym) => {
            this.$emit('input', newValue);
        });

        if (this.locationType !== 'gym') {
            return;
        }

        this.$emit('region-changed', this.region, true);

        this.gyms = await this.apiService.getGymsForRegion(regionId);

        if (gymId) {
            this.gym = this.gyms.find(g => g.id === gymId);
        }

        this.$watch('region', async (region: Region) => {
            this.gyms = await this.apiService.getGymsForRegion(region.id);
            this.gym = null;
            this.$emit('region-changed', region);
        });

    }

    @Watch('value')
    onValueChanged(newValue: Location): void {
        if (!newValue) {
            this[this.locationType] = null;
        }
    }
}