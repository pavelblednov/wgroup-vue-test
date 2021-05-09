<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-md-5">
				<router-link to="/">Home</router-link>

				<h2>Edit</h2>

				<form novalidate @submit.prevent="onSubmit">
					<input
						type="text"
						name="title"
						v-model="oTodo.title"
						placeholder="Todo title"
					/>

					<table v-if="oTodo.items.length">
						<thead>
							<tr>
								<th>status</th>
								<th>name</th>
								<th>controls</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(oItem, index) in oTodo.items"
								:key="oItem.id"
							>
								<td>
									<input
										type="checkbox"
										v-model="oItem.done"
									/>
								</td>

								<td>
									<input
										type="text"
										v-model="oItem.name"
									/>
								</td>

								<td>
									<button type="button" @click="onRemoveItem(index)">remove</button>
								</td>
							</tr>
						</tbody>
					</table>

					<div class="actions">
						<button class="btn-update" type="submit">update</button>
						<button class="btn-remove" type="button" @click="onRemoveTodo">remove</button>
					</div>
				</form>
			</div>
		</div>

		<confirm v-if="oTodo" :isHidden="isHidden" :sName="oTodo.title" @hidden="onHideConfirm" />
	</div>
</template>

<script>
import Confirm from '@/components/Confirm.vue';

import extend from '@/utils/extend.js';

export default {
	name: 'home',

	components: {
		'confirm': Confirm
	},

	data: function ()
	{
		return {
			isHidden: true,
			oTodo: null
		}
	},

	created: function ()
	{
		var sTodoID = this.$route.params.id,
			oTodo = this.$store.getters.BY_ID(parseInt(sTodoID));

		this.oTodo = extend(true, {}, oTodo);
	},

	methods: {
		onSubmit: function (e)
		{
			var nForm = e.target,
				oElements = nForm.elements,
				sTitle = oElements.title.value;

			if (!sTitle)
			{
				alert('Укажите заголовок');
				return;
			}

			this.$store.dispatch('UPDATE_TODO', this.oTodo);

			this.$router.push({name: 'home'});
		},

		onRemoveItem: function (_index)
		{
			this.oTodo.items.splice(_index, 1);
		},

		onRemoveTodo: function ()
		{
			this.isHidden = !this.isHidden;
		},
		
		onHideConfirm: function (_oData)
		{
			if (_oData.delete)
			{
				this.$store.dispatch('REMOVE_TODO', this.oTodo);

				this.$router.push({name: 'home'});
			}

			this.isHidden = _oData.hidden;
		}
	}
}
</script>

<style lang="scss">
form
{
	
}

table
{
	margin-top: 10px;
	margin-bottom: 10px;

	th
	{
		text-align: left;
	}
}

.actions
{
	margin-top: 10px;
}

.btn-update
{
	margin-right: 10px;
}
</style>
