import { Coordinates } from "../../core/marsrover/Coordinates";

export class NavigatorFacingNorth {

    constructor(private readonly coordinates: Coordinates){};

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
    
}
export class NavigatorFacingWest {

    constructor(private readonly coordinates: Coordinates){};
    
}
export class NavigatorFacingEast {

    constructor(private readonly coordinates: Coordinates){};
    
}

describe('The Navigator', () => {
    describe('when facing North', () => {
        it('should have West when to left' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.toLeft()).toBeInstanceOf(NavigatorFacingWest);
        });
        it('should have East when to right' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.toRight()).toBeInstanceOf(NavigatorFacingEast);
        });
        it('should have move +1 latitud position when forward' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 1)));
            expect(navigator.toForward()).toBeInstanceOf( NavigatorFacingNorth);
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 1));
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 2)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 9));
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 0)));
        });
        it('should have move -1 latitud position when forward' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 1));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 0)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 2));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 1)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 9)));
        });

    });
});