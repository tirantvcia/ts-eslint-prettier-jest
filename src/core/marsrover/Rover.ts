import { Navigator } from "./Navigator";

enum Command {
    Left = 'toLeft',
    Right = 'toRight',
    Forward = 'toForward',
    Backward = 'toBackward'
}
export class Rover {


    constructor(private navigator: Navigator) { }
    run(rawCommands: string): any {
        this.ensureValidCommand(rawCommands);
        const commands = this.rawCommandsToCommands(rawCommands);
        this.runCommands(commands);
        return this.formattedLocation();

    }
    private rawCommandsToCommands(rawCommands: string) {
        return rawCommands.split('').map((rawCommand) => {
            switch (rawCommand) {
                case 'L': return Command.Left;
                case 'R': return Command.Right;
                case 'F': return Command.Forward;
                case 'B': return Command.Backward;
                default: return Command.Forward;
            }
        });
    }

    private ensureValidCommand(command: string) {
        if (!command.match(/^[LRFB]+$/)) {
            throw new Error('Invalid command');
        }
    }

    private runCommands(commands: Command[]) {
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
        );
    }
    private formattedLocation(): any {
        return this.navigator.formattedLocation();
    }

}
