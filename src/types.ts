import type { MDXInstance, Page } from "astro";

type Theme = "light" | "dark";

interface IElement {
	readonly as?: keyof HTMLElementTagNameMap;
}

type SiteMeta = {
	title: string;
	description?: string;
	image?: string;
};

type PaginationLink = {
	url: string;
	text?: string;
	srLabel?: string;
};

interface Taggable {
	tags?: string[];
}

interface Published {
	publishDate?: string;
}


interface PageSubtype extends Taggable, Published {
	type: string;
}

interface Post extends PageSubtype {
	title: string;
	description: string;
}

interface Project extends PageSubtype {
	title: string;
	description: string;
	status: "development" | "completed" | "archived";
}

export type {
	MDXInstance,
	Page,
	Theme,
	IElement,
	SiteMeta,
	PaginationLink,
	Post,
	Project,
	Taggable,
	Published,
	PageSubtype,
};
