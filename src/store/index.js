import Vue from 'vue';
import Vuex from 'vuex';

import extend from '@/utils/extend.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [
			{
				id: 1,
				title: 'todo 1',
				items: [
					{
						id: 11,
						name: 'todo name 1-1',
						done: false
					},
					{
						id: 12,
						name: 'todo name 1-2',
						done: true
					},
					{
						id: 13,
						name: 'todo name 1-3',
						done: false
					}
				]
			},
			{
				id: 2,
				title: 'todo 2',
				items: [
					{
						id: 21,
						name: 'todo name 2-1',
						done: true
					},
					{
						id: 22,
						name: 'todo name 2-2',
						done: false
					},
					{
						id: 23,
						name: 'todo name 2-3',
						done: false
					}
				]
			}
		]
	},

	mutations: {
		CREATE_TODO: function (_state, _oPayload)
		{
			_state.todos.unshift(_oPayload);
		},
		UPDATE_TODO: function (_state, _oPayload)
		{
			var aTodos = _state.todos,
				oFound = null,
				i, L;

			for (i = 0, L = aTodos.length; i < L; i++)
			{
				if (aTodos[i].id === _oPayload.id)
				{
					oFound = aTodos[i];
					break;
				}
			}

			if (oFound)
			{
				extend(oFound, _oPayload);

				oFound = null;
			}
		},
		REMOVE_TODO: function (_state, _oPayload)
		{
			var aTodos = _state.todos,
				i, L;

			for (i = 0, L = aTodos.length; i < L; i++)
			{
				if (aTodos[i].id === _oPayload.id)
				{
					aTodos.splice(i, 1);
					break;
				}
			}
		}
	},

	actions: {
		CREATE_TODO: function ({commit}, _oPayload)
		{
			commit('CREATE_TODO', _oPayload);
		},
		UPDATE_TODO: function ({commit}, _oPayload)
		{
			commit('UPDATE_TODO', _oPayload);
		},
		REMOVE_TODO: function ({commit}, _oPayload)
		{
			commit('REMOVE_TODO', _oPayload);
		}
	},

	modules: {

	},

	getters: {
		GET_TODO: function (_state)
		{
			return _state.todos;
		},
		BY_ID: function (_state)
		{
			return function (_ID)
			{
				var aTodos = _state.todos,
					i, L;

				for (i = 0, L = aTodos.length; i < L; i++)
				{
					if (aTodos[i].id === _ID)
					{
						return aTodos[i];
					}
				}

				return null;
			};
		}
	}
});
