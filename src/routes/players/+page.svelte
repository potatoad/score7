<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
	import PlayerCard from '../../components/PlayerCard.svelte'
	import { getPlayerContext } from '../../contexts/players.svelte'
	import { m } from '$lib/paraglide/messages'

	const context = getPlayerContext()
	const players = context.players

	let name = $state('')

	function handleAdd(): void {
		if (!name.trim()) return
		context.addPlayer(name.trim())
		name = ''
	}
</script>

<div class="text-2xl text-center mb-4 mt-0 text-dark-blue-dark dark:text-yellow">
	<span>{m.setup_players()}</span>
</div>
<div class="px-0">
	<div class="my-2 flex flex-col sm:flex-row">
		<Input
			placeholder={m.add_player_placeholder()}
			bind:value={name}
			onkeydown={(e) => (e.key === 'Enter' ? handleAdd() : undefined)}
		/>
		<Button class="sm:ml-3 sm:mt-0 mt-2" onclick={handleAdd}>{m.add_player()}</Button>
		<Button class="sm:ml-3 sm:mt-0 mt-2" color="dark" onclick={context.resetPlayers}
			>{m.reset_players()}</Button
		>
	</div>

	{#if $players.length === 0}
		<p>{m.no_players()}</p>
	{/if}

	<div class="flex flex-col gap-2">
		{#each $players as _, index (index)}
			<PlayerCard {index} />
		{/each}
	</div>
</div>
