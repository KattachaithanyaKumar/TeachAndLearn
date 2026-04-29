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
        defineField({
            name: 'linkedServicePage',
            title: 'Full service page',
            type: 'reference',
            to: [{ type: 'service_page' }],
            description:
                'Service page opened by “Read More” on the home page (/service/your-slug).',
        }),
    ]
});