export class Coordinates {
    static boundaryLatitude: number = 10;
    static boundaryLongitude: number = 10;
    private constructor(private readonly latitude: number, private readonly longitude: number) { };

    public static create(latitude: number, longitude: number) {
        if (latitude < 0) {
            latitude = Coordinates.boundaryLatitude - Math.abs(latitude);
        } else if (latitude >= Coordinates.boundaryLatitude) {
            latitude = latitude % Coordinates.boundaryLatitude;
        }

        if (longitude < 0) {
            longitude = Coordinates.boundaryLongitude - Math.abs(longitude);
        } else if (longitude >= Coordinates.boundaryLongitude) {
            longitude = longitude % Coordinates.boundaryLongitude;
        }

        return new Coordinates(latitude, longitude);
    }
    public increaseLatitude(): Coordinates {
        return Coordinates.create(this.latitude + 1, this.longitude);
    }
    public increaseLongitude(): any {
        return Coordinates.create(this.latitude, this.longitude + 1);
    }
    public decreaseLatitude(): any {
        return Coordinates.create(this.latitude - 1, this.longitude);
    }
    public decreaseLongitude(): any {
        return Coordinates.create(this.latitude, this.longitude - 1);
    }
    public toString() {
        return this.latitude + ':' + this.longitude;
    }

}
