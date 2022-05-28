<script lang="ts">
	export let color: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let checked = false;
</script>

<label class="color-{color}">
	<input type="checkbox" bind:checked {...$$props} />
	<div class="visual">
		<svg viewBox="0 0 24 24">
			<path d="M4 12L9 17L19.4 6.2" fill="none" stroke="currentColor" stroke-width="2.7" />
		</svg>
		<div class="bg" />
	</div>
	<slot />
</label>

<style lang="scss">
	$pathTotalLength: 22; // use js on the path node's `.getTotalLength()`;

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
		background-color: RGB(var(--on-bg));
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
		outline: 0px solid RGBA(var(--on-bg), 0.45);
		transition: outline-width 100ms var(--ease-in-out), outline-color 250ms var(--ease-in-out);
		border-radius: 5px;

		& > div {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.bg {
			top: 2px;
			left: 2px;
			width: calc(100% - 4px);
			height: calc(100% - 4px);
			background-color: RGB(var(--bg));
			border-radius: 3.25px;
			transition: transform 200ms var(--ease-in-out);
			transform: scale(1);
		}
		svg path {
			stroke: RGB(var(--bg));
			stroke-dasharray: $pathTotalLength;
			stroke-dashoffset: $pathTotalLength;
			transition: stroke-dashoffset 250ms var(--ease-in-out) 50ms;
		}
	}
	input:focus + .visual {
		outline-width: 2px;
	}
	input:checked + .visual {
		outline-color: RGBA(var(--acc), 0.45);
		background-color: RGB(var(--acc));

		.bg {
			transform: scale(0);
		}
		svg path {
			stroke-dashoffset: 0;
		}
	}
</style>
