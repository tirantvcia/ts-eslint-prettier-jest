import { BowlingGame } from './../../core/bowling/BowlingGame';

describe('Bowling Game', () => {
	let game: BowlingGame;

	beforeEach(() => {
		game = new BowlingGame();
	});
	it('20 shots with 20 failures should be 0 points', () => {
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
	it('20 shots with 10 pairs de 1, should be 20 points', () => {
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
	it('20 shots, 1 spare, 1 hit, 17 failures, should be 21 points', () => {
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

	it('19 shots, 1 strke with 2 hits, the rest failures, should be 20 points', () => {
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

	it('12 shots, 12 strikes should be 300 points', () => {
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

			//bonus for the last strike
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 300;

		expect(result).toBe(expected);
	});

	it('20 shots, 10 spare -> 5-5 should be 150 points', () => {
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
			['5', '-'], //bonus for the last spare
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 150;

		expect(result).toBe(expected);
	});

	it('20 shots, 10 spare -> 8-2 should be 180 points', () => {
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
			['8', '-'], //bonus for the last spare
		];
		const result = game.bowling(shots) + game.extraShots(extraBonus);
		const expected = 180;

		expect(result).toBe(expected);
	});
});
