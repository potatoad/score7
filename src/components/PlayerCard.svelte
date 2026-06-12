<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { m } from '$lib/paraglide/messages.js'

	let {
		player,
		selectedPlayer = $bindable(),
		index,
		handleDeletePlayer,
		resetScoredCards
	} = $props()
</script>

<div
	class={`m-4 rounded-lg p-2 cursor-pointer ${selectedPlayer === index ? 'bg-[#f7e7b2]' : ''}`}
	role="button"
	tabindex="0"
	onclick={() => {
		selectedPlayer = index
		resetScoredCards()
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			selectedPlayer = index
			e.preventDefault()
		}
	}}
>
	<h3>{player.name}</h3>
	<p>{m.score()}: {player.score}</p>
	<p>{m.round_score()}: {player.roundScore}</p>
	<Button onclick={() => handleDeletePlayer(index)}>{m.delete()}</Button>
</div>
