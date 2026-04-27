import { defineField, defineType } from "sanity";

export const franchise_inquiry = defineType({
  name: "franchise_inquiry",
  title: "Franchise inquiry",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "mobile",
      title: "Mobile",
      type: "string",
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: "dob",
      title: "Date of birth",
      type: "date",
    }),
    defineField({
      name: "education",
      title: "Highest level of education",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "currentState",
      title: "Current state",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "currentDistrict",
      title: "Current district",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "location",
      title: "Preferred location",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "comments",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required().max(10000),
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
      location: "location",
    },
    prepare({ title, responded, submittedAt, location }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString()
        : "";
      const loc = location ? ` · ${location}` : "";
      return {
        title: title || "Franchise inquiry",
        subtitle: `${responded ? "Responded" : "Open"}${date ? ` · ${date}` : ""}${loc}`,
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
