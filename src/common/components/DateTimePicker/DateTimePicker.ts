import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import template from './DateTimePicker.html';
import { buildHoursList, zeroPad } from './DateTimePickerUtils';

@Component({
    template
})
export class DateTimePicker extends Vue {

    @Prop()
    value: Date;

    day = null;
    month = null;
    year = new Date().getFullYear();

    hour = null;
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
