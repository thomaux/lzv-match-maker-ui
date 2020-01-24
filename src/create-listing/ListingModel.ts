import { LevelRangeModel } from "../common/models";
import { CreateListingRequest } from "./CreateListingRequest";

export class ListingModel {
    teamName: string;
    gymId: number;
    date: string;
    levelRange: LevelRangeModel;

    toCreateListingRequest(): CreateListingRequest {
        return {
            teamName: this.teamName,
            gymId: this.gymId,
            date: this.date,
            minLevel: this.levelRange.min,
            maxLevel: this.levelRange.max
        }
    }
}
