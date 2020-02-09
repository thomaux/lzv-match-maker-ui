import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { LevelRangeModel } from '../../models';
import template from './LevelRange.html';

@Component({
    template
})
export class LevelRange extends Vue {

    @Prop()
    lowest: number;

    @Prop()
    value: LevelRangeModel;

    low = null;
    high = null;

    @Watch('high')
    onHighChanged() {
        if(this.low < this.high) {
            this.low = this.high
        }
        this.onLowChanged();
    }

    @Watch('low')
    onLowChanged() {
        const updatedValue: LevelRangeModel = {
            min: parseInt(this.low, 10),
            max: parseInt(this.high, 10)
        };
        this.$emit('input', updatedValue);
    }
}