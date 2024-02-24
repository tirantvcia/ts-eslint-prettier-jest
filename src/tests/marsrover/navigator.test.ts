export class Coordinates {
    private constructor(private readonly latitud: number, private readonly longitud: number){};
    
    public static create(latitud : number, longitud: number) {
        if(latitud < 0) {
            throw new Error("Values less than Zero not allowed");
        }
        return new Coordinates(latitud, longitud);
    }
}
describe('The Coordinates', () => {
    it('Does not allowed values less than Zero for the latitud' , () => {
        expect(() => Coordinates.create(-1, 0)).toThrow("Values less than Zero not allowed");
    
    });
});