import { defineField, defineType } from "sanity";

export const contact_submission = defineType({
  name: "contact_submission",
  title: "Contact form submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "contact",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "message",
      type: "text",
      validation: (Rule) => Rule.required().max(10000),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where this inquiry was submitted.",
      options: {
        list: [
          { title: "Contact page", value: "contact_page" },
          { title: "Home quick appointment", value: "home_book" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "service",
      title: "Service requested",
      type: "string",
      description: "Filled for Quick Appointment on the home page.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "responded",
      type: "boolean",
      initialValue: false,
      description: "Enable after your team has replied to this inquiry.",
    }),
    defineField({
      name: "respondedAt",
      title: "Responded at",
      type: "datetime",
      description: "Optional timestamp when marked as responded.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      responded: "responded",
      submittedAt: "submittedAt",
      source: "source",
      service: "service",
    },
    prepare({ title, responded, submittedAt, source, service }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString()
        : "";
      const src =
        source === "home_book"
          ? "Home · Quick appointment"
          : source === "contact_page"
            ? "Contact page"
            : "";
      const svc = service ? ` · ${service}` : "";
      return {
        title: title || "Submission",
        subtitle: `${responded ? "Responded" : "Open"}${date ? ` · ${date}` : ""}${src ? ` · ${src}` : ""}${svc}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
