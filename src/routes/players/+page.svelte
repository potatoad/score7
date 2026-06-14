<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
    import PlayerCard from '../../components/PlayerCard.svelte'
    import { getPlayerContext } from '../../contexts/players.svelte'

    const context = getPlayerContext()
    const players = context.players

    let name = $state('')

    function handleAdd(): void {
        if (!name.trim()) return
        context.addPlayer(name.trim())
        name = ''
    }

    function resetScoredCards(): void {
        // placeholder for compatibility with PlayerCard
    }
</script>

<div class="p-4">
    <h2>Set up players</h2>
    <div class="my-2 flex flex-row">
    <Input placeholder="Player name" bind:value={name} />
        <Button class="ml-3" onclick={handleAdd}>Add</Button>
    </div>

    {#if $players.length === 0}
        <p>No players yet.</p>
    {/if}

    <div>
        {#each $players as player, index (player.id)}
            <PlayerCard {player} {index} {resetScoredCards} />
        {/each}
    </div>
</div>
 