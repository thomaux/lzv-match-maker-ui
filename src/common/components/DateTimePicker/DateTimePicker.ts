import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import template from './DateTimePicker.html';
import { buildHoursList, zeroPad } from './DateTimePickerUtils';

@Component({
    template
})
export class DateTimePicker extends Vue {

    @Prop()
    value: Date;

    day: string = null;
    month: string = null;
    year: string = new Date().getFullYear().toString();

    hour: string = null;
    hours = buildHoursList([], 18);

    get date(): Date {
        const date = new Date(`${this.year}-${zeroPad(this.month)}-${zeroPad(this.day)}T${this.hour}:00.000Z`);
        return isNaN(date.getTime()) ? undefined : date;
    }

    @Watch('date')
    onDateChanged(): void {
        this.$emit('input', this.date);
    }
}
