<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime'
	import { setPlayerContext } from '../contexts/players.svelte'
	import { Button } from 'flowbite-svelte'
	import { LightbulbOutline, LightbulbSolid } from 'flowbite-svelte-icons'
	import '../app.css'
	import logo from '$lib/assets/logo.svg'
	import { onMount } from 'svelte'
	import { themeState } from '../theme.svelte'

	let { children } = $props()

	setPlayerContext()

	import { page } from '$app/state'
	import { m } from '$lib/paraglide/messages'

	function applyTheme(t: 'light' | 'dark' | 'auto'): void {
		themeState.current = t
		if (typeof window === 'undefined') return

		const isDark =
			t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		if (isDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	onMount(() => {
		applyTheme(themeState.current as 'light' | 'dark' | 'auto')

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (): void => {
			if (themeState.current === 'auto') {
				applyTheme('auto')
			}
		}
		mediaQuery.addEventListener('change', handleChange)
		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	})
</script>

<div class="flex justify-center">
	<div class="yellow max-w-lg grow-1 flex flex-col">
		<div
			class="oval top bg-cream dark:bg-cream-dark flex flex-col justify-center items-center absolute"
		>
			<img src={logo} alt="Score 7 logo" width="190px" class="pt-10" />
		</div>

		<!-- <div class="oval bottom bg-cream flex flex-col justify-center items-center absolute"></div> -->

		<div
			class="menu p-3 bg-cream dark:bg-cream-dark border-4 border-dark-blue dark:border-dark-blue-dark text-xl font-bold text-center flex flex-row gap-2 justify-between"
		>
			<Button
				pill={true}
				style=""
				class="p-2! dark:hidden"
				size="lg"
				onclick={() => applyTheme('dark')}
			>
				<LightbulbSolid class="shrink-0 h-6 w-6" />
			</Button>

			<Button
				pill={true}
				class="p-2! hidden dark:flex"
				size="lg"
				onclick={() => applyTheme('light')}
			>
				<LightbulbOutline class="shrink-0 h-6 w-6" />
			</Button>

			<Button href="/" class={page.url.pathname == '/' ? 'hidden' : 'block'}>{m.home()}</Button>
			<Button href="/players" class={page.url.pathname != '/' ? 'hidden' : 'block'}>{m.setup_players()}</Button>

			<Button class={getLocale() == 'en'? 'hidden':'block'} onclick={() => setLocale('en')}>🇪🇸</Button>
			<Button class={getLocale() == 'es'? 'hidden':'block'} onclick={() => setLocale('es')}>🇬🇧</Button>
		</div>
		<div class="p-3 pb-12">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	.menu {
		position: relative;
		width: calc(100% + 50px);
		left: -25px;
		margin-top: 40px;
	}
	.yellow {
		position: relative;
		background: var(--color-bg-blue-2);
		background: radial-gradient(circle, var(--color-bg-blue-3) 0%, var(--color-bg-blue-2) 100%);
		box-shadow:
			0 0 0 4px var(--color-dark-blue),
			0 0 0 15px var(--color-yellow),
			0 0 0 19px var(--color-dark-blue);
		corner-shape: superellipse(-infinity);
		border-radius: 30px;
		min-height: calc(100vh - 120px);
		margin: 80px 30px 30px;
	}

	:global(.dark) .yellow {
		box-shadow:
			0 0 0 4px var(--color-dark-blue-dark),
			0 0 0 15px var(--color-yellow-dark),
			0 0 0 19px var(--color-dark-blue-dark);
		background: radial-gradient(
			circle,
			var(--color-bg-blue-3-dark) 0%,
			var(--color-bg-blue-2-dark) 100%
		);
	}

	.oval {
		position: absolute;
		width: 250px;
		height: 150px;
		border-radius: 50%;
		left: calc(50% - calc(250px / 2));
		box-shadow:
			0 0 0 4px var(--color-dark-blue),
			0 0 0 20px var(--color-red),
			0 0 0 24px var(--color-dark-blue);
		&.top {
			top: -140px;
		}
		&.bottom {
			bottom: -150px;
		}
	}
	:global(.dark) .oval {
		box-shadow:
			0 0 0 4px var(--color-dark-blue-dark),
			0 0 0 20px var(--color-red-dark),
			0 0 0 24px var(--color-dark-blue-dark);
	}
</style>
