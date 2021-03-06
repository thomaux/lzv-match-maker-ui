import { Component, Ref, Vue } from 'vue-property-decorator';
import * as components from '../common/components';
import { LocationSelect } from '../common/components';
import { Team } from '../common/models';
import { ApiService } from '../common/services/ApiService';
import { AuthService } from '../common/services/AuthService';
import { lazyInject } from '../container';
import template from './CreateListing.html';
import { CreateListingModel } from './models/CreateListingModel';

@Component({
    template,
    components
})
export class CreateListing extends Vue {

    model: CreateListingModel = new CreateListingModel();
    team: Team = {} as Team;

    @Ref()
    locationSelect: LocationSelect;

    @lazyInject(ApiService)
    apiService: ApiService;

    @lazyInject(AuthService)
    authService: AuthService;

    async mounted(): Promise<void> {
        this.team = await this.authService.getTeamOfLoggedInUser();
        this.model.populate(this.team);    
        this.locationSelect.init(this.team.gym.regionId);
    }

    async create(): Promise<void> {
        const request = this.model.toRequestBody();
        if(request) {
            await this.apiService.createListing(this.model.toRequestBody());
            this.$router.push('search');
        }
    }
}
