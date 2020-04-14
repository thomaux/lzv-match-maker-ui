import { Component, Ref, Vue } from 'vue-property-decorator';
import { LocationSelect } from '../common/components';
import { ApiService } from '../common/services/ApiService';
import { AuthService } from '../common/services/AuthService';
import { lazyInject } from '../container';
import template from './ManageTeam.html';
import { UpsertTeamModel } from './models/UpsertTeamModel';

@Component({
    components: {
        LocationSelect
    },
    template
})
export class ManageTeam extends Vue {

    model: UpsertTeamModel = new UpsertTeamModel();

    @Ref()
    readonly locationSelect: LocationSelect;

    @lazyInject(AuthService)
    authService: AuthService;

    @lazyInject(ApiService)
    apiService: ApiService;


    async mounted(): Promise<void> {
        const team = await this.authService.getTeamOfLoggedInUser();
        if(team) {
            this.model.populate(team);
            this.locationSelect.init(team.gym.regionId, team.gym.id);
        }
    }

    submit(): void {
        this.apiService.updateTeam(this.model.existingTeamId, this.model.toRequest());
    }

}
