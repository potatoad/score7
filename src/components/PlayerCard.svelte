<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
    import { getPlayerContext } from '../contexts/players.svelte'

    const context = getPlayerContext()

	let {
		player,
		index = $bindable(),
		resetScoredCards
	} = $props()

	const currentPlayer = context.currentPlayer
</script>

<div
	class={` rounded-sm p-2 basis-sm m-1 cursor-pointer ${$currentPlayer === index ? 'bg-[#f7e7b2]' : 'bg-white/50'}`}
	role="button"
	tabindex={index}
	onclick={() => {
		context.setCurrentPlayer(index)
		resetScoredCards()
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			context.setCurrentPlayer(index)
			e.preventDefault()
		}
	}}
>
	<strong>{player.name}</strong><br />
	{m.score()}: {player.score}<br />
	{m.round_score()}: {player.roundScore}
</div>
