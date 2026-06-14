<script lang="ts">
	import { Button } from 'flowbite-svelte'
	let {
		players,
		selectedPlayer = $bindable(),
		scoredCards = $bindable(),
		numberOfScoredCards = $bindable()
	} = $props()
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
	const bonusButtonText = '#EF6565'

	const baseClasses =
		'box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center button-card'

	const isButtonDisabled = (button: number): boolean => {
		if (numberOfScoredCards >= 7) return true
		if (scoredCards[button] == false) return true
		return false
	}
</script>

<div class="grid grid-cols-4 gap-2 sm:w-fit m-auto">
	<Button
		disabled={isButtonDisabled(0)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[0]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(1)
			scoredCards[0] = false
			numberOfScoredCards++
		}}>1</Button
	>
	<Button
		disabled={isButtonDisabled(1)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[1]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(2)
			scoredCards[1] = false
			numberOfScoredCards++
		}}>2</Button
	>
	<Button
		disabled={isButtonDisabled(2)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[2]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(3)
			scoredCards[2] = false
			numberOfScoredCards++
		}}>3</Button
	>
	<Button
		disabled={isButtonDisabled(3)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[3]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(4)
			scoredCards[3] = false
			numberOfScoredCards++
		}}>4</Button
	>
	<Button
		disabled={isButtonDisabled(4)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[4]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(5)
			scoredCards[4] = false
			numberOfScoredCards++
		}}>5</Button
	>
	<Button
		disabled={isButtonDisabled(5)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[5]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(6)
			scoredCards[5] = false
			numberOfScoredCards++
		}}>6</Button
	>
	<Button
		disabled={isButtonDisabled(6)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[6]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(7)
			scoredCards[6] = false
			numberOfScoredCards++
		}}>7</Button
	>
	<Button
		disabled={isButtonDisabled(7)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[7]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(8)
			scoredCards[7] = false
			numberOfScoredCards++
		}}>8</Button
	>
	<Button
		disabled={isButtonDisabled(8)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[8]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(9)
			scoredCards[8] = false
			numberOfScoredCards++
		}}>9</Button
	>
	<Button
		disabled={isButtonDisabled(9)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[9]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(10)
			scoredCards[9] = false
			numberOfScoredCards++
		}}>10</Button
	>
	<Button
		disabled={isButtonDisabled(10)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[10]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(11)
			scoredCards[10] = false
			numberOfScoredCards++
		}}>11</Button
	>
	<Button
		disabled={isButtonDisabled(11)}
		class="{baseClasses} button-number"
		style="--btn-color: {buttonColors[11]}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(12)
			scoredCards[11] = false
			numberOfScoredCards++
		}}>12</Button
	>
	<Button
		disabled={numberOfScoredCards == 7 ? false : true}
		class="{baseClasses} col-span-4"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(15)
			numberOfScoredCards++
		}}>FLIP 7 (+15)</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].multiplyRoundScore(2)}>x2</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(2)}>+2</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(4)}>+4</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(6)}>+6</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(8)}>+8</Button
	>
	<Button
		class="{baseClasses} button-bonus"
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(10)}>+10</Button
	>
	<Button
		class={baseClasses}
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(10)}>Reset</Button
	>
	<Button
		class={baseClasses}
		style="--btn-color: {bonusButtonColor}; --btn-text: {bonusButtonText}"
		onclick={() => players[selectedPlayer].addToRoundScore(10)}>Score</Button
	>
</div>

<style>
	:global(.button-card) {
		height: 72px;
	}

	:global(.button-number) {
		background-color: var(--btn-color) !important;
		color: white !important;
	}
	:global(.button-number:hover) {
		background-color: color-mix(in srgb, var(--btn-color) 80%, transparent) !important;
	}
	:global(.button-number:focus) {
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--btn-color) 50%, transparent) !important;
	}

	:global(.button-bonus) {
		background-color: var(--btn-color) !important;
		color: var(--btn-text) !important;
	}
	:global(.button-bonus:hover) {
		background-color: color-mix(in srgb, var(--btn-color) 80%, transparent) !important;
	}
	:global(.button-bonus:focus) {
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--btn-color) 50%, transparent) !important;
	}
</style>
