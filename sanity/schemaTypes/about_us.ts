import { defineField, defineType } from "sanity";

export const aboutUs = defineType({
    name: "aboutUs",
    title: "About Us",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'items',
            type: 'array',
            of: [
                { type: 'string' }
            ],
        }),
    ],
});