
import { Coordinates } from "../../core/marsrover/Coordinates";
import { Navigator, NavigatorFacingNorth } from "../../core/marsrover/Navigator";
import { Rover } from "../../core/marsrover/Rover";

describe('The Mars Rover', () => {
    it.each([['L', '0:0:W'],
            ['R', '0:0:E'],
            ['F', '0:1:N'],
            ['LFF', '2:0:W'],
            ['LFFR', '2:0:N'],
            ['LFFRFF', '2:2:N']
        ]) (
        'generates the expected formatted location after executes the given command',
        (rawCommands, expectedLocation) => {
            const coordinates: Coordinates = Coordinates.create(0, 0);
            const navigator: Navigator = new NavigatorFacingNorth(coordinates);
            const rover: Rover = new Rover(navigator);
            expect(rover.run(rawCommands)).toBe(expectedLocation);
        }
    );

   
});