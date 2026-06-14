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

<div class="p-4">
	<h2>{m.setup_players()}</h2>
	<div class="my-2 flex flex-row">
		<Input
			placeholder={m.add_player_placeholder()}
			bind:value={name}
			onkeydown={(e) => (e.key === 'Enter' ? handleAdd() : undefined)}
		/>
		<Button class="ml-3" onclick={handleAdd}>{m.add_player()}</Button>
		<Button class="ml-3" color="dark" onclick={context.resetPlayers}>{m.reset_hand()}</Button>
	</div>

	{#if $players.length === 0}
		<p>{m.no_players()}</p>
	{/if}

	<div>
		{#each $players as _, index (index)}
			<PlayerCard {index} />
		{/each}
	</div>
</div>
