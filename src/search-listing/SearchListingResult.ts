import { Component, Prop, Vue } from 'vue-property-decorator';
import { Listing } from '../common/models';
import template from './SearchListingResult.html';

@Component({
    template
})
export class SearchListingResult extends Vue {

    @Prop()
    listing: Listing;
}