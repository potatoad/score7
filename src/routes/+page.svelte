<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import PlayerCard from '../components/PlayerCard.svelte'
	import ScoreButtons from '../components/ScoreButtons.svelte'

	import { getPlayerContext } from '../contexts/players.svelte'

	const context = getPlayerContext()
	const players = context.players
	const roundNumber = context.roundNumber
</script>

<div class="text-2xl text-center mb-3 mt-0 text-dark-blue-dark dark:text-yellow">
	{m.round()}: <span class="font-bold round-number">{$roundNumber}</span>
</div>

<div class="flex flex-wrap mb-2">
	{#each $players as _, index (index)}
		<div class="flex-1 min-w-[100px]">
			<PlayerCard {index} />
		</div>
	{/each}
</div>

<ScoreButtons />
