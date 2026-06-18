import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { browser } from '$app/environment'

/** A writable store that persists its value to localStorage */
function persistentWritable<T>(key: string, initial: T): Writable<T> {
	let value = initial
	if (browser) {
		const stored = localStorage.getItem(key)
		if (stored !== null) {
			try {
				value = JSON.parse(stored) as T
			} catch {
				// invalid JSON — fall back to initial
			}
		}
	}
	const store = writable<T>(value)
	if (browser) {
		store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)))
	}
	return store
}

export interface Player {
	id: string
	name: string
	score: number
	roundScore: number
}

export interface PlayersContext {
	players: Writable<Player[]>
	currentPlayer: Writable<number>
	setCurrentPlayer(_index: number): void
	roundNumber: Writable<number>
	incrementRoundNumber(): void
	addPlayer(_name: string): Player
	removePlayer(_id: string): void
	findPlayer(_id: string): Player | undefined
	findWinners(): Player[] | undefined
	resetRoundScores(): void
	resetPlayers(): void
}

const PlayerKey = Symbol('app.players')

const uid = (): string => Math.random().toString(36).slice(2, 9)

export const createPlayersContext = (): PlayersContext => {
	const players = persistentWritable<Player[]>('score7:players', [])
	const currentPlayer = persistentWritable<number>('score7:currentPlayer', 0)
	const roundNumber = persistentWritable<number>('score7:roundNumber', 1)

	function setCurrentPlayer(index: number): void {
		currentPlayer.set(index)
	}

	function incrementRoundNumber(): void {
		roundNumber.update((n) => n + 1)
	}

	function addPlayer(name: string): Player {
		const p: Player = { id: uid(), name, score: 0, roundScore: 0 }
		players.update((list) => [...list, p])
		return p
	}

	function removePlayer(id: string): void {
		players.update((list) => list.filter((p) => p.id !== id))
	}

	function findPlayer(id: string): Player | undefined {
		let found: Player | undefined
		players.subscribe((list) => {
			found = list.find((p) => p.id === id)
		})()
		return found
	}

	function findWinners(): Player[] | undefined {
		let winners: Player[] = []
		players.subscribe((list) => {
			winners = list.toSorted((a, b) => a.score - b.score).filter((player) => player.score >= 200).toReversed()
		})
		if(winners.length>0) return winners
		return undefined
	}

	function resetRoundScores(): void {
		players.update((list) => list.map((p) => ({ ...p, roundScore: 0 })))
	}

	function resetPlayers(): void {
		players.set([])
		roundNumber.set(1)
	}

	return {
		players,
		currentPlayer,
		roundNumber,
		setCurrentPlayer,
		incrementRoundNumber,
		addPlayer,
		removePlayer,
		findPlayer,
		findWinners,
		resetRoundScores,
		resetPlayers
	}
}

export const setPlayerContext = (): PlayersContext => {
	const ctx = createPlayersContext()
	setContext<PlayersContext>(PlayerKey, ctx)
	return ctx
}

export const getPlayerContext = (): PlayersContext => {
	return getContext<PlayersContext>(PlayerKey)
}
