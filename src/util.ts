import type { MDXInstance, Published, Taggable } from "./types";

export function sortMDByDate<T extends Published>(pages: MDXInstance<T>[] = []) {
	return pages.sort(
		(a, b) =>
			new Date(b.frontmatter.publishDate).valueOf() -
			new Date(a.frontmatter.publishDate).valueOf()
	);
}

// This function expects the @arg posts to be sorted by sortMDByDate()
export function getPreviousAndNextPage<T>(
	currentSlug: string,
	pages: MDXInstance<T>[] = []
) {
	const index = pages.findIndex(({ url }) => url === currentSlug);
	return {
		prev: pages[index + 1] ?? null,
		next: pages[index - 1] ?? null,
	};
}

export function getAllTags<T extends Taggable>(pages: MDXInstance<T>[] = []) {
	const allTags = new Set<string>();
	pages.forEach((page) => {
		page.frontmatter.tags?.map((tag) => allTags.add(tag.toLowerCase()));
	});
	return [...allTags];
}

export function getAllTagsWithCount<T extends Taggable>(pages: MDXInstance<T>[] = []): {
	[key: string]: number;
} {
	return pages.reduce((prev, page) => {
		const currTags = { ...prev };
		page.frontmatter.tags?.forEach(function (tag) {
			currTags[tag] = (currTags[tag] || 0) + 1;
		});
		return currTags;
	}, {});
}

export function toggleClass(element: HTMLElement, className: string) {
	element.classList.toggle(className);
}

export function elementHasClass(element: HTMLElement, className: string) {
	return element.classList.contains(className);
}

export function getLocaleTime(
	date: number | Date,
	options: Intl.DateTimeFormatOptions = {},
	locale: string | string[] = "en-GB"
) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options,
	};
	return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}
