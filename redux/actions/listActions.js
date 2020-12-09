import * as a from '../actionTypes';
import { baseUrl } from '../../shared/baseURL';

// lists

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

// list items

export const fetchListItems = (listId) => (dispatch) => {
	dispatch(fetchListItemsStart);

	return fetch(baseUrl + `listItems?listId=${listId}`)
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
		.then((listItems) => dispatch(fetchListItemsSuccess(listItems)))
		.catch((error) => dispatch(fetchListItemsError(error.message)));
};

export const fetchListItemsStart = () => {
	return {
		type: a.FETCH_LIST_ITEMS_START,
	};
};

export const fetchListItemsSuccess = (listItems) => ({
	type: a.FETCH_LIST_ITEMS_SUCCESS,
	listItems: listItems,
});

export const fetchListItemsError = (errorMsg) => ({
	type: a.FETCH_LIST_ITEMS_ERROR,
	errorMsg: errorMsg,
});
