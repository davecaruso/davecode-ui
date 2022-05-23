<!-- 
  @component
  Functions very similarly to any of the text based <input /> elements, but with a Material 2
  inspired look and feel. You can pass content to put before and after the input field by using the
  available slots `"before"` and `"after"`. Supports Themes, Accessibility, Proper Focus Control,
  SSR, clients without JS, and might even be able to bake you a cake.

  Supported `type` values:
  - text
  - password
  - email
  - search
  - tel
  - url

  See other components for the other input types.
 -->
<script lang="ts">
	import { useId } from '$lib/hooks/useId';
	import { getTheme } from '$lib/theme/ThemeRoot.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { scale } from 'svelte/transition';
	// import Icon from './Icon.svelte';

	const theme = getTheme();

	export let type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
	export let color: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let name: string | undefined = undefined;
	export let value = '';
	export let label: string | undefined = undefined;
	export let placeholder = '';
	export let disabled = false;
	export let focused = false;
	export let revealed = false;
	export let autocapitalize: string | undefined = undefined;
	export let autocomplete: string | undefined = undefined;
	export let autocorrect: string | undefined = undefined;
	export let spellcheck: boolean | undefined = undefined;
	export let error: unknown = undefined;

	const dispatch = createEventDispatcher();

	$: expanded = focused || !!value;

	let id = useId();

	let labelElem: HTMLLabelElement | undefined;
	let inputElem: HTMLInputElement | undefined;
	let root: HTMLElement | undefined;

	let labelX = 0;
	let init = true;

	onMount(async () => {
		labelX = labelElem?.offsetLeft ?? 0;
		if (document.activeElement === inputElem) {
			focused = true;
		}
		setTimeout(() => {
			init = false;
		}, 100);
	});

	function handleFocus() {
		focused = true;
	}

	function handleBlur(ev: FocusEvent) {
		const relatedTarget = ev.relatedTarget as HTMLElement;
		if (relatedTarget) {
			let parent = relatedTarget.parentElement;
			while (parent) {
				if (parent === root) {
					relatedTarget.addEventListener('blur', handleRelatedBlur);
					return;
				}
				parent = parent.parentElement;
			}
		}
		focused = false;
		dispatch('blur');
	}

	function handleRelatedBlur(ev: FocusEvent) {
		(ev.currentTarget as HTMLElement).removeEventListener('blur', handleRelatedBlur);
		handleBlur(ev);
	}

	function onInput(ev: Event) {
		if (inputElem) {
			value = inputElem.value;
			dispatch('change', value ?? '');
			error = undefined;
		}
	}

	const INTERACTABLE_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'];
	function handleClickFocus(ev: MouseEvent) {
		if (disabled) return;
		for (const elem of ev.composedPath()) {
			if (elem === root) {
				inputElem?.focus();
				return;
			}
			if (
				elem instanceof HTMLElement &&
				INTERACTABLE_TAG_NAMES.includes(elem.tagName) &&
				elem !== inputElem
			) {
				focused = true;
				elem.addEventListener('blur', handleRelatedBlur);
				return;
			}
		}
	}

	$: tb = color === 'primary' ? 'pri' : color === 'secondary' ? 'sec' : 'tri';

	$: bgLightness = $theme.neutral.initialLightness!;
	$: bgColor = $theme.neutral.hexAt(bgLightness + (bgLightness > 50 ? +5 : -5));
</script>

<div
	class="textbox"
	class:init
	class:focused
	class:expanded
	class:disabled
	class:error={!!error && !disabled}
	style:--tb="var(--{tb})"
	style:--on-tb="var(--on-bg-{tb})"
	style:background={bgColor}
	on:click={handleClickFocus}
	bind:this={root}
