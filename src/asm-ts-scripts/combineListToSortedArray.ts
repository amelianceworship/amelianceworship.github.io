function combineListToSortedArray(listOfString: string[]): [string, string[]][] {
	const groupedListOfGeneral: [string, string[]][] = [];
	let prevFirstSymbol = '';
	let currentArrayPosition = -1;
	listOfString.forEach((item: string) => {
		if (item && item?.length > 0 && prevFirstSymbol !== item[0]) {
			[prevFirstSymbol] = item;
			currentArrayPosition += 1;
			groupedListOfGeneral.push([prevFirstSymbol, []]);
		}
		groupedListOfGeneral[currentArrayPosition][1].push(item);
	});
	return groupedListOfGeneral;
}

export const asm = {
	combineListToSortedArray,
};
