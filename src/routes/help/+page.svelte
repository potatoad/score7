<script>
	import { m } from '$lib/paraglide/messages'
	import { A, P } from 'flowbite-svelte'
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte'
	import { ArrowDownOutline, ArrowUpOutline, LightbulbOutline } from 'flowbite-svelte-icons'
</script>

<div class="text-2xl text-center mb-4 mt-0 text-dark-blue-dark dark:text-yellow">
	{m.how_to_use()} <strong>Score7</strong>
</div>
<div>
	<h2>{m.scoring_a_game()}</h2>
	<P>
		<ParaglideMessage message={m.scoring_text}>
			{#snippet link1({ children, options })}
				<A href={options.to} class="underline">
					{@render children?.()}
				</A>
			{/snippet}

			{#snippet iconArrowDownOutline()}
				<ArrowDownOutline class="inline" />
			{/snippet}

			{#snippet iconArrowUpOutline()}
				<ArrowUpOutline class="inline" />
			{/snippet}

			{#snippet link2({ children, options })}
				<A href={options.to} class="underline">
					{@render children?.()}
				</A>
			{/snippet}
		</ParaglideMessage>
	</P>

	<h2>{m.winning()}</h2>
	<P>{m.the_aim_of_flip7()}</P>
	<P>{m.over_200_points()}</P>

	<h2>{m.customisation()}</h2>
	<P>
		<ParaglideMessage message={m.light_dark_mode}>
			{#snippet iconLightbulbOutline()}
				<LightbulbOutline class="inline" />
			{/snippet}
		</ParaglideMessage>
	</P>
	<P>{m.language_toggle()}</P>
</div>
