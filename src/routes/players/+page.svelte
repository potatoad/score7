<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
	import PlayerCard from '../../components/PlayerCard.svelte'
	import { getPlayerContext } from '../../contexts/players.svelte'

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
	<h2>Set up players</h2>
	<div class="my-2 flex flex-row">
		<Input
			placeholder="Player name"
			bind:value={name}
			onkeydown={(e) => (e.key === 'Enter' ? handleAdd() : undefined)}
		/>
		<Button class="ml-3" onclick={handleAdd}>Add</Button>
		<Button class="ml-3" color="dark" onclick={context.resetPlayers}>Reset</Button>
	</div>

	{#if $players.length === 0}
		<p>No players yet.</p>
	{/if}

	<div>
		{#each $players as _, index (index)}
			<PlayerCard {index} />
		{/each}
	</div>
</div>
