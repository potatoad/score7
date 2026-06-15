<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime'
	import { setPlayerContext } from '../contexts/players.svelte'
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte'
	import { ChevronDownOutline } from 'flowbite-svelte-icons'
	import '../app.css'
	import logo from '$lib/assets/logo.svg'
	import { onMount } from 'svelte'

	let { children } = $props()

	// initialize global players context for the app
	setPlayerContext()

	import { page } from '$app/state'
	import { m } from '$lib/paraglide/messages'
	let activeUrl = $derived(page.url.pathname)

	let theme = $state<'light' | 'dark' | 'auto'>('auto')

	function applyTheme(t: 'light' | 'dark' | 'auto'): void {
		theme = t
		if (typeof window === 'undefined') return

		localStorage.setItem('score7:theme', t)
		const isDark =
			t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		if (isDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	onMount(() => {
		const storedTheme = localStorage.getItem('score7:theme') as 'light' | 'dark' | 'auto' | null
		applyTheme(storedTheme ?? 'auto')

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (): void => {
			if (theme === 'auto') {
				applyTheme('auto')
			}
		}
		mediaQuery.addEventListener('change', handleChange)
		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	})
</script>

<Navbar class="bg-[#FFF6D9] dark:bg-[#6e674f] border-b-8 border-[#EC6353] dark:border-[#68261f]">
	<NavBrand href="/">
		<img src={logo} alt="Score 7 logo" width="200px" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl} class="mt-3 mx-auto w-[95%]">
		<NavLi href="/">{m.home()}</NavLi>
		<NavLi href="/players">{m.setup_players()}</NavLi>
		<NavLi class="cursor-pointer">
			{m.language()}<ChevronDownOutline
				class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white"
			/>
		</NavLi>
		<Dropdown simple class="w-44">
			<DropdownItem onclick={() => setLocale('en')}>English</DropdownItem>
			<DropdownItem onclick={() => setLocale('es')}>Espanol</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			{m.theme()} ({theme.charAt(0).toUpperCase() + theme.slice(1)})<ChevronDownOutline
				class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white"
			/>
		</NavLi>
		<Dropdown simple class="w-44">
			<DropdownItem onclick={() => applyTheme('light')}>{m.theme_light()}</DropdownItem>
			<DropdownItem onclick={() => applyTheme('dark')}>{m.theme_dark()}</DropdownItem>
			<DropdownItem onclick={() => applyTheme('auto')}>{m.theme_auto()}</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>

<div class="px-2 mt-2">
	<div
		class="bg-[#80CBD0] dark:bg-[#295a5c] text-primary-500 dark:text-primary-50 max-w-3xl mx-auto rounded-2xl p-3"
	>
		{@render children()}
	</div>
</div>
