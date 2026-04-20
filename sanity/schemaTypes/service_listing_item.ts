import { defineField, defineType } from "sanity";

export const service_listing_item = defineType({
  name: "service_listing_item",
  title: "Service listing item",
  type: "document",
  fields: [
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Child services", value: "child" },
          { title: "Adult services", value: "adult" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathSegment",
      title: "URL path segment",
      type: "string",
      description:
        "Slug after /child-services/ or /adult-services/ (e.g. speech, psychology, speech-therapy).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "items",
      title: "Bullet points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "iconKey",
      title: "Icon key (adult cards)",
      type: "string",
      description:
        "Optional. Must match a react-icons export name available in the app (e.g. PiTrainSimple).",
    }),
    defineField({
      name: "headerColor",
      title: "Detail page header color",
      type: "string",
      description: "CSS color for hero band (e.g. #E0F2FE child, #EDE9FE adult).",
    }),
    defineField({
      name: "pageTitlePrefix",
      title: "Detail hero — title prefix",
      type: "string",
      description: 'e.g. "Child" or "Adult"',
    }),
    defineField({
      name: "pageTitleAccent",
      title: "Detail hero — accent title",
      type: "string",
      description: 'Gradient part, e.g. "Speech Therapy"',
    }),
    defineField({
      name: "heroTagline",
      title: "Detail hero — tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "showCta",
      title: "Show CTA section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "pageBlocks",
      title: "Detail page content",
      type: "array",
      description: "Ordered blocks rendered on the service detail route.",
      of: [
        { type: "service_page_block_intro_split" },
        { type: "service_page_block_alternating_media" },
        { type: "service_page_block_icon_card_grid" },
        { type: "service_page_block_icon_card_stack" },
        { type: "service_page_block_split_disorders" },
        { type: "service_page_block_media_side_icon_list" },
        { type: "service_page_block_goals_split" },
        { type: "service_page_block_two_column_plain" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      audience: "audience",
      path: "pathSegment",
    },
    prepare({ title, audience, path }) {
      return {
        title: title || "Service",
        subtitle: `${audience || "?"} · /${path || ""}`,
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
