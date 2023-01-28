interface ClassNameReturn {
	className: string;
}

export function asmClassName<TYPE>(...args: TYPE[]): ClassNameReturn {
	const classesArray = args.filter((element) => element);
	return { className: classesArray.join(' ').trim() };
}
