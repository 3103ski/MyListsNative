// *********************************************************
// ***** { updateObject }                  *****************
// *********************************************************

export const updateObject = (oldObject, updatedValues) => {
	return {
		...oldObject,
		...updatedValues,
	};
};

// *********************************************************
// ***** { randomId }                      *****************
// *********************************************************

const date = () => {
	const date = new Date();
	const randomNum = `${date.getSeconds()}${date.getMilliseconds()}${date.getMilliseconds()}${date.getMinutes()}`;

	return randomNum;
};

const ID = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export const randomId = () => {
	const rand1 = date();
	const rand2 = ID();

	const id = `${rand1}${rand2}`;
	return id;
};
