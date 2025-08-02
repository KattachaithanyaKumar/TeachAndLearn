import { defineField, defineType } from "sanity";

export const facility = defineType({
    name: 'facility',
    title: 'Facilities',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'bg',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ]
});