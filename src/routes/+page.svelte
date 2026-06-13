<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Input,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		DropdownItem,
		DropdownDivider,
		Dropdown
	} from 'flowbite-svelte'
	import { ChevronDownOutline } from 'flowbite-svelte-icons'
	import ScoreButtons from '../components/ScoreButtons.svelte'
	import { setLocale } from '$lib/paraglide/runtime'
	import { m } from '$lib/paraglide/messages.js'
	import PlayerCard from '../components/PlayerCard.svelte'

	import { page } from '$app/state'
	let activeUrl = $derived(page.url.pathname)

	class Player {
		name = $state('')
		score = $state(0)
		roundScore = $state(0)

		addToRoundScore(score: number): void {
			this.roundScore += score
		}

		multiplyRoundScore(multiplier: number): void {
			this.roundScore *= multiplier
		}

		resetRoundScore(): void {
			this.roundScore = 0
		}

		addToScore(score: number): void {
			this.score += score
		}

		constructor(name: string, score = 0, roundScore = 0) {
			this.name = name
			this.score = score
			this.roundScore = roundScore
		}

		toJSON(): { name: string; score: number; roundScore: number } {
			return {
				name: this.name,
				score: this.score,
				roundScore: this.roundScore
			}
		}
	}

	let players = $state<Player[]>([])
	let currentName = $state('')
	let selectedPlayer = $state(0)
	let loaded = $state(false)

	let scoredCards = $state([true, true, true, true, true, true, true, true, true, true, true, true])

	let numberOfScoredCards = $state(0)

	const resetScoredCards = (): void => {
		scoredCards = [true, true, true, true, true, true, true, true, true, true, true, true]
	}

	$effect(() => {
		if (!loaded) {
			const savedPlayers = localStorage.getItem('score7_players')
			if (savedPlayers) {
				try {
					const parsed = JSON.parse(savedPlayers)
					players = parsed.map((p: any) => new Player(p.name, p.score, p.roundScore))
				} catch (e) {
					console.error('Failed to load players:', e)
				}
			}

			const savedSelected = localStorage.getItem('score7_selectedPlayer')
			if (savedSelected) {
				selectedPlayer = parseInt(savedSelected, 10) || 0
			}
			loaded = true
			return
		}

		localStorage.setItem('score7_players', JSON.stringify(players))
		localStorage.setItem('score7_selectedPlayer', selectedPlayer.toString())
	})

	const handleNewPlayer = (): void => {
		if (currentName) {
			players.push(new Player(currentName))
			currentName = ''
		}
	}

	const handleDeletePlayer = (index: number): void => {
		players.splice(index, 1)
	}

	const nextRound = (): void => {
		players.forEach((player) => {
			player.addToScore(player.roundScore)
			player.resetRoundScore()
		})
		selectedPlayer = 0
		numberOfScoredCards = 0
		resetScoredCards()
	}
</script>

<ScoreButtons {players} bind:selectedPlayer bind:scoredCards bind:numberOfScoredCards />
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
