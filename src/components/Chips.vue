<template functional>
	<div class="chips">
		<span
			v-if="props.aItems.length"
			v-for="(oItem, index) in props.aItems" :key="oItem.id"
		>
			{{ oItem.name }}
			<button type="button" @click="props.onRemoveItem(index)">&times;</button>
		</span>

		<slot />
	</div>
</template>

<script>
export default {
	name: 'chips',

	props: {
		aItems: {
			type: Array,
			default: function () { return []; }
		},

		onRemoveItem: {
			type: Function,
			default: function (_index)
			{
				this.aItems.splice(_index, 1);
			}
		}
	}
}
</script>

<style lang="scss">
.chips
{
	margin-bottom: 10px;

	span
	{
		display: inline-block;
		vertical-align: middle;
		height: 25px;
		margin-right: 5px;
		padding: 0 5px;
		background-color: #e4e4e4;
		font-size: 12px;
		line-height: 25px;
		border-radius: 15px;
	}

	button
	{
		display: inline-block;
		vertical-align: top;
		background-color: transparent;
		border: none;
		width: 20px;
		height: 100%;
		padding: 0;
		font-size: 20px;
		line-height: inherit;
		text-align: center;
		outline: none !important;
		cursor: pointer;
	}

	input
	{
		display: inline-block;
		vertical-align: middle;
	}
}
</style>
