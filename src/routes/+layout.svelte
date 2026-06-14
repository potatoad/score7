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

	let { children } = $props()

	// initialize global players context for the app
	setPlayerContext()

	import { page } from '$app/state'
	let activeUrl = $derived(page.url.pathname)
</script>

<Navbar class="bg-[#FFF6D9] border-b-8 border-[#EC6353]">
	<NavBrand href="/">
		<img src={logo} alt="Score 7 logo" width="200px"/>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/players">Set up players</NavLi>
		<NavLi class="cursor-pointer">
			Language<ChevronDownOutline class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white" />
		</NavLi>
		<Dropdown simple class="w-44">
			<DropdownItem onclick={() => setLocale('en')}>English</DropdownItem>
			<DropdownItem onclick={() => setLocale('es')}>Espanol</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>

<div class="bg-[#80CBD0] max-w-3xl mx-auto rounded-2xl m-3 p-3">
	{@render children()}
</div>
