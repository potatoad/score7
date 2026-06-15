<script lang="ts">
	import { type Component } from 'svelte'
	import { themeState } from '../theme.svelte.ts'

	let {
		number,
		icon,
		color,
		colorDark,
		disabled = false,
		onclick,
		className
	}: {
		number: number | string
		icon?: Component<any>
		color: string
		colorDark: string
		disabled: boolean
		onclick: () => void
		className?: string
	} = $props()

	const Icon = $derived(icon)

	const baseClasses =
		'box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center button-card'

	let isDark = $derived.by(() => {
        if (typeof window === 'undefined') return false
        if (themeState.current === 'dark') return true
        if (themeState.current === 'light') return false
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

</script>

<div class="button-container button-flip-horizontal {className}">
	<div class="flipper flipper-flip-horizontal" class:flipped={disabled}>
		<div
			class="{baseClasses} button-number button front rounded-lg"
			style="--btn-color: {isDark ? colorDark : color}"
			role="button"
			tabindex={0}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
					if (disabled) return
					onclick()
				}
			}}
			onclick={() => {
				if (disabled) return
				onclick()
			}}
		>
			{#if icon}
				<Icon class="shrink-0 h-10 w-10" />
				<span class="text-sm">{number}</span>
			{:else}
				{number}
			{/if}
		</div>
		<div class="{baseClasses} button-number button back rounded-lg" style="--btn-color: {isDark ? colorDark : color}">
			{#if icon}
				<Icon />
			{:else}
				<span class="text-2xl">{number}</span>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.button-container {
		display: inline-block;
		cursor: pointer;
		font-weight: 400;
		letter-spacing: 2px;
		height: 72px;
		width: 100%;
		-webkit-perspective: 1000;
		-ms-perspective: 1000;
		perspective: 1000;

		.flipper {
			transition: all 0.5s ease-in-out;
			-webkit-transform-style: preserve-3d;
			-ms-transform-style: preserve-3d;
			transform-style: preserve-3d;

			position: relative;
		}

		.button {
			color: white;
			height: 72px;
			width: 100%;
			backface-visibility: hidden;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-width: 2px;

			&.front {
				z-index: 10;
				border-color: color-mix(in hsl, var(--btn-color) 75%, black 25%);
			}

			&.back {
				cursor: not-allowed;
				border-color: #fedd50;
			}
		}
	}

	/* -------------------------------- 
			Flip
-------------------------------- */

	/*** Horizontal Flip ***/

	.button-flip-horizontal {
		.front {
			background-image: -webkit-linear-gradient(
				90deg,
				var(--btn-color),
				color-mix(in hsl, var(--btn-color) 90%, black 10%)
			);
			background-image: linear-gradient(
				90deg,
				var(--btn-color),
				color-mix(in hsl, var(--btn-color) 90%, black 10%)
			);
		}

		.back {
			background-image: -webkit-linear-gradient(
				90deg,
				var(--btn-color),
				color-mix(in hsl, var(--btn-color) 90%, black 10%)
			);
			background-image: linear-gradient(
				90deg,
				var(--btn-color),
				color-mix(in hsl, var(--btn-color) 90%, black 10%)
			);
			transform: rotateY(-180deg);
		}

		.flipper-flip-horizontal.flipped {
			transform: rotateY(-180deg);
		}
	}
</style>
