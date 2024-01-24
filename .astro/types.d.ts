declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2021.md": {
	id: "2021.md";
  slug: "2021";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"3-tips-for-being-a-better-web-designer.md": {
	id: "3-tips-for-being-a-better-web-designer.md";
  slug: "3-tips-for-being-a-better-web-designer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"3-tips-from-an-inbound-web-designer.md": {
	id: "3-tips-from-an-inbound-web-designer.md";
  slug: "3-tips-from-an-inbound-web-designer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"behind-the-site-designing-your-ecommerce-website.md": {
	id: "behind-the-site-designing-your-ecommerce-website.md";
  slug: "behind-the-site-designing-your-ecommerce-website";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"codepen-meetup-brooksville-july-25th.md": {
	id: "codepen-meetup-brooksville-july-25th.md";
  slug: "codepen-meetup-brooksville-july-25th";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"custom-grid-gutters-on-hubspot.md": {
	id: "custom-grid-gutters-on-hubspot.md";
  slug: "custom-grid-gutters-on-hubspot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"dreams.md": {
	id: "dreams.md";
  slug: "dreams";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-add-animations-to-your-static-designs-using-adobe-xd-and-codepen.md": {
	id: "how-to-add-animations-to-your-static-designs-using-adobe-xd-and-codepen.md";
  slug: "how-to-add-animations-to-your-static-designs-using-adobe-xd-and-codepen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-make-a-modal-popup-custom-module-in-hubspot.md": {
	id: "how-to-make-a-modal-popup-custom-module-in-hubspot.md";
  slug: "how-to-make-a-modal-popup-custom-module-in-hubspot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-reduce-a-clients-design-revisions.md": {
	id: "how-to-reduce-a-clients-design-revisions.md";
  slug: "how-to-reduce-a-clients-design-revisions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-excels-vlookup-to-quickly-update-product-data.md": {
	id: "how-to-use-excels-vlookup-to-quickly-update-product-data.md";
  slug: "how-to-use-excels-vlookup-to-quickly-update-product-data";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hubspot-blog-search.md": {
	id: "hubspot-blog-search.md";
  slug: "hubspot-blog-search";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hubspot-cos-modal-site-search-plugin.md": {
	id: "hubspot-cos-modal-site-search-plugin.md";
  slug: "hubspot-cos-modal-site-search-plugin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hubspot-to-wordpress-website-migration.md": {
	id: "hubspot-to-wordpress-website-migration.md";
  slug: "hubspot-to-wordpress-website-migration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"keyboard-accessible-dropdown-menu.md": {
	id: "keyboard-accessible-dropdown-menu.md";
  slug: "keyboard-accessible-dropdown-menu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"lazy-loading-images-on-hubspot.md": {
	id: "lazy-loading-images-on-hubspot.md";
  slug: "lazy-loading-images-on-hubspot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"make-awesome-us-page-part-2-code.md": {
	id: "make-awesome-us-page-part-2-code.md";
  slug: "make-awesome-us-page-part-2-code";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"migrate-hubspot-blog-to-wordpress.md": {
	id: "migrate-hubspot-blog-to-wordpress.md";
  slug: "migrate-hubspot-blog-to-wordpress";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"my-mac-setup-for-development.md": {
	id: "my-mac-setup-for-development.md";
  slug: "my-mac-setup-for-development";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"on-page-seo-2016-best-practices-for-an-ecommerce-website.md": {
	id: "on-page-seo-2016-best-practices-for-an-ecommerce-website.md";
  slug: "on-page-seo-2016-best-practices-for-an-ecommerce-website";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"progressive-image-loading-with-hubspot.md": {
	id: "progressive-image-loading-with-hubspot.md";
  slug: "progressive-image-loading-with-hubspot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"pros-cons-using-wordpress-page-builders.md": {
	id: "pros-cons-using-wordpress-page-builders.md";
  slug: "pros-cons-using-wordpress-page-builders";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rebranding-redesigning-naturecoaster-com.md": {
	id: "rebranding-redesigning-naturecoaster-com.md";
  slug: "rebranding-redesigning-naturecoaster-com";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"simple-video-modal-with-no-dependencies.md": {
	id: "simple-video-modal-with-no-dependencies.md";
  slug: "simple-video-modal-with-no-dependencies";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-simple-bible-pwa.md": {
	id: "the-simple-bible-pwa.md";
  slug: "the-simple-bible-pwa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"website-branding-refresh.md": {
	id: "website-branding-refresh.md";
  slug: "website-branding-refresh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"website-structure-best-practices.md": {
	id: "website-structure-best-practices.md";
  slug: "website-structure-best-practices";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-a-launchpad-website.md": {
	id: "what-is-a-launchpad-website.md";
  slug: "what-is-a-launchpad-website";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-seo.md": {
	id: "what-is-seo.md";
  slug: "what-is-seo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"white-hat-black-hat-seo.md": {
	id: "white-hat-black-hat-seo.md";
  slug: "white-hat-black-hat-seo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-you-need-a-website-even-if-youre-not-selling-online.md": {
	id: "why-you-need-a-website-even-if-youre-not-selling-online.md";
  slug: "why-you-need-a-website-even-if-youre-not-selling-online";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"wordpress-much-more-than-just-a-blogging-tool.md": {
	id: "wordpress-much-more-than-just-a-blogging-tool.md";
  slug: "wordpress-much-more-than-just-a-blogging-tool";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
