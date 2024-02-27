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
    formattedLocation(): any {
        return this.coordinates.toString() + ':N';
    }

    
}
export class NavigatorFacingWest {
   
    constructor(private readonly coordinates: Coordinates){};
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
    constructor(private readonly coordinates: Coordinates){};
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
    constructor(private readonly coordinates: Coordinates){};

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
        it('should have move +1 longitud position when forward' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.formattedLocation()).toEqual('0:0:N');
            
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 1)));
            expect(navigator.toForward()).toBeInstanceOf( NavigatorFacingNorth);
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 1));
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 2)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 9));
            expect(navigator.toForward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 0)));
           
        });
        it('should have move -1 longitud position when forward' , () => {
            let navigator = new NavigatorFacingNorth(Coordinates.create(0, 1));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 0)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 2));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 1)));
            navigator = new NavigatorFacingNorth(Coordinates.create(0, 0));
            expect(navigator.toBackward()).toEqual(new NavigatorFacingNorth(Coordinates.create(0, 9)));
        });

    });
    describe('when facing South', () => {
        it('should have East when to left' , () => {
            let navigator = new NavigatorFacingSouth(Coordinates.create(0, 0));
            expect(navigator.toLeft()).toBeInstanceOf(NavigatorFacingEast);
        });
        it('should have West when to right' , () => {
            let navigator = new NavigatorFacingSouth(Coordinates.create(0, 0));
            expect(navigator.toRight()).toBeInstanceOf(NavigatorFacingWest);
        });
        it('should have move decrease longitud position when forward' , () => {
            const navigator = new NavigatorFacingSouth(Coordinates.create(0, 2));
            const nextNavigator = navigator.toForward();
            expect(nextNavigator).toEqual(new NavigatorFacingSouth(Coordinates.create(0, 1)));
            expect(nextNavigator.formattedLocation()).toEqual('0:1:S');
           
        });
        it('should have increase longitud position when backward' , () => {
            const navigator = new NavigatorFacingSouth(Coordinates.create(0, 0));
            const nextNavigator = navigator.toBackward();
            expect(nextNavigator).toEqual(new NavigatorFacingSouth(Coordinates.create(0, 1)));
            expect(nextNavigator.formattedLocation()).toEqual('0:1:S');

        });

    });  
    describe('when facing West', () => {
        it('should have South when to left' , () => {
            let navigator = new NavigatorFacingWest(Coordinates.create(0, 0));
            expect(navigator.toLeft()).toBeInstanceOf(NavigatorFacingSouth);
        });
        it('should have North when to right' , () => {
            let navigator = new NavigatorFacingWest(Coordinates.create(0, 0));
            expect(navigator.toRight()).toBeInstanceOf(NavigatorFacingNorth);
        });
        it('should have increase latitude position when forward' , () => {
            const navigator = new NavigatorFacingWest(Coordinates.create(0, 0));
            const nextNavigator = navigator.toForward();
            expect(nextNavigator).toEqual(new NavigatorFacingWest(Coordinates.create(1, 0)));
            expect(nextNavigator.formattedLocation()).toEqual('1:0:W');
           
        });
        it('should have decrease longitude position when backward' , () => {
            const navigator = new NavigatorFacingWest(Coordinates.create(2, 0));
            const nextNavigator = navigator.toBackward();
            expect(nextNavigator).toEqual(new NavigatorFacingWest(Coordinates.create(1, 0)));
            expect(nextNavigator.formattedLocation()).toEqual('1:0:W');
        });

    });  

    describe('when facing East', () => {
        it('should have North when to left' , () => {
            let navigator = new NavigatorFacingEast(Coordinates.create(0, 0));
            expect(navigator.toLeft()).toBeInstanceOf(NavigatorFacingNorth);
        });
        it('should have South when to right' , () => {
            let navigator = new NavigatorFacingEast(Coordinates.create(0, 0));
            expect(navigator.toRight()).toBeInstanceOf(NavigatorFacingSouth);
        });
        it('should have move decrease latitude position when forward' , () => {
            const navigator = new NavigatorFacingEast(Coordinates.create(2, 0));
            const nextNavigator = navigator.toForward();
            expect(nextNavigator).toEqual(new NavigatorFacingEast(Coordinates.create(1, 0)));
            expect(nextNavigator.formattedLocation()).toEqual('1:0:E');
           
        });
        it('should have increase latitude position when backward' , () => {
            const navigator = new NavigatorFacingEast(Coordinates.create(0, 0));
            const nextNavigator = navigator.toBackward();
            expect(nextNavigator).toEqual(new NavigatorFacingEast(Coordinates.create(1, 0)));
            expect(nextNavigator.formattedLocation()).toEqual('1:0:E');

        });

    }); 
});