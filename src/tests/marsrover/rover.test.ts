
import { Coordinates } from "../../core/marsrover/Coordinates";
import { Navigator, NavigatorFacingNorth } from "../../core/marsrover/Navigator";

enum Command  {
    Left = 'toLeft',
    Right = 'toRight',
    Forward = 'toForward',
    Backward = 'toBackward'
}
export class Rover {
    formattedLocation(): any {
        return this.navigator.formattedLocation();
    }
    runCommands(commands: Command[]) {
        commands.forEach(command => {
            if (command === Command.Left) {
                this.navigator = this.navigator.toLeft();
            } else if (command === Command.Right) {
                this.navigator = this.navigator.toRight();
            } else if (command === Command.Forward) {
                this.navigator = this.navigator.toForward();
            } else if (command === Command.Backward) {
                this.navigator = this.navigator.toBackward();
            }
        }
        )
    }
    constructor(private navigator: Navigator) { }

}

describe('The Mars Rover', () => {
    it('executes a given single left command', () => {
        const coordinates: Coordinates = Coordinates.create(0, 0);
        const navigator: NavigatorFacingNorth = new NavigatorFacingNorth(coordinates);
        const rover: Rover = new Rover(navigator);

        rover.runCommands([Command.Left]);
        expect(rover.formattedLocation()).toBe('0:0:W');
        }
    );
    it('executes a given single right command', () => {
        const coordinates: Coordinates = Coordinates.create(0, 0);
        const navigator: NavigatorFacingNorth = new NavigatorFacingNorth(coordinates);
        const rover: Rover = new Rover(navigator);

        rover.runCommands([Command.Right]);
        expect(rover.formattedLocation()).toBe('0:0:E');
        }
    );
    it('executes a given single forward command', () => {
        const coordinates: Coordinates = Coordinates.create(0, 0);
        const navigator: NavigatorFacingNorth = new NavigatorFacingNorth(coordinates);
        const rover: Rover = new Rover(navigator);

        rover.runCommands([Command.Forward]);
        expect(rover.formattedLocation()).toBe('0:1:N');
        }
    );
    it('executes a given several commands', () => {
        const coordinates: Coordinates = Coordinates.create(0, 0);
        const navigator: NavigatorFacingNorth = new NavigatorFacingNorth(coordinates);
        const rover: Rover = new Rover(navigator);

        rover.runCommands([Command.Forward, Command.Forward, Command.Forward, Command.Left, Command.Forward, Command.Forward]);
        expect(rover.formattedLocation()).toBe('2:3:W');
        }
    );
});