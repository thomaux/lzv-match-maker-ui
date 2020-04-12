import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Region } from '../../models';
import template from './RegionSelect.html';

@Component({
    template
})
export class RegionSelect extends Vue {

    @Prop()
    value: Region;

    @Prop()
    regions: Region[];
    
    selectedRegion = null;
    
    mounted(): void {
        if (this.value) {
            this.selectedRegion = this.value;
        }
    }

    @Watch('value')
    foo(): void {
        if(!this.value) {
            this.selectedRegion = null;
        }
    }
}