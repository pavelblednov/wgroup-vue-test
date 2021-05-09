<template>
	<div class="todos">
		<button class="btn-add" type="button" @click="onAddTodo">add new</button>

		<h2>Todo List</h2>

		<div class="todo-card" v-if="aTodos && aTodos.length" v-for="(oTodo, index) in aTodos" :key="index">
			<h3 class="todo-title" v-text="oTodo.title"></h3>

			<ul>
				<li v-for="oItem in oTodo.items"
					v-text="oItem.name"
					:key="oItem.id"
					:class="{'is-done': oItem.done}"
				></li>
			</ul>

			<div class="todo-actions">
				<button class="btn-edit" type="button" @click="onEditTodo(oTodo.id)">edit</button>
				<button class="btn-remove" type="button" @click="onRemoveTodo(oTodo)">remove</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'todo-list',

	props: {
		aTodos: {
			type: Array,
			default: function () { return []; }
		}
	},

	methods: {
		onAddTodo: function ()
		{
			this.$router.push({name: 'todo-add'});
		},

		onEditTodo: function (_ID)
		{
			this.$router.push({
				name: 'todo-edit',
				params: {
					id: _ID
				}
			});
		},

		onRemoveTodo: function (_oTodo)
		{
			this.$emit('removeTodo', _oTodo);
		}
	}
}
</script>

<style lang="scss">
.todos
{
	line-height: 1;

	.todo-card
	{
		margin-top: 15px;
		padding: 25px 15px;
		background-color: #eee;
		border-radius: 5px;
	}
	
	.todo-title
	{
		margin-top: 0;
	}

	ul
	{
		padding: 0;
		list-style: none;
	}

	li
	{
		margin-top: 10px;

		&.is-done
		{
			text-decoration: line-through;
		}
	}

	.btn-add
	{
		float: right;
	}
	.btn-edit
	{
		margin-right: 10px;
	}
	.btn-remove
	{

	}
}
</style>
