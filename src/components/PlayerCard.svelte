<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
	import { getPlayerContext, type Player } from '../contexts/players.svelte'
	import { page } from '$app/state'
	import { ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons'
	const context = getPlayerContext()
	const players = context.players
	const currentPlayer = context.currentPlayer

	let { index = $bindable() } = $props()

	let editName = $state(false)
	let editScore = $state(false)
	let confirmDelete = $state(false)

	let newName = $state($players[index].name)

	let newScore = $state($players[index].score)
	function moveUp(e: MouseEvent): Player[] | void {
		e.stopPropagation()
		if (index === 0) return

		players.update((list) => {
			const newList = [...list]
			;[newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
			return newList
		})

		if ($currentPlayer === index) {
			context.setCurrentPlayer(index - 1)
		} else if ($currentPlayer === index - 1) {
			context.setCurrentPlayer(index)
		}
	}

	function moveDown(e: MouseEvent): Player[] | void {
		e.stopPropagation()
		if (index === $players.length - 1) return

		players.update((list) => {
			const newList = [...list]
			;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
			return newList
		})

		if ($currentPlayer === index) {
			context.setCurrentPlayer(index + 1)
		} else if ($currentPlayer === index + 1) {
			context.setCurrentPlayer(index)
		}
	}
</script>

<div
	class={`rounded-sm p-2 cursor-pointer ${
		$currentPlayer === index ? 'bg-[#f7e7b2] dark:bg-[#463b18]' : 'bg-white/50 dark:bg-black/50'
	} ${context.findWinners()?.indexOf($players[index]) == 0 && 'border-4 border-red'} ${
		context.findWinners()?.indexOf($players[index]) == 1 && 'border-4 border-yellow'
	} ${context.findWinners()?.indexOf($players[index]) == 2 && 'border-4 border-bg-blue-1'}
		}`}
	role="button"
	tabindex={0}
	onclick={() => {
		context.setCurrentPlayer(index)
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			context.setCurrentPlayer(index)
			e.preventDefault()
		}
	}}
>
	<div class="flex flex-wrap gap-1">
		<div class="flex grow flex-col min-w-30">
			<div class="flex flex-row gap-2">
				{#if !editName}
					<h3 class="my-0 text-base font-bold truncate">{$players[index].name}</h3>
				{:else}
					<Input style="width:180px;" type="text" bind:value={newName}></Input>
				{/if}
				{#if context.findWinners()?.indexOf($players[index]) == 0}
					<span class="text-red-dark dark:text-red font-bold">1st Place</span>
				{:else if context.findWinners()?.indexOf($players[index]) == 1}
					<span class="text-yellow-dark dark:text-yellow font-bold">2nd Place</span>
				{:else if context.findWinners()?.indexOf($players[index]) == 2}
					<span class="text-bg-blue-1-dark dark:text-bg-blue-1 font-bold">3rd Place</span>
				{/if}
			</div>
			<div class="flex flex-row">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 512"
					class="fill-dark-blue-dark dark:fill-cream w-4"
				>
					<path
						d="M128 32c17.7 0 32 14.3 32 32V275.6l64-21.3V64c0-17.7 14.3-32 32-32s32 14.3 32 32V232.9l64-21.3V64c0-17.7 14.3-32 32-32s32 14.3 32 32V190.3l64-21.3V64c0-17.7 14.3-32 32-32s32 14.3 32 32v83.6l53.9-18c16.8-5.6 34.9 3.5 40.5 20.2s-3.5 34.9-20.2 40.5L544 215.1V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V236.4l-64 21.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V279.1l-64 21.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V321.7l-64 21.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V364.4l-53.9 18c-16.8 5.6-34.9-3.5-40.5-20.2s3.5-34.9 20.2-40.5L96 296.9V64c0-17.7 14.3-32 32-32z"
					/>
				</svg>
				{#if !editScore}
					<p class="text-sm my-0">: {$players[index].score}</p>
				{:else}
					<Input class="ml-1" style="width:150px;" type="number" bind:value={newScore}></Input>
				{/if}
			</div>
			<div class="flex flex-row">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 512"
					class="fill-dark-blue-dark dark:fill-cream w-4"
				>
					<path
						d="M51.8 160.4c-3.7 2.1-4.9 6.8-2.8 10.5l167 289.3c2.1 3.7 6.8 4.9 10.5 2.8L419.4 351.6c3.7-2.1 4.9-6.8 2.8-10.5L255.2 51.8c-2.1-3.7-6.8-4.9-10.5-2.8L51.8 160.4zM7.5 194.9c-15.4-26.6-6.3-60.7 20.4-76.1L220.7 7.5c26.6-15.4 60.7-6.3 76.1 20.4l167 289.3c15.4 26.6 6.2 60.7-20.4 76.1L250.5 504.5c-26.6 15.4-60.7 6.2-76.1-20.4L7.5 194.9zm451.9 226c41.9-24.2 56.3-77.8 32.1-119.8L354.7 64.2c1.7-.2 3.5-.2 5.3-.2H584c30.9 0 56 25.1 56 56V456c0 30.9-25.1 56-56 56H360c-13.7 0-26.2-4.9-35.9-13l135.3-78.1z"
					/>
				</svg>
				<p class="text-sm my-0">: {$players[index].roundScore}</p>
			</div>
		</div>
		<div class={page.url.pathname == '/' ? 'hidden' : ''}>
			<div>
				<div class="flex flex-col sm:flex-row gap-1">
					<div class="flex flex-col gap-1">
						<Button class="flex grow " size="xs" onclick={(e: MouseEvent) => moveUp(e)}
							><ArrowUpOutline /></Button
						>
						<Button class="flex grow" size="xs" onclick={(e: MouseEvent) => moveDown(e)}
							><ArrowDownOutline /></Button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="basis-full sm:hidden"></div>
		<div class={page.url.pathname == '/' ? 'hidden' : 'w-full sm:w-30'}>
			<div class="flex flex-row sm:flex-col gap-1 justify-center">
				<Button
					size="xs"
					class={!editName ? '' : 'hidden'}
					onclick={() => {
						editName = true
					}}>Edit name</Button
				>
				<Button
					size="xs"
					class={!editName ? 'hidden' : ''}
					onclick={() => {
						$players[index].name = newName
						editName = false
					}}>Save name</Button
				>

				<Button
					size="xs"
					class={!editScore ? '' : 'hidden'}
					onclick={() => {
						editScore = true
					}}>Edit score</Button
				>
				<Button
					size="xs"
					class={!editScore ? 'hidden' : ''}
					onclick={() => {
						$players[index].score = newScore
						editScore = false
					}}>Save score</Button
				>

				<Button
					size="xs"
					class={!confirmDelete ? '' : 'hidden'}
					onclick={() => {
						confirmDelete = true
						setTimeout(() => (confirmDelete = false), 3000)
					}}>Delete player</Button
				>
				<Button
					size="xs"
					color="red"
					class={!confirmDelete ? 'hidden' : ''}
					onclick={() => {
						context.removePlayer($players[index].id)
					}}>Are you sure?</Button
				>
			</div>
		</div>
	</div>
</div>
