import * as a from '../actionTypes';
import { updateObject, randomId } from '../../util/utility';

const list = (
	state = {
		lists: [],
		listItems: [],
		isLoadingLists: true,
		isLoadingListItems: true,
		isAdding: false,
		errorMsg: null,
		refresh: false,
	},

	action
) => {
	switch (action.type) {
		// ____________
		// LISTS
		// ------------
		case a.FETCH_LISTS_START:
			return updateObject(state, {
				isLoadingLists: true,
			});
		case a.FETCH_LISTS_ERROR:
			return updateObject(state, {
				isLoadingLists: false,
				errorMsg: action.errorMsg,
			});
		case a.FETCH_LISTS_SUCCESS:
			return updateObject(state, {
				isLoadingLists: false,
				lists: [...action.lists],
			});
		case a.ADD_LIST_START:
			return updateObject(state, {
				isAdding: true,
			});
		case a.ADD_LIST_SUCCESS:
			const newList = {
				id: randomId(),
				...action.list,
			};
			const updatedLists = [...state.lists, newList];
			return updateObject(state, {
				isAdding: false,
				lists: updatedLists,
			});
		case a.ADD_LIST_ERROR:
			return updateObject(state, {
				isAdding: false,
				errorMsg: action.errorMsg,
			});
		// ____________
		// LIST ITEMS
		// ------------
		// FETCHING
		case a.FETCH_LIST_ITEMS_START:
			return updateObject(state, {
				isLoadingListItems: true,
			});
		case a.FETCH_LIST_ITEMS_SUCCESS:
			return updateObject(state, {
				isLoadingListItems: false,
				listItems: [...action.listItems],
			});
		case a.FETCH_LIST_ITEMS_ERROR:
			return updateObject(state, {
				isLoadingListItems: false,
				errorMsg: action.errorMsg,
			});
		// ADDING
		case a.ADD_LIST_ITEM_START:
			return updateObject(state, {
				isAdding: true,
			});
		case a.ADD_LIST_ITEM_ERROR:
			return updateObject(state, {
				isAdding: false,
				errorMsg: action.errorMsg,
			});
		case a.ADD_LIST_ITEM_SUCCESS:
			const newListItem = {
				id: randomId(),
				...action.listItem,
			};
			const updatedListItems = [...state.listItems, newListItem];

			return updateObject(state, {
				isAdding: false,
				listItems: updatedListItems,
			});
		// UPDATING
		case a.TOGGLE_COMPLETE:
			const currItems = state.listItems;
			for (let i in currItems) {
				if (currItems[i].id == action.itemId) {
					console.log('toggle complete: ', currItems[i]);
					currItems[i].isComplete = !currItems[i].isComplete;
					console.log('toggle complete 222: ', currItems[i]);
				}
			}
			return updateObject(state, {
				listItems: currItems,
				refresh: !state.refresh,
			});
		case a.UPDATE_ITEM_DETAILS:
			const newItems = state.listItems;
			console.log('update reducer:', action.updatedItem);
			for (let i in newItems) {
				if (newItems[i].id == action.updatedItem.id) {
					newItems[i] = {
						...newItems[i],
						...action.updatedItem,
					};
				}
			}
			return updateObject(state, {
				listItems: newItems,
				refresh: !state.refresh,
			});
		case a.REFRESH_LIST:
			console.log('refresh reducer');
			return updateObject(state, {
				refresh: !state.refresh,
			});
		default:
			return state;
	}
};
export default list;
