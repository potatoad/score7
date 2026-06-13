<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime'
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

	let { children } = $props()

	import { page } from '$app/state'
	let activeUrl = $derived(page.url.pathname)
</script>

<Navbar class="bg-[#FFF6D9] border-b-8 border-[#EC6353]">
	<NavBrand href="/">
		<span
			class="self-center text-3xl font-bold whitespace-nowrap text-[#FEDD50]"
			style="text-shadow:
                -2px -2px 1px #30348F,
                2px -2px 1px #30348F,
                -2px 2px 1px #30348F,
                2px 2px 1px #30348F,
                -3px 0px 1px #30348F,
                3px 0px 1px #30348F,
                0px -3px 1px #30348F,
                0px 3px 1px #30348F;">Score7</span
		>
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
