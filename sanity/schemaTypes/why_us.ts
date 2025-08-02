import { defineField, defineType } from "sanity";
export const whyUs = defineType({
    name: 'whyUs',
    title: 'Why Us',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'approaches',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'approach' } }],
        }),

    ]
});

export const approach = defineType({
    name: 'approach',
    title: 'Approach',
    type: 'document',
    fields: [
        defineField({
            name: 'label',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            type: 'string',
        }),
    ]
});