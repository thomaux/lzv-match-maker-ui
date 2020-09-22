import { Component, Vue } from 'vue-property-decorator';
import template from './Home.html';
import { HomeLink } from './HomeLink';

@Component({
    template,
    components: {
        HomeLink
    }
})
export class Home extends Vue {}