import { defineField, defineType } from "sanity";

const maskStyleOptions = [
  { title: "None", value: "none" },
  { title: "Blob cover", value: "blobCover" },
  { title: "Blob contain", value: "blobContain" },
];

/** Icon + title + description (feature cards, grids) */
export const service_page_icon_item = defineType({
  name: "service_page_icon_item",
  title: "Icon card item",
  type: "object",
  fields: [
    defineField({
      name: "iconKey",
      title: "Icon key",
      type: "string",
      description: "react-icons export name (e.g. FaComments)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

/** Icon + single line (goal rows) */
export const service_page_icon_text_item = defineType({
  name: "service_page_icon_text_item",
  title: "Icon + text line",
  type: "object",
  fields: [
    defineField({
      name: "iconKey",
      title: "Icon key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
  ],
});

export const service_page_block_intro_split = defineType({
  name: "service_page_block_intro_split",
  title: "Intro (image + heading + text)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
    defineField({
      name: "maskStyle",
      title: "Image mask",
      type: "string",
      options: { list: maskStyleOptions },
      initialValue: "blobCover",
    }),
    defineField({
      name: "reverseOrder",
      title: "Image on right (desktop)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const service_page_block_alternating_media = defineType({
  name: "service_page_block_alternating_media",
  title: "Alternating image + heading + body",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 8 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
    defineField({
      name: "reverseLayout",
      title: "Reverse layout (image right first)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sectionBg",
      title: "Section background",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light gray", value: "gray" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "useBlobMask",
      title: "Use blob mask on image",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "headingStyle",
      title: "Heading style",
      type: "string",
      options: {
        list: [
          { title: "Orange (adult)", value: "orange" },
          { title: "Dark default", value: "dark" },
        ],
      },
      initialValue: "orange",
    }),
    defineField({
      name: "blobMask",
      title: "Blob mask graphic",
      type: "string",
      description: "Adult alternating sections used blob2 or blob3 in the original site.",
      options: {
        list: [
          { title: "blob2", value: "blob2" },
          { title: "blob3", value: "blob3" },
        ],
      },
      initialValue: "blob2",
    }),
  ],
});

export const service_page_block_icon_card_grid = defineType({
  name: "service_page_block_icon_card_grid",
  title: "Section + icon card grid",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Section title", type: "string" }),
    defineField({ name: "sectionSubtitle", title: "Section subtitle", type: "text", rows: 3 }),
    defineField({
      name: "sectionBg",
      title: "Section background",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light gray", value: "gray" },
        ],
      },
      initialValue: "gray",
    }),
    defineField({
      name: "gridCols",
      title: "Columns (desktop)",
      type: "number",
      options: {
        list: [
          { title: "1", value: 1 },
          { title: "2", value: 2 },
          { title: "3", value: 3 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: "cardBg",
      title: "Card background",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light gray", value: "gray" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [{ type: "service_page_icon_item" }],
    }),
  ],
});

export const service_page_block_icon_card_stack = defineType({
  name: "service_page_block_icon_card_stack",
  title: "Image + stacked icon cards (e.g. age groups)",
  type: "object",
  fields: [
    defineField({
      name: "sideImage",
      title: "Side image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "sideImageAlt", title: "Side image alt", type: "string" }),
    defineField({
      name: "imageLeft",
      title: "Image on left",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "columnTitle", title: "Column heading", type: "string" }),
    defineField({
      name: "items",
      title: "Stacked cards",
      type: "array",
      of: [{ type: "service_page_icon_item" }],
    }),
  ],
});

export const service_page_block_split_disorders = defineType({
  name: "service_page_block_split_disorders",
  title: "Intro + split lists + center image",
  type: "object",
  fields: [
    defineField({ name: "introTitle", title: "Intro title", type: "string" }),
    defineField({ name: "introBody", title: "Intro body", type: "text", rows: 5 }),
    defineField({
      name: "disorders",
      title: "Disorder names (split left/right at midpoint)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "centerImage",
      title: "Center image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "centerImageAlt", title: "Center image alt", type: "string" }),
  ],
});

export const service_page_block_media_side_icon_list = defineType({
  name: "service_page_block_media_side_icon_list",
  title: "Section + image beside vertical icon list",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Section title", type: "string" }),
    defineField({ name: "sectionSubtitle", title: "Section subtitle", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
    defineField({
      name: "imageLeft",
      title: "Image on left",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "items",
      title: "List items",
      type: "array",
      of: [{ type: "service_page_icon_item" }],
    }),
  ],
});

export const service_page_block_goals_split = defineType({
  name: "service_page_block_goals_split",
  title: "Goals list + image (two columns)",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Section title", type: "string" }),
    defineField({ name: "sectionSubtitle", title: "Section subtitle", type: "text", rows: 3 }),
    defineField({
      name: "sectionBg",
      title: "Section background",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light gray", value: "gray" },
        ],
      },
      initialValue: "gray",
    }),
    defineField({
      name: "goals",
      title: "Goal lines",
      type: "array",
      of: [{ type: "service_page_icon_text_item" }],
    }),
    defineField({
      name: "image",
      title: "Side image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
    defineField({
      name: "reverseLayout",
      title: "Image on left (else right)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const service_page_block_two_column_plain = defineType({
  name: "service_page_block_two_column_plain",
  title: "Two columns: image + heading + text (no mask)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
    defineField({
      name: "reverseOrder",
      title: "Image on right (desktop)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sectionBg",
      title: "Section background",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light gray", value: "gray" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "mobileImageBelow",
      title: "On mobile: image below text (flex-col-reverse)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "leadWithText",
      title: "Text column first in DOM (text left / image right on desktop)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const service_page_blocks = [
  service_page_icon_item,
  service_page_icon_text_item,
  service_page_block_intro_split,
  service_page_block_alternating_media,
  service_page_block_icon_card_grid,
  service_page_block_icon_card_stack,
  service_page_block_split_disorders,
  service_page_block_media_side_icon_list,
  service_page_block_goals_split,
  service_page_block_two_column_plain,
];
