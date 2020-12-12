import * as a from '../actionTypes';
import { baseUrl } from '../../shared/baseURL';

//****************************************** */
// 			FETCHING LISTS
//****************************************** */
export const fetchLists = () => (dispatch) => {
	dispatch(fetchListsStart());
	return fetch(baseUrl + 'lists')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((lists) => dispatch(fetchListsSuccess(lists)))
		.catch((error) => dispatch(fetchListsError(error.message)));
};

export const fetchListsStart = () => {
	return {
		type: a.FETCH_LISTS_START,
	};
};

export const fetchListsSuccess = (lists) => ({
	type: a.FETCH_LISTS_SUCCESS,
	lists: lists,
});

export const fetchListsError = (errorMsg) => ({
	type: a.FETCH_LISTS_ERROR,
	errorMsg: errorMsg,
});

//****************************************** */
// 			ADDING / REMOVING LIST
//****************************************** */
export const addList = (list) => (dispatch) => {
	// dispatch(addListStart());
	dispatch(addListSuccess(list));
};

export const addListStart = () => ({
	type: a.ADD_LIST_START,
});

export const addListSuccess = (list) => ({
	type: a.ADD_LIST_SUCCESS,
	list: list,
});

export const addListError = (errorMsg) => ({
	type: a.ADD_LIST_ERROR,
	errorMsg: errorMsg,
});

//****************************************** */
// 			FETCHING LIST ITEMS
//****************************************** */
export const fetchListItems = () => (dispatch) => {
	dispatch(fetchListItemsStart);
	return fetch(baseUrl + `listItems`)
		.then((response) => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		})
		.then((response) => response.json())
		.then((listItems) => {
			return dispatch(fetchListItemsSuccess(listItems));
		})
		.catch((error) => dispatch(fetchListItemsError(error.message)));
};
export const fetchListItemsStart = () => {
	return {
		type: a.FETCH_LIST_ITEMS_START,
	};
};

export const fetchListItemsSuccess = (listItems) => {
	// console.log(listItems);
	return {
		type: a.FETCH_LIST_ITEMS_SUCCESS,
		listItems: listItems,
	};
};

export const fetchListItemsError = (errorMsg) => ({
	type: a.FETCH_LIST_ITEMS_ERROR,
	errorMsg: errorMsg,
});

//****************************************** */
// 			ADD LIST ITEM
//****************************************** */

export const addListItem = (listItem) => (dispatch) => {
	// dispatch(addListItemStart());
	dispatch(addListItemSuccess(listItem));
};

export const addListItemStart = () => ({
	type: a.ADD_LIST_ITEM_START,
});

export const addListItemSuccess = (listItem) => ({
	type: a.ADD_LIST_ITEM_SUCCESS,
	listItem: listItem,
});

export const addListItemError = (errorMsg) => ({
	type: a.ADD_LIST_ITEM_ERROR,
	errorMsg: errorMsg,
});

//****************************************** */
// 			ITEM DETAILS
//****************************************** */
export const toggleCompletion = (itemId) => ({
	type: a.TOGGLE_COMPLETE,
	itemId: itemId,
});

export const updateItemDetails = (updatedItem) => {
	console.log('update action');
	return {
		type: a.UPDATE_ITEM_DETAILS,
		updatedItem: updatedItem,
	};
};

export const refreshList = () => {
	console.log('in actions refresh');
	return {
		type: a.REFRESH_LIST,
	};
};

export const completed = (id) => (dispatch) => {
	dispatch(toggleCompletion(id));
	dispatch(refreshList());
};
