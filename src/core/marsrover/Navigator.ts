import { Coordinates } from "./Coordinates";

export type Navigator = NavigatorFacingNorth | NavigatorFacingSouth | NavigatorFacingEast | NavigatorFacingWest;

export class NavigatorFacingNorth {

    constructor(private readonly coordinates: Coordinates) { };

    toLeft(): any {
        return new NavigatorFacingWest(this.coordinates);
    }
    toRight(): any {
        return new NavigatorFacingEast(this.coordinates);
    }
    toForward(): any {
        return new NavigatorFacingNorth(this.coordinates.increaseLongitude());
    }
    toBackward(): any {
        return new NavigatorFacingNorth(this.coordinates.decreaseLongitude());
    }
    formattedLocation(): any {
        return this.coordinates.toString() + ':N';
    }


}
export class NavigatorFacingWest {

    constructor(private readonly coordinates: Coordinates) { };
    toRight(): NavigatorFacingNorth {
        return new NavigatorFacingNorth(this.coordinates);
    }
    toLeft(): NavigatorFacingSouth {
        return new NavigatorFacingSouth(this.coordinates);
    }
    toForward() {
        return new NavigatorFacingWest(this.coordinates.increaseLatitude());
    }
    toBackward() {
        return new NavigatorFacingWest(this.coordinates.decreaseLatitude());
    }
    formattedLocation(): any {
        return this.coordinates.toString() + ':W';
    }


}
export class NavigatorFacingEast {
    constructor(private readonly coordinates: Coordinates) { };
    toBackward() {
        return new NavigatorFacingEast(this.coordinates.increaseLatitude());
    }
    toForward() {
        return new NavigatorFacingEast(this.coordinates.decreaseLatitude());
    }
    toRight(): any {
        return new NavigatorFacingSouth(this.coordinates);
    }
    toLeft(): any {
        return new NavigatorFacingNorth(this.coordinates);
    }
    formattedLocation(): any {
        return this.coordinates.toString() + ':E';
    }

}

export class NavigatorFacingSouth {
    constructor(private readonly coordinates: Coordinates) { };

    toRight(): any {
        return new NavigatorFacingWest(this.coordinates);
    }
    toLeft(): any {
        return new NavigatorFacingEast(this.coordinates);
    }
    toBackward(): any {
        return new NavigatorFacingSouth(this.coordinates.increaseLongitude());
    }
    toForward(): any {
        return new NavigatorFacingSouth(this.coordinates.decreaseLongitude());
    }
    formattedLocation(): any {
        return this.coordinates.toString() + ':S';
    }


}
