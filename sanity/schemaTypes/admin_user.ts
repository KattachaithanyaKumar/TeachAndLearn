import { defineField, defineType } from "sanity";

export const admin_user = defineType({
  name: "admin_user",
  title: "Admin user",
  type: "document",
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(120),
    }),
    defineField({
      name: "passwordHash",
      title: "Password hash (bcrypt only)",
      type: "string",
      description:
        "Store a bcrypt hash, never plaintext. Generate with: npm run hash-password -- \"YourPassword\" in TeachAndLearnAdmin.",
      validation: (Rule) => Rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "username" },
    prepare({ title }) {
      return { title: title || "Admin user" };
    },
  },
});
