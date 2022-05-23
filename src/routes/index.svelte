<script>
	import Button from '$lib/components/Button.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import ButtonRow from '$lib/layout/ButtonRow.svelte';
	import ThemeRoot from '$lib/theme/ThemeRoot.svelte';
	let background = '#ededed';
	let primary = '#22c646';
</script>

<ThemeRoot {background} {primary}>
	<main>
		<h1>page theme test</h1>
		<p>
			An entire page theme can be defined using two colors, <strong>background</strong> and
			<strong>primary</strong> color. These colors have their own "on"-colors that define what the text
			on these colors should be.
		</p>
		<ButtonRow>
			<Button variant="normal">Normal</Button>
			<Button variant="subtle">Subtle</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
		</ButtonRow>
		<TextBox label="Text Box" />
		<TextBox label="Secondary Text Box" color="secondary" />
		<TextBox label="Tertiary Text Box" color="tertiary" />
	</main>
</ThemeRoot>

<input type="color" bind:value={background} />
<input type="color" bind:value={primary} />

<style>
	main {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
