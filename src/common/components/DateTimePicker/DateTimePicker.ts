import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { required } from '../../validation';
import template from './DateTimePicker.html';

@Component({
    template
})
export class DateTimePicker extends Vue {

    @Prop()
    value: Date;

    date: Date = null;
    time: string = null;

    @Ref()
    dateMenu: unknown;
    dateMenuOpen = false;
   
    @Ref()
    timeMenu: unknown;
    timeMenuOpen = false;

    rules = {
        date: [required],
        time: [required]
    }

    today = new Date().toISOString();

    get dateTime(): Date {
      return new Date(`${this.date}T${this.time}:00.000Z`);
    }

    @Watch('dateTime')
    onDateChanged(dateTime: Date): void {
        this.$emit('input', dateTime);
    }
}
