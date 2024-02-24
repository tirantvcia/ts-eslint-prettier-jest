export class Coordinates {
    private constructor(private readonly latitude: number, private readonly longitude: number){};
    
    public static create(latitude : number, longitude: number) {
        if(latitude < 0 || longitude < 0) {
            throw new Error("Values less than Zero not allowed");
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
});