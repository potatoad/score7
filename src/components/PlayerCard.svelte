<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import { getPlayerContext } from '../contexts/players.svelte'

	const context = getPlayerContext()
	const players = context.players
	const currentPlayer = context.currentPlayer

	let { index = $bindable() } = $props()
</script>

<div
	class={` rounded-sm p-2 basis-sm m-1 cursor-pointer ${$currentPlayer === index ? 'bg-[#f7e7b2]' : 'bg-white/50'}`}
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
	<strong>{$players[index].name}</strong><br />
	{m.score()}: {$players[index].score}<br />
	{m.round_score()}: {$players[index].roundScore}
</div>
