import { defineField, defineType } from "sanity";

/** Image row inside a content block (gallery below markdown). */
export const service_page_block_image = defineType({
  name: "service_page_block_image",
  title: "Block image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const service_page_content_block = defineType({
  name: "service_page_content_block",
  title: "Content block",
  type: "object",
  fields: [
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Short labels shown as chips above the block.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body (markdown)",
      type: "text",
      rows: 12,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "service_page_block_image" }],
    }),
  ],
});

export const service_page = defineType({
  name: "service_page",
  title: "Service page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in lists.",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body (markdown)",
      type: "text",
      rows: 8,
      description: "Intro text below the hero.",
    }),
    defineField({
      name: "headerColor",
      title: "Hero band color",
      type: "string",
      description: "CSS color (e.g. #E0F2FE).",
    }),
    defineField({
      name: "showCta",
      title: "Show CTA section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeaturedInNav",
      title: "Featured in services nav strip",
      type: "boolean",
      description: "Show this service in the top featured-services strip.",
      initialValue: false,
    }),
    defineField({
      name: "contentHtml",
      title: "Main content (HTML)",
      type: "text",
      rows: 16,
      description: "Rich HTML content rendered below intro body.",
    }),
    defineField({
      name: "cardHighlights",
      title: "Services card highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Short bullet points shown on the /services listing card.",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content blocks",
      type: "array",
      of: [{ type: "service_page_content_block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title || "Service page",
        subtitle: slug ? `/service/${slug}` : "",
      };
    },
  },
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});

export const service_page_schema_types = [
  service_page_block_image,
  service_page_content_block,
  service_page,
];
