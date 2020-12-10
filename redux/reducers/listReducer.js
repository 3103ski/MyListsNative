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
			console.log('adding item: ', newListItem);
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
					currItems[i].isComplete = !currItems[i].isComplete;
				}
			}
			return updateObject(state, {
				listItems: currItems,
			});
		default:
			return state;
	}
};
export default list;
