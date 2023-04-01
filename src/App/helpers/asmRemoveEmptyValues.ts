// TODO: replace to library
import asm from 'asm-ts-scripts'; // TODO: remove

export function asmRemoveEmptyValues<T, K extends string | number>(
	array: T[],
	key?: K,
): T[] {
	const arrayCopy = array.slice();
	const arrayFirstItem = arrayCopy[0];

	if (typeof arrayFirstItem !== 'string' && !asm.isObject(arrayFirstItem) && !Array.isArray(arrayFirstItem)) {
		throw new Error('Invalid value');
	}

	if ((asm.isObject(arrayFirstItem) || Array.isArray(arrayFirstItem)) && !key) {
		throw new Error('No key provided');
	}

	if (Array.isArray(arrayFirstItem) && typeof key === 'string') {
		throw new Error('Key should be array index number');
	}

	let result: T[] = [];

	if (typeof arrayFirstItem === 'string' || typeof arrayFirstItem === 'number') {
		result = arrayCopy.filter((value) => String(value).trim() !== '');
	}

	if (asm.isObject(arrayFirstItem) && key) {
		result = arrayCopy.filter((value) => {
			const typedValue = String((value as Record<K, unknown>)[key]);
			return typedValue.trim() !== '';
		});
	}

	if (Array.isArray(arrayFirstItem) && key && typeof key === 'number') {
		result = arrayCopy.filter((value) => {
			const typedValue = String((value as unknown[])[key]);
			return typedValue.trim() !== '';
		});
	}

	return result;
}
