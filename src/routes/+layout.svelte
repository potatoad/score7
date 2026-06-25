<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime'
	import { setPlayerContext } from '../contexts/players.svelte'
	import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte'
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
	<div class="yellow max-w-lg grow flex flex-col">
		<div
			class="oval top bg-cream dark:bg-cream-dark flex flex-col justify-center items-center absolute"
		>
			<img src={logo} alt="Score 7 logo" width="190px" class="pt-10" />
		</div>

		<!-- <div class="oval bottom bg-cream flex flex-col justify-center items-center absolute"></div> -->

		<div
			class="menu p-3 bg-cream dark:bg-cream-dark border-4 border-dark-blue dark:border-dark-blue-dark text-xl font-bold text-center flex flex-row gap-2 justify-between"
		>
			<div class="flex-1">
				<Button size="md" class="menu-btn">{m.menu()}</Button>
				<Dropdown simple triggeredBy=".menu-btn">
					<DropdownItem
						href="/"
						class={page.url.pathname == '/' ? 'bg-red dark:bg-red-dark' : 'block'}
						>{m.home()}</DropdownItem
					>
					<DropdownItem
						href="/players"
						class={page.url.pathname == '/players' ? 'bg-red dark:bg-red-dark' : 'block'}
						>{m.setup_players()}</DropdownItem
					>
					<DropdownItem
						href="/help"
						class={page.url.pathname == '/help' ? 'bg-red dark:bg-red-dark' : 'block'}
						>{m.help()}</DropdownItem
					>

					<DropdownDivider />

					<DropdownItem
						class={themeState.current == 'light' ? 'hidden' : ''}
						onclick={() => applyTheme('light')}
						>{m.toggle_theme()} <LightbulbSolid class="inline" /></DropdownItem
					>
					<DropdownItem
						class={themeState.current == 'dark' ? 'hidden' : ''}
						onclick={() => applyTheme('dark')}
						>{m.toggle_theme()} <LightbulbOutline class="inline" /></DropdownItem
					>

					<DropdownDivider />

					<DropdownItem class={getLocale() == 'en' ? 'hidden' : ''} onclick={() => setLocale('en')}
						>{m.toggle_lang()} 🇬🇧</DropdownItem
					>
					<DropdownItem class={getLocale() == 'es' ? 'hidden' : ''} onclick={() => setLocale('es')}
						>{m.toggle_lang()} 🇪🇸</DropdownItem
					>
				</Dropdown>
			</div>
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
	}
	:global(.dark) .oval {
		box-shadow:
			0 0 0 4px var(--color-dark-blue-dark),
			0 0 0 20px var(--color-red-dark),
			0 0 0 24px var(--color-dark-blue-dark);
	}
</style>
