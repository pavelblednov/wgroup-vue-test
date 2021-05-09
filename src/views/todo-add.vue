<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-md-5">
				<router-link to="/">Home</router-link>

				<h2>Create</h2>

				<form novalidate @submit.prevent>
					<input type="text" name="title" placeholder="Todo title" />

					<chips :aItems="aItems">
						<input type="text" name="name" placeholder="Todo name" @keyup.enter="onAddItems" />
					</chips>

					<button type="button" @click="onSubmit">create</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import Chips    from '@/components/Chips.vue';

export default {
	name: 'home',

	components: {
		'todo-list': TodoList,
		'chips': Chips
	},

	data: function ()
	{
		return {
			aItems: [{
				id: Date.now(),
				name: 'test',
				done: false
			}]
		}
	},

	methods: {
		onSubmit: function (e)
		{
			var nTarget = e.target,
				nForm = nTarget.parentNode,
				oElements = nForm.elements,
				sTitle = oElements.title.value,
				sName = oElements.name.value;

			if (!sTitle)
			{
				alert('Укажите заголовок');
				return;
			}

			if (!this.aItems.length)
			{
				this.aItems = [{
					id: Date.now(),
					name: sName,
					done: false
				}];
			}

			var oPayload = {
					id: Date.now(),
					title: sTitle,
					items: this.aItems
				};

			this.$store.dispatch('CREATE_TODO', oPayload);

			this.$router.push({name: 'home'});
		},

		onAddItems: function (e)
		{
			this.aItems.push({
				id: Date.now(),
				name: e.target.value,
				done: false
			});

			e.target.value = null;
		}
	}
}
</script>

<style lang="scss">
form
{
	> input
	{
		display: block;
		width: 100%;
		margin-top: 10px;
		margin-bottom: 10px;

		&:first-child
		{
			margin-top: 0;
		}
	}
}
</style>
