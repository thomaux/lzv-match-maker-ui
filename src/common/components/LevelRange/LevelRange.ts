import { Component, Prop, Vue } from "vue-property-decorator";
import { LevelRangeModel } from "../../models";
import template from "./LevelRange.html";

@Component({
    template
})
export class LevelRange extends Vue {

    @Prop()
    maxAllowedLevel: number;

    @Prop()
    value: LevelRangeModel;

    allLevels = [1,2,3,4,5];

    toggle(level) {
    
    }
}