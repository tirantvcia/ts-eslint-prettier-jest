export class Coordinates {
    static boundaryLatitude: number = 10;
    static boundaryLongitude: number = 10;
    private constructor(private readonly latitude: number, private readonly longitude: number){};
    
    public static create(latitude : number, longitude: number) {
        if(latitude < 0 || longitude < 0) {
            throw new Error("Values less than Zero not allowed");
        }

        if(latitude >= Coordinates.boundaryLatitude) {
            latitude = latitude % Coordinates.boundaryLatitude;
        }
        if(longitude >= Coordinates.boundaryLongitude) {
            longitude = longitude % Coordinates.boundaryLongitude;
        }

        return new Coordinates(latitude, longitude);
    }
}
describe('The Coordinates', () => {
    it('Does not allowed values less than Zero for the latitude' , () => {
        expect(() => Coordinates.create(-1, 0)).toThrow("Values less than Zero not allowed");
    
    });
    it('Does not allowed values less than Zero for the longitude' , () => {
        expect(() => Coordinates.create(0, -1)).toThrow("Values less than Zero not allowed");
    
    });
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

});