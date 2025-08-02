import { defineField, defineType } from "sanity";
export const about_us = defineType({
    name: 'about_us',
    title: 'About Us',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'items',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'about_us_items' }] }],
        }),
    ]
});

export const about_us_items = {
    name: 'about_us_items',
    title: 'About Us Items',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
    ],
}

