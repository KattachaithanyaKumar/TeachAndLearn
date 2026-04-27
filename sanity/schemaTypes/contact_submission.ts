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
      name: "requestType",
      title: "Request type",
      type: "string",
      description: "Required for Quick Appointment submissions from the home page.",
      options: {
        list: [
          { title: "Assessment", value: "assessment" },
          { title: "Service", value: "service" },
        ],
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const source = ctx?.document?.source;
          if (source === "home_book" && !value) return "Please select Assessment or Service.";
          return true;
        }),
    }),
    defineField({
      name: "requestedServices",
      title: "Requested services",
      type: "array",
      description: "Selected services for Quick Appointment submissions.",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const source = ctx?.document?.source;
          if (source !== "home_book") return true;
          const list = Array.isArray(value) ? value.filter(Boolean) : [];
          if (list.length < 1) return "Please pick at least one service.";
          return true;
        }),
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
      requestType: "requestType",
      requestedServices: "requestedServices",
    },
    prepare({ title, responded, submittedAt, source, service, requestType, requestedServices }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString()
        : "";
      const src =
        source === "home_book"
          ? "Home · Quick appointment"
          : source === "contact_page"
            ? "Contact page"
            : "";
      const rt =
        requestType === "assessment"
          ? "Assessment"
          : requestType === "service"
            ? "Service"
            : "";
      const svcList =
        Array.isArray(requestedServices) && requestedServices.length > 0
          ? requestedServices.filter(Boolean).join(", ")
          : "";
      const svc = svcList ? ` · ${svcList}` : service ? ` · ${service}` : "";
      return {
        title: title || "Submission",
        subtitle: `${responded ? "Responded" : "Open"}${date ? ` · ${date}` : ""}${src ? ` · ${src}` : ""}${
          rt ? ` · ${rt}` : ""
        }${svc}`,
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
