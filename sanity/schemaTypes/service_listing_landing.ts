import { defineField, defineType } from "sanity";

/** One document per audience (child / adult) for hero + section intros on listing pages. */
export const service_listing_landing = defineType({
  name: "service_listing_landing",
  title: "Service listing page (Child / Adult)",
  type: "document",
  fields: [
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Child services page", value: "child" },
          { title: "Adult services page", value: "adult" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroIntro",
      title: "Hero intro paragraph",
      type: "text",
      rows: 3,
      description: "Text under the main Child/Adult Services heading in the colored header.",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section title",
      type: "string",
      description: 'e.g. "Our Child Services"',
    }),
    defineField({
      name: "sectionSubtitle",
      title: "Section subtitle",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { audience: "audience", sectionTitle: "sectionTitle" },
    prepare({ audience, sectionTitle }) {
      return {
        title:
          audience === "child"
            ? "Child services landing"
            : audience === "adult"
              ? "Adult services landing"
              : "Landing",
        subtitle: sectionTitle,
      };
    },
  },
});
