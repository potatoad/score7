import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

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
    addPlayer(_name: string): Player
    removePlayer(_id: string): void
    findPlayer(_id: string): Player | undefined
    resetRoundScores(): void
}

const PlayerKey = Symbol('app.players')

const uid = (): string => Math.random().toString(36).slice(2, 9)

export const createPlayersContext = (): PlayersContext => {
    const players = writable<Player[]>([])
    const currentPlayer = writable<number>(0)

    function setCurrentPlayer(index: number): void {
        currentPlayer.set(index)
    }

    function addPlayer(name: string): Player {
        const p: Player = { id: uid(), name, score: 0, roundScore: 0 }
        players.update(list => [...list, p])
        return p
    }

    function removePlayer(id: string): void {
        players.update(list => list.filter(p => p.id !== id))
    }

    function findPlayer(id: string): Player | undefined {
        let found: Player | undefined
        players.subscribe(list => {
            found = list.find(p => p.id === id)
        })()
        return found
    }

    function resetRoundScores(): void {
        players.update(list => list.map(p => ({ ...p, roundScore: 0 })))
    }

    return {
        players,
        currentPlayer,
        setCurrentPlayer,
        addPlayer,
        removePlayer,
        findPlayer,
        resetRoundScores
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