import { BowlingGame } from './../../core/bowling/BowlingGame';

describe('El game de Bowling', () => {
	let game: BowlingGame;

	beforeEach(() => {
		game = new BowlingGame();
	});
	it('20 shots con 20 fallos seran 0 puntos', () => {
		const shots: string[][] = [
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = game.bowling(shots);
		const expected = 0;

		expect(result).toBe(expected);
	});
	it('20 shots con 10 pares de 1, seran 20 puntos', () => {
		const shots: string[][] = [
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
		];
		const result = game.bowling(shots);
		const expected = 20;

		expect(result).toBe(expected);
	});
	it('20 shots, 1 spare, 1 acierto, 17 fallos, son 21 puntos', () => {
		const shots: string[][] = [
			['5', '/'],
			['5', '1'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = game.bowling(shots);
		const expected = 21;

		expect(result).toBe(expected);
	});

	it('19 shots, 1 strke con 2 aciertos, el resto fallos, son 20', () => {
		const shots: string[][] = [
			['X', '-'],
			['2', '3'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = game.bowling(shots);
		const expected = 20;

		expect(result).toBe(expected);
	});

	it('12 shots, 12 strikes seran 300', () => {
		const shots: string[][] = [
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
		];
		const extraBonus: string[][] = [
			['X', '-'],
			['X', '-'],

			//bonus por los ultimos strike
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 300;

		expect(result).toBe(expected);
	});

	it('20 shots, 10 spare -> 5-5', () => {
		const shots: string[][] = [
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
		];
		const extraBonus: string[][] = [
			['5', '-'], //bonus por el ultimo spare
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 150;

		expect(result).toBe(expected);
	});

	it('20 shots, 10 spare -> 8-2', () => {
		const shots: string[][] = [
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
		];
		const extraBonus: string[][] = [
			['8', '-'], //bonus por el ultimo spare
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 180;

		expect(result).toBe(expected);
	});
});
