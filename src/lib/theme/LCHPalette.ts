import { LCH2sRGB, parseHex, makeHex, sRGB2LCH, type ColorArray } from './color-utils';

export class LCHPalette {
	#hue: number;
	#chroma: number;
	#cache = new Map<number, string>();
	initialLightness?: number;

	constructor(hue: number, chroma: number, initialLightness?: number) {
		this.#hue = hue;
		this.#chroma = chroma;
		this.initialLightness = initialLightness;
	}

	static fromRGB(rgb: ColorArray) {
		const [l, c, h] = sRGB2LCH(rgb);
		return new LCHPalette(h, c, l);
	}

	static fromHex(hex: string) {
		return LCHPalette.fromRGB(parseHex(hex));
	}

	get hue(): number {
		return this.#hue;
	}

	get chroma(): number {
		return this.#chroma;
	}

	set hue(hue: number) {
		this.#hue = hue;
		this.#cache.clear();
	}

	set chroma(chroma: number) {
		this.#chroma = chroma;
		this.#cache.clear();
	}

	atLightness(lightness: number) {
		if (!this.#cache.has(lightness)) {
			this.#cache.set(lightness, this.calculate(lightness));
		}
		return this.#cache.get(lightness);
	}

	private calculate(lightness: number) {
		return makeHex(LCH2sRGB([lightness, this.#chroma, this.#hue]));
	}
}
