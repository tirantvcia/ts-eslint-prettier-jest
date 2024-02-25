import { Coordinates } from "../../core/marsrover/Coordinates";

describe('The Coordinates', () => {
    it('wraps around latitude when reaching boundary' , () => {
        let coordinates = Coordinates.create(10, 9);
        expect(coordinates).toEqual(Coordinates.create(0, 9));
        coordinates = Coordinates.create(11, 9);
        expect(coordinates).toEqual(Coordinates.create(1, 9));
    });
    it('wraps around longitude when reaching boundary' , () => {
        let coordinates = Coordinates.create(9, 10);
        expect(coordinates).toEqual(Coordinates.create(9 , 0));
        coordinates = Coordinates.create(9, 11);
        expect(coordinates).toEqual(Coordinates.create(9, 1));
    
    });
    it('increases latitude by one' , () => {
        let coordinates = Coordinates.create(0, 0);
        expect(coordinates.increaseLatitude()).toEqual(Coordinates.create(1 , 0));
        coordinates = Coordinates.create(9, 0);
        expect(coordinates.increaseLatitude()).toEqual(Coordinates.create(0 , 0));
   
    });
    it('increases longitude by one' , () => {
        let coordinates = Coordinates.create(0, 0);
        expect(coordinates.increaseLongitude()).toEqual(Coordinates.create(0 , 1));
        coordinates = Coordinates.create(0, 9);
        expect(coordinates.increaseLongitude()).toEqual(Coordinates.create(0 , 0));
   
    });
    it('decreases latitude by one' , () => {
        let coordinates = Coordinates.create(1, 0);
        expect(coordinates.decreaseLatitude()).toEqual(Coordinates.create(0 , 0));
        coordinates = Coordinates.create(0, 0);
        expect(coordinates.decreaseLatitude()).toEqual(Coordinates.create(9 , 0));
   
    });
    it('decreases longitude by one' , () => {
        let coordinates = Coordinates.create(0, 1);
        expect(coordinates.decreaseLongitude()).toEqual(Coordinates.create(0, 0));
        coordinates = Coordinates.create(0, 0);
        expect(coordinates.decreaseLongitude()).toEqual(Coordinates.create(0, 9));
   
    });

});