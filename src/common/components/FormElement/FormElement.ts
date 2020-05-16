import { Component, Vue, Prop } from 'vue-property-decorator';
import template from './FormElement.html';

@Component({
    template
})
export class FormElement extends Vue {

    @Prop()
    label: string;

    id = '';

    touchedListener: () => void;

    mounted(): void {
        const element = this.getWrappedElement();

        if (!element) {
            return;
        }

        this.id = element.id;

        this.touchedListener = (): void => {
            element.classList.add('touched');
            element.removeEventListener('focusout', this.touchedListener);
        };

        element.addEventListener('focusout', this.touchedListener);
    }

    beforeDestroy(): void {
        const element = this.getWrappedElement();

        if(element) {
        element.removeEventListener('focusout', this.touchedListener);
        }
    }

    getWrappedElement(): Element {
        const defaultSlot = this.$slots.default[0];

        if (['input', 'select'].indexOf(defaultSlot.tag) === -1) {
            return;
        }

        return defaultSlot.elm as Element;
    }
}