>
	{#if label}
		<div class="border-cover" aria-hidden="true">{label}</div>
	{/if}

	<slot name="left" />

	<div class="input-container">
		{#if label}
			<label
				bind:this={labelElem}
				for={id}
				style:--offsetX="{labelX}px"
				class:ssrExpand={expanded && labelX === 0}>{label}</label
			>
		{/if}
		<input
			{id}
			type={revealed ? 'text' : type}
			autocapitalize={revealed ? 'off' : autocapitalize}
			autocomplete={revealed ? 'off' : autocomplete}
			autocorrect={revealed ? 'off' : autocorrect}
			spellcheck={revealed ? false : spellcheck}
			{name}
			{value}
			{disabled}
			{placeholder}
			{...$$restProps}
			bind:this={inputElem}
			on:input={onInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
			on:change
		/>
	</div>

	{#if (type === 'password' && focused) || revealed}
		<button
			type="button"
			class="reveal"
			on:click={() => (revealed = !revealed)}
			transition:scale={{ duration: 100, start: 0.8 }}
		>
			<!-- <Icon name={revealed ? 'visibility_off' : 'visibility'} /> -->
		</button>
	{/if}

	<slot name="right" />
</div>

<style lang="scss">
	$labelFocusScale: 75%;

	.textbox {
		display: flex;
		position: relative;
		flex: 1;
		align-items: center;
		transition: border-color 100ms var(--ease-in-out), outline-color 100ms var(--ease-in-out),
			outline-width 100ms var(--ease-in-out);
		outline: solid 0px RGBA(var(--tb), 0.6);
		border: 2px solid RGBA(var(--on-bg), 0.7);
		border-radius: 0.3rem;
		background-color: RGBA(var(--bg-light), 0.2);
		padding: 0;
		min-height: 3rem;
		max-height: 3rem;
		user-select: none;
	}

	.focused {
		outline-width: 2px;
		border-color: RGBA(var(--tb), 1);
	}

	.error {
		// TODO: use theme color, but we don't have theme error colors, or really anything.
		border-color: red;
		outline-color: hsla(0, 100%, 50%, 0.4);

		label {
			color: red !important;
		}
	}

	.input-container {
		flex: 1 1 0;
		padding: 0 0.6rem;
		width: 0px;
	}

	input {
		border: none;
		background-color: transparent;
		width: 100%;
		height: 100%;
		font-family: inherit;
		color: inherit;
		&:focus {
			outline: none;
		}
		&::placeholder {
			transform: translateY(5px);
			opacity: 0;
			transition: opacity 100ms var(--ease-in-out), transform 0ms 100ms;
			color: RGB(var(--on-bg));
		}
	}

	label {
		position: absolute;
		transform-origin: left center;
		transition: transform 175ms var(--ease-in-out), color 100ms var(--ease-in-out);
		pointer-events: none;
		color: RGBA(var(--on-bg), 0.45);
	}

	.border-cover {
		position: absolute;
		top: -5px;
		left: 0.25rem;
		transform: scaleX(0);
		transition: transform 125ms var(--ease-in-out);
		background: RGB(var(--bg));
		padding: 0 0.4rem;
		height: 5px;
		color: transparent;
		font-size: $labelFocusScale;

		&::after {
			position: absolute;
			top: 4px;
			left: 0;
			border-bottom-right-radius: 4px;
			border-bottom-left-radius: 4px;
			background: linear-gradient(
				to bottom,
				RGB(var(--bg)) 0%,
				RGBA(var(--bg), 0.5) 70%,
				transparent 100%
			);
			width: 100%;
			height: 5px;
			content: '';
		}
	}

	.expanded,
	:global(.noscript) .textbox {
		label {
			transform: translateY(-24px) translateX(calc(0px - var(--offsetX) + 0.65rem))
				scale($labelFocusScale * 1);
			color: RGB(var(--on-bg));
		}
		.border-cover {
			transform: scaleX(1);
		}
		input::placeholder {
			transform: none;
			opacity: 0.45;
			transition-delay: 0ms;
			transition-duration: 250ms;
		}
	}

	.expanded.focused label {
		color: RGB(var(--on-tb));
	}

	.disabled {
		border-color: RGBA(var(--on-bg), 0.4);
		background-color: RGB(var(--bg));
		color: RGBA(var(--on-bg), 0.7);
	}

	.reveal {
		display: flex;
		flex: 0 0 2.5rem;
		justify-content: center;
		align-items: center;
		transform: translateZ(0.1px);
		margin: 0 0.25rem;
		border: none;
		border-radius: 50%;
		width: 2.5rem;
		height: 2.5rem;
		color: RGBA(var(--on-bg), 0.7);
		font-size: 1.5rem;
	}

	.textbox.init,
	.textbox.init * {
		transition-duration: 0ms !important;
	}

	:global(.noscript) .textbox label,
	.ssrExpand {
		position: absolute;
		left: 0.65rem;
		transform: translateY(-1.5rem) scale($labelFocusScale * 1) !important;
	}

	:global(.noscript) .textbox input {
		outline: 1px solid RGBA(var(--on-bg), 0.6);
		&:focus {
			outline-color: RGBA(var(--tb), 0.6);
		}
		&:hover {
			outline-color: RGBA(var(--tb), 0.4);
		}
	}
</style>
