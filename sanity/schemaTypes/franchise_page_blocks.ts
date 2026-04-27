import { defineField, defineType } from "sanity";

export const franchise_page_block_hero = defineType({
  name: "franchise_page_block_hero",
  title: "Franchise: Hero",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 4 }),
  ],
});

export const franchise_page_block_value_checks = defineType({
  name: "franchise_page_block_value_checks",
  title: "Franchise: Value checks",
  type: "object",
  fields: [
    defineField({
      name: "lines",
      title: "Lines",
      description: "Shown as checkmark bullets.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const franchise_page_block_ctas = defineType({
  name: "franchise_page_block_ctas",
  title: "Franchise: CTAs",
  type: "object",
  fields: [
    defineField({ name: "applyLabel", title: "Apply label", type: "string" }),
    defineField({
      name: "applyHref",
      title: "Apply link",
      description: "Example: #franchise-inquiry",
      type: "string",
      initialValue: "#franchise-inquiry",
    }),
    defineField({ name: "talkLabel", title: "Talk label", type: "string" }),
    defineField({
      name: "talkHref",
      title: "Talk link",
      description: "Example: /contact-us#contact-form",
      type: "string",
      initialValue: "/contact-us#contact-form",
    }),
  ],
});

export const franchise_page_block_phone = defineType({
  name: "franchise_page_block_phone",
  title: "Franchise: Phone line",
  type: "object",
  fields: [
    defineField({ name: "display", title: "Display", type: "string" }),
    defineField({
      name: "telHref",
      title: "tel: link",
      description: "Example: tel:+919581598942",
      type: "string",
    }),
  ],
});

export const franchise_page_block_text_section = defineType({
  name: "franchise_page_block_text_section",
  title: "Franchise: Text section (Markdown)",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "bodyMarkdown",
      title: "Body (Markdown)",
      type: "text",
      rows: 8,
    }),
  ],
});

export const franchise_page_block_bullets_section = defineType({
  name: "franchise_page_block_bullets_section",
  title: "Franchise: Bullets section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const franchise_page_block_custom_markdown = defineType({
  name: "franchise_page_block_custom_markdown",
  title: "Franchise: Custom Markdown",
  type: "object",
  fields: [
    defineField({
      name: "markdown",
      title: "Markdown",
      description: "Advanced: Markdown content rendered on the page.",
      type: "text",
      rows: 10,
    }),
  ],
});

export const franchise_page_blocks = [
  franchise_page_block_hero,
  franchise_page_block_value_checks,
  franchise_page_block_ctas,
  franchise_page_block_phone,
  franchise_page_block_text_section,
  franchise_page_block_bullets_section,
  franchise_page_block_custom_markdown,
];

