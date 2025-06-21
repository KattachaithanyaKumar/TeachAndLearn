import { defineField, defineType } from "sanity";

export const service = defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'icon',
            type: 'string',
        }),
    ]
});