<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { getPlayerContext } from '../contexts/players.svelte'
	import FlipButton from './FlipButton.svelte'
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

	function resetScore(): void {
		$players[$currentPlayer].roundScore = 0
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
		'#F9BE60',
		'#F9BE60',
		'#F9BE60',
		'#F9BE60',
		'#F9BE60',
		'#F9BE60'
	]

	const bonusButtonColor = '#F9BE60'

	const isButtonDisabled = (button: number): boolean => {
		if (numberOfScoredCards >= 7) {
			return true
		}
		if (scoredCards[button] == false) return true
		return false
	}
</script>

<div class="grid grid-cols-4 gap-2 sm:w-fit m-auto relative">
	{#each { length: 12 }, number}
		<FlipButton
			number={number + 1}
			color={buttonColors[number]}
			disabled={isButtonDisabled(number)}
			onclick={() => {
				addScore(number + 1)
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
	<div class="col-span-2 flex flex-col gap-2">
		<Button
			color="alternative"
			size="sm"
			onclick={() => {
				resetScoredCards()
				resetScore()
			}}>Reset Hand</Button
		>
		<Button class="flex-1" size="lg" onclick={() => scoreRound()}>Score</Button>
	</div>
</div>
