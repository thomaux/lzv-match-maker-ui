import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import template from './LevelRange.html';
import { LevelRangeModel } from './LevelRangeModel';

@Component({
    template
})
export class LevelRange extends Vue {

    @Prop()
    lowest: number;

    @Prop()
    value: LevelRangeModel;

    low: string = null;
    high: string = null;

    isInvalid = false;
    touched = false;

    @Watch('high')
    onHighChanged(): void {
        if (this.low < this.high) {
            this.low = this.high;
        }
        this.onLowChanged();
    }

    @Watch('low')
    onLowChanged(): void {
        this.touched = true;
        this.$emit('input', new LevelRangeModel(parseInt(this.low, 10), parseInt(this.high, 10)));
    }

    @Watch('value.min')
    @Watch('value.max')
    onValueChanged(): void {
        if(!this.value.min && !this.value.max) {
            this.high = null;
            this.low = null;
        }
        this.isInvalid = this.touched && !(this.low && this.high);
    }
}