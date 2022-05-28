<script lang="ts">
	export let color: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let group: any;
	export let value: any;
</script>

<label class="color-{color}">
	<input type="radio" bind:group {value} {...$$props} />
	<div class="visual">
		<div class="border" />
		<div class="border2" />
		<div class="inner" />
	</div>
	<slot />
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 0.5rem;
	}
	.color-primary {
		--acc: var(--pri);
	}
	.color-secondary {
		--acc: var(--sec);
	}
	.color-tertiary {
		--acc: var(--tri);
	}
	input {
		position: absolute;
		opacity: 0;
	}
	.visual {
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		outline: 0px solid RGBA(var(--on-bg), 0.45);
		transition: outline-width 100ms var(--ease-in-out), outline-color 250ms var(--ease-in-out);

		& > div {
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.border,
		.border2 {
			border: 2px solid RGB(var(--on-bg));
			transition: transform 250ms var(--ease-in-out), border-color 250ms var(--ease-in-out);
		}
		.inner {
			background-color: RGB(var(--on-bg));
			left: 25%;
			top: 25%;
			width: 50%;
			height: 50%;
			transition: transform 250ms var(--ease-in-out), background-color 250ms var(--ease-in-out),
				opacity 250ms var(--ease-in-out);
			transform: scale(0.8);
			opacity: 0;
		}
	}
	input:focus + .visual {
		outline-width: 3px;
	}
	input:checked + .visual {
		outline-color: RGBA(var(--acc), 0.45);

		.border {
			transform: scale(1.03);
			border-color: RGB(var(--acc));
		}
		.border2 {
			transform: scale(0.9);
			border-color: RGB(var(--acc));
		}
		.inner {
			transform: scale(1);
			background-color: RGB(var(--acc));
			opacity: 1;
		}
	}
</style>
