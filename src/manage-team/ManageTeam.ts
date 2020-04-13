import { Component, Vue, Watch } from 'vue-property-decorator';
import { RegionSelect } from '../common/components';
import { Gym, Region } from '../common/models';
import { ApiService } from '../common/services/ApiService';
import { AuthService } from '../common/services/AuthService';
import { lazyInject } from '../container';
import template from './ManageTeam.html';
import { UpsertTeamModel } from './models/UpsertTeamModel';

@Component({
    components: {
        RegionSelect
    },
    template
})
export class ManageTeam extends Vue {

    model: UpsertTeamModel = null;

    regions: Region[] = [];
    region: Region = null;
    gyms: Gym[] = [];

    @lazyInject(AuthService)
    authService: AuthService;

    @lazyInject(ApiService)
    apiService: ApiService;

    ready = false;

    async created(): Promise<void> {
        const team = await this.authService.getTeamOfLoggedInUser();
        this.model = new UpsertTeamModel(team);

        this.regions = await this.apiService.getRegions();
        const regionId = team && team.gym.regionId;
        this.region = this.regions.find(r => r.id === regionId);

        this.gyms = regionId ? await this.apiService.getGymsForRegion(regionId) : [];

        this.ready = true;
    }

    submit(): void {
        this.apiService.updateTeam(this.model.existingTeamId, this.model.toRequest());
    }

    @Watch('region')
    async onRegionChanged(region: Region): Promise<void> {
        if(!this.ready) {
            return;
        }
        this.gyms = await this.apiService.getGymsForRegion(region.id);
        this.model.clearGymAndLevel();
    }
}