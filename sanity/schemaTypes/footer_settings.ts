import { defineArrayMember, defineField, defineType } from "sanity";

const SOCIAL_PLATFORM_LIST = [
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "YouTube", value: "youtube" },
  { title: "X (Twitter)", value: "x" },
  { title: "WhatsApp", value: "whatsapp" },
  { title: "Other", value: "other" },
] as const;

export const footer_settings = defineType({
  name: "footer_settings",
  title: "Footer settings",
  type: "document",
  fields: [
    defineField({
      name: "brandTitle",
      title: "Brand title",
      type: "string",
    }),
    defineField({
      name: "brandSubtitle",
      title: "Brand subtitle",
      type: "string",
    }),
    defineField({
      name: "brandDescription",
      title: "Brand description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "locationLabel",
      title: "Location label",
      type: "string",
    }),
    defineField({
      name: "locationLink",
      title: "Location link",
      description: "Path (e.g. /contact-us) or full https URL",
      type: "string",
    }),
    defineField({
      name: "hoursText",
      title: "Hours",
      description: "One line per row (e.g. Mon–Fri: …)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "socialLinks",
      title: "Social media links",
      description: "Shown as icon-only links in the site footer.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [...SOCIAL_PLATFORM_LIST],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              description: "https link, tel:, or other valid href",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare({ platform, url }) {
              const p =
                SOCIAL_PLATFORM_LIST.find((x) => x.value === platform)?.title ??
                platform ??
                "Link";
              return { title: p, subtitle: url };
            },
          },
        }),
      ],
    }),
  ],
});
