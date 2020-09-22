import { Prop, Component, Vue } from 'vue-property-decorator';
import template from './HomeLink.html';
@Component({
    template
})
export class HomeLink extends Vue {

    @Prop()
    to: string;

    @Prop()
    iconName: string;

    @Prop()
    iconColor: string;

    @Prop()
    label: string;

    @Prop()
    subText: string;
}