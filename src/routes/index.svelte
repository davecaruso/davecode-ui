<script>
	import Button from '$lib/components/Button.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import ButtonRow from '$lib/layout/ButtonRow.svelte';
	import InputGroup from '$lib/layout/InputGroup.svelte';
	import ThemeRoot from '$lib/theme/ThemeRoot.svelte';
	let background = '#ededed';
	let primary = '#22c646';

	let group = 1;
</script>

<ThemeRoot {background} {primary}>
	<main>
		<h1>davecode ui kit</h1>
		<p>
			An entire page theme can be defined using two colors, <strong>background</strong> and
			<strong>primary</strong> color. These colors have their own "on"-colors that define what the text
			on these colors should be.
		</p>
		<div>
			<input type="color" bind:value={background} />
			<input type="color" bind:value={primary} />
		</div>
		<h2>Buttons</h2>
		<ButtonRow>
			<Button variant="normal">Normal</Button>
			<Button variant="subtle">Subtle</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
		</ButtonRow>
		<h2>Text Boxes</h2>
		<TextBox label="Text Box" placeholder="[placeholder]" />
		<TextBox label="Disabled" disabled />
		<h2>Radio Buttons</h2>
		<InputGroup>
			<Radio bind:group value={1}>Radio Button</Radio>
			<Radio bind:group value={2}>Radio Button</Radio>
			<Radio bind:group value={3}>Radio Button</Radio>
		</InputGroup>
		<h2>Checkboxes</h2>
		<InputGroup>
			<Checkbox>Checkbox Button</Checkbox>
			<Checkbox>Checkbox Button</Checkbox>
			<Checkbox>Checkbox Button</Checkbox>
		</InputGroup>
	</main>
</ThemeRoot>

<style>
	main {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
