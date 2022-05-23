<script lang="ts">
	export let align: 'left' | 'right' = 'left';
</script>

<button-row class="align-{align}">
	<slot />
</button-row>

<style>
	button-row {
		gap: 1rem;
		display: flex;
	}
	button-row :global(:empty) {
		flex: 1;
	}
	.align-left {
		justify-content: flex-start;
	}
	.align-right {
		justify-content: flex-end;
	}
</style>
