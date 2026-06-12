<script lang="ts">
	import { Button } from 'flowbite-svelte'
	let { players, selectedPlayer = $bindable(), scoredCards = $bindable() } = $props()
</script>

<div class="grid grid-cols-3 gap-2 w-fit">
	<Button
		disabled={scoredCards[0] ? false : true}
		class="text-white bg-[#C5B09D] hover:bg-[#C5B09D]/80 focus:ring-4 focus:outline-none focus:ring-[#C5B09D]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#C5B09D]/80 dark:focus:ring-[#C5B09D]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(1)
			scoredCards[0] = false
		}}>1</Button
	>
	<Button
		disabled={scoredCards[1] ? false : true}
		class="text-white bg-[#E7E923] hover:bg-[#E7E923]/80 focus:ring-4 focus:outline-none focus:ring-[#E7E923]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#E7E923]/80 dark:focus:ring-[#E7E923]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(2)
			scoredCards[1] = false
		}}>2</Button
	>
	<Button
		disabled={scoredCards[2] ? false : true}
		class="text-white bg-[#F44D5F] hover:bg-[#F44D5F]/80 focus:ring-4 focus:outline-none focus:ring-[#F44D5F]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F44D5F]/80 dark:focus:ring-[#F44D5F]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(3)
			scoredCards[2] = false
		}}>3</Button
	>
	<Button
		disabled={scoredCards[3] ? false : true}
		class="text-white bg-[#4DC0C3] hover:bg-[#4DC0C3]/80 focus:ring-4 focus:outline-none focus:ring-[#4DC0C3]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#4DC0C3]/80 dark:focus:ring-[#4DC0C3]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(4)
			scoredCards[3] = false
		}}>4</Button
	>
	<Button
		disabled={scoredCards[4] ? false : true}
		class="text-white bg-[#3AB259] hover:bg-[#3AB259]/80 focus:ring-4 focus:outline-none focus:ring-[#3AB259]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#3AB259]/80 dark:focus:ring-[#3AB259]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(5)
			scoredCards[4] = false
		}}>5</Button
	>
	<Button
		disabled={scoredCards[5] ? false : true}
		class="text-white bg-[#C054A9] hover:bg-[#C054A9]/80 focus:ring-4 focus:outline-none focus:ring-[#C054A9]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#C054A9]/80 dark:focus:ring-[#C054A9]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(6)
			scoredCards[5] = false
		}}>6</Button
	>
	<Button
		disabled={scoredCards[6] ? false : true}
		class="text-white bg-[#D68278] hover:bg-[#D68278]/80 focus:ring-4 focus:outline-none focus:ring-[#D68278]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#D68278]/80 dark:focus:ring-[#D68278]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(7)
			scoredCards[6] = false
		}}>7</Button
	>
	<Button
		disabled={scoredCards[7] ? false : true}
		class="text-white bg-[#B1DA7C] hover:bg-[#B1DA7C]/80 focus:ring-4 focus:outline-none focus:ring-[#B1DA7C]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#B1DA7C]/80 dark:focus:ring-[#B1DA7C]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(8)
			scoredCards[7] = false
		}}>8</Button
	>
	<Button
		disabled={scoredCards[8] ? false : true}
		class="text-white bg-[#EC961F] hover:bg-[#EC961F]/80 focus:ring-4 focus:outline-none focus:ring-[#EC961F]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#EC961F]/80 dark:focus:ring-[#EC961F]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(9)
			scoredCards[8] = false
		}}>9</Button
	>
	<Button
		disabled={scoredCards[9] ? false : true}
		class="text-white bg-[#EA1E29] hover:bg-[#EA1E29]/80 focus:ring-4 focus:outline-none focus:ring-[#EA1E29]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#EA1E29]/80 dark:focus:ring-[#EA1E29]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(10)
			scoredCards[9] = false
		}}>10</Button
	>
	<Button
		disabled={scoredCards[10] ? false : true}
		class="text-white bg-[#7BA4D0] hover:bg-[#7BA4D0]/80 focus:ring-4 focus:outline-none focus:ring-[#7BA4D0]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#7BA4D0]/80 dark:focus:ring-[#7BA4D0]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(11)
			scoredCards[10] = false
		}}>11</Button
	>
	<Button
		disabled={scoredCards[11] ? false : true}
		class="text-white bg-[#998678] hover:bg-[#998678]/80 focus:ring-4 focus:outline-none focus:ring-[#998678]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#998678]/80 dark:focus:ring-[#998678]/40 button-card"
		onclick={() => {
			players[selectedPlayer].addToRoundScore(12)
			scoredCards[11] = false
		}}>12</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].addToRoundScore(2)}>+2</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].addToRoundScore(4)}>+4</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].addToRoundScore(6)}>+6</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].addToRoundScore(8)}>+8</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].addToRoundScore(10)}>+10</Button
	>
	<Button
		class="text-[#EF6565] bg-[#F9BE60] hover:bg-[#F9BE60]/80 focus:ring-4 focus:outline-none focus:ring-[#F9BE60]/50 box-border border border-transparent shadow-xs font-bold rounded-base text-lg px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#F9BE60]/80 dark:focus:ring-[#F9BE60]/40 button-card"
		onclick={() => players[selectedPlayer].multiplyRoundScore(2)}>x2</Button
	>
</div>

<style>
	:global(.button-card) {
		width: 66px;
		height: 72px;
	}
</style>
