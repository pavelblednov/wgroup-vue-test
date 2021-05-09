<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-md-5">
				<todo-list :aTodos="aTodos" @removeTodo="removeTodo" />
			</div>
		</div>

		<confirm v-if="oTodo" :isHidden="isHidden" :sName="oTodo.title" @hidden="onHideConfirm" />
	</div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import Confirm  from '@/components/Confirm.vue';

export default {
	name: 'home',

	components: {
		'todo-list': TodoList,
		'confirm': Confirm
	},

	data: function ()
	{
		return {
			aTodos: null,
			oTodo: null,
			isHidden: true
		}
	},

	mounted: function ()
	{
		this.aTodos = this.$store.getters.GET_TODO;
	},

	methods: {
		removeTodo: function (_oTodo)
		{
			this.oTodo = _oTodo;
			this.isHidden = !this.isHidden;
		},

		onHideConfirm: function (_oData)
		{
			if (_oData.delete)
			{
				this.$store.dispatch('REMOVE_TODO', this.oTodo);
			}

			this.oTodo = null;
			this.isHidden = _oData.hidden;
		}
	}
}
</script>

<style lang="scss">

</style>
