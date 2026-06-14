<script lang="ts">
	import PlayerCard from '../components/PlayerCard.svelte'
	import ScoreButtons from '../components/ScoreButtons.svelte'

	import { getPlayerContext } from '../contexts/players.svelte'

	const context = getPlayerContext()
	const players = context.players

	let scoredCards = $state([true, true, true, true, true, true, true, true, true, true, true, true])

	let numberOfScoredCards = $state(0)

	const resetScoredCards = (): void => {
		scoredCards = [true, true, true, true, true, true, true, true, true, true, true, true]
	}
</script>

<div class="flex flex-row mb-3">
	{#each $players as player, index (player.id)}
		<PlayerCard {player} {index} {resetScoredCards} />
	{/each}
</div>
<ScoreButtons {players} bind:scoredCards bind:numberOfScoredCards />
<!-- 
<div class="max-w-4xl mx-auto px-4">
	<div>
		<Input class="mb-4" placeholder="Name" type="text" bind:value={currentName} />
		<Button class="mb-4" onclick={() => handleNewPlayer()}>{m.add_player()}</Button>
		<div class="grid grid-cols-4">
			{#each players as player, index (index + 1)}
				<PlayerCard {player} bind:selectedPlayer {index} {handleDeletePlayer} {resetScoredCards} />
			{/each}
		</div>
		<Button class="mb-4" onclick={() => nextRound()}>{m.next_round()}</Button>
		Scored Cards: {numberOfScoredCards}
		<ScoreButtons {players} bind:selectedPlayer bind:scoredCards bind:numberOfScoredCards />
	</div>
</div> -->
