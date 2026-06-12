<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
	import ScoreButtons from '../components/ScoreButtons.svelte'

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
</script>

<div>
	<h1>Score 7</h1>
	<Input class="mb-4" placeholder="Name" type="text" bind:value={currentName} />
	<Button class="mb-4" onclick={() => handleNewPlayer()}>Add Player</Button>
	{#each players as player, index (index + 1)}
		<div
			class={`m-4 rounded-lg p-2 ${index === selectedPlayer ? 'bg-[#f7e7b2]' : ''}`}
			role="button"
			tabindex="0"
			onclick={() => (selectedPlayer = index)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					selectedPlayer = index
					e.preventDefault()
				}
			}}
		>
			<h3>{player.name}</h3>
			<p>Score: {player.score}</p>
			<p>Round Score: {player.roundScore}</p>
			<Button onclick={() => handleDeletePlayer(index)}>Delete</Button>
		</div>
	{/each}
	<ScoreButtons {players} {selectedPlayer} />
</div>

<style>
	:global(.selected) {
		background-color: #f3f3f3;
	}
</style>
