<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { getPlayerContext } from '../contexts/players.svelte'
	import FlipButton from './FlipButton.svelte'
	import { AwardOutline } from 'flowbite-svelte-icons'
	import { m } from '$lib/paraglide/messages'
	const context = getPlayerContext()
	const currentPlayer = context.currentPlayer
	const players = context.players

	let scoredCards = $state([true, true, true, true, true, true, true, true, true, true, true, true])

	let numberOfScoredCards = $state(0)

	const resetScoredCards = (): void => {
		scoredCards = [true, true, true, true, true, true, true, true, true, true, true, true]
		numberOfScoredCards = 0
	}

	/** Mutate the current player's roundScore and notify the store */
	function addScore(amount: number): void {
		$players[$currentPlayer].roundScore += amount
		$players = $players // trigger store reactivity
	}

	function multiplyScore(factor: number): void {
		$players[$currentPlayer].roundScore *= factor
		$players = $players // trigger store reactivity
	}

	function resetHand(): void {
		$players[$currentPlayer].roundScore = 0
		resetScoredCards()
		$players = $players // trigger store reactivity
	}

	function scoreRound(): void {
		$players[$currentPlayer].score += $players[$currentPlayer].roundScore
		$players[$currentPlayer].roundScore = 0
		$currentPlayer = ($currentPlayer + 1) % $players.length
		if ($currentPlayer === 0) context.incrementRoundNumber()
		resetScoredCards()
		$players = $players
	}

	const buttonColors = [
		'#F1207C',
		'#C5B09D',
		'#E7E923',
		'#F44D5F',
		'#4DC0C3',
		'#3AB259',
		'#C054A9',
		'#D68278',
		'#B1DA7C',
		'#EC961F',
		'#EA1E29',
		'#7BA4D0',
		'#998678',
		'#F9BE60'
	]

	const bonusButtonColor = '#F9BE60'

	const scoreButtonColor = '#3AB259'

	const isButtonDisabled = (button: number): boolean => {
		if (numberOfScoredCards >= 7) {
			return true
		}
		if (scoredCards[button] == false) return true
		return false
	}
</script>

<div class="grid grid-cols-5 gap-2 sm:w-fit m-auto relative">
	{#each { length: 13 }, number}
		<FlipButton
			{number}
			color={buttonColors[number]}
			disabled={isButtonDisabled(number)}
			onclick={() => {
				addScore(number)
				scoredCards[number] = false
				numberOfScoredCards++
				if (numberOfScoredCards === 7) {
					addScore(15)
				}
			}}
		/>
	{/each}

	<FlipButton
		number="x2"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			multiplyScore(2)
		}}
	/>
	<FlipButton
		number="+2"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			addScore(2)
		}}
	/>
	<FlipButton
		number="+4"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			addScore(4)
		}}
	/>
	<FlipButton
		number="+6"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			addScore(6)
		}}
	/>
	<FlipButton
		number="+8"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			addScore(8)
		}}
	/>
	<FlipButton
		number="+10"
		color={bonusButtonColor}
		disabled={false}
		onclick={() => {
			addScore(10)
		}}
	/>
	<FlipButton
		number={m.score_verb()}
		icon={AwardOutline}
		color={scoreButtonColor}
		disabled={false}
		onclick={() => {
			scoreRound()
		}}
	/>
</div>
<Button size="xs" color="alternative" class="mt-2 mx-auto block" onclick={() => resetHand()}
	>{m.reset_hand()}</Button
>
