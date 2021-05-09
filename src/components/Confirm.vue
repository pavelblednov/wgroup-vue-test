<template>
	<div :hidden="isHidden" class="confirm-container">
		<div class="confirm">
			<p>Are you sure you want to delete <b v-text="sName"></b>?</p>

			<div class="confirm-actions">
				<button type="button" class="btn-delete" @click="onHide(true)">Delete</button>
				<button type="button" class="btn-cancel" @click="onHide(false)">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'confirm',

	props: {
		isHidden: {
			type: Boolean,
			default: false
		},
		sName: String
	},

	methods: {
		onHide: function (_bCanDelete)
		{
			this.$emit('hidden', {
				hidden: !this.isHidden,
				delete: _bCanDelete
			});
		}
	}
}
</script>

<style lang="scss">
.confirm-container
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(#ccc, 0.5);
	text-align: center;
	z-index: 5;

	&::before,
	.confirm
	{
		display: inline-block;
		vertical-align: middle;
	}

	&::before
	{
		content: '';
		height: 100%;
	}

	.confirm
	{
		width: 90%;
		max-width: 320px;
		padding: 15px;
		background-color: #fff;
		border-radius: 15px;
	}

	.confirm-actions
	{
		button
		{
			border: none;
			padding: 7px 9px;
			font-size: 14px;
			color: #fff;
			cursor: pointer;
			outline: none;
			border-radius: 3px;
		}
	}

	.btn-delete
	{
		margin-right: 5px;
		background-color: #008000;
	}
	.btn-cancel
	{
		background-color: #f00;
	}
}
</style>
