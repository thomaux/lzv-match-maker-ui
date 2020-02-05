import { Component, Prop, Vue } from 'vue-property-decorator';
import { RegionSelect } from '../common/components';
import template from './ListingsQuery.html';
import { ListingsQueryModel } from './ListingsQueryModel';

@Component({
    template,
    components: {
        RegionSelect
    }
})
export class ListingsQuery extends Vue {

    @Prop()
    model: ListingsQueryModel;
}