import { defineField, defineType } from "sanity";

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
  ],
});
