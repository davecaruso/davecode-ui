<!-- 
  @component
  ThemeRoot allows you to change the page theme (background, foreground, accent, etc) for
  components. Theme values are all CSS variables, so you can embed multiple ThemeRoots
  in your application at once, and even nest them.

  ThemeRoot expects one child, which is automatically set to the full size of the parent, this is
  prefered over modifying the styles of this element itself. When placed in a flexbox, ThemeRoot
  expands to fill the space.
-->
<svelte:options immutable />

<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const symbol = Symbol.for('@davecode/ui/theme');

	export interface ThemeContext {
		neutral: LCHPalette;
		primary: LCHPalette;
		secondary: LCHPalette;
		tertiary: LCHPalette;
		// error: LCHPalette;
	}

	export function getTheme(): SvelteStore<ThemeContext> {
		return getContext(symbol);
	}
</script>

<script lang="ts">
	import type { ColorArray } from './color-utils';
	import { LCHPalette } from './LCHPalette';

	export let inline = false;

	export let background: string = '#f2f2f2';
	export let primary: string = '#22c646';
	export let secondary: string | undefined = undefined;
	export let tertiary: string | undefined = undefined;
	export let error: string = '#ff0000';

	const rgb = (c: ColorArray) => c.map((x) => Math.round(x)).join(',');

	$: neutralPal = LCHPalette.fromHex(background);
	$: primaryPal = LCHPalette.fromHex(primary);
	$: secondaryPal = secondary
		? LCHPalette.fromHex(secondary)
		: new LCHPalette((primaryPal.hue + 60) % 360, primaryPal.chroma, primaryPal.initialLightness);
	$: tertiaryPal = tertiary
		? LCHPalette.fromHex(tertiary)
		: new LCHPalette((primaryPal.hue + 180) % 360, primaryPal.chroma, primaryPal.initialLightness);

	$: _primaryLightness = primaryPal.initialLightness!;
	$: _secondaryLightness = secondaryPal.initialLightness!;
	$: _tertiaryLightness = tertiaryPal.initialLightness!;

	$: bgLightness = neutralPal.initialLightness!;

	const themeContextStore = writable({} as ThemeContext);
	$: themeContextStore.set({
		neutral: neutralPal,
		primary: primaryPal,
		secondary: secondaryPal,
		tertiary: tertiaryPal
	});
	setContext(symbol, themeContextStore);
</script>

<theme-root
	class:inline
	style:--bg={rgb(neutralPal.colorAt(bgLightness))}
	style:--on-bg={rgb(neutralPal.colorOn(bgLightness))}
	style:--pri={rgb(primaryPal.colorAt(_primaryLightness))}
	style:--on-pri={rgb(primaryPal.colorOn(_primaryLightness))}
	style:--on-bg-pri={rgb(primaryPal.colorOn(bgLightness))}
	style:--sec={rgb(secondaryPal.colorAt(_secondaryLightness))}
	style:--on-sec={rgb(secondaryPal.colorOn(_secondaryLightness))}
	style:--on-bg-sec={rgb(secondaryPal.colorOn(bgLightness))}
	style:--tri={rgb(tertiaryPal.colorAt(_tertiaryLightness))}
	style:--on-tri={rgb(tertiaryPal.colorOn(_tertiaryLightness))}
	style:--on-bg-tri={rgb(tertiaryPal.colorOn(bgLightness))}
>
	<slot />
</theme-root>

<style>
	theme-root {
		display: block;
		background: rgb(var(--bg));
		color: rgb(var(--on-bg));
		--ease-in-out: cubic-bezier(0.4, 0, 0.1, 1);
	}
</style>
