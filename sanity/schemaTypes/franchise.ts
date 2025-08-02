import { defineField, defineType } from "sanity";

export const franchise = defineType({
    name: 'franchise',
    title: 'Franchise',
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
            name: 'steps',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'franchiseSteps' }] }],
        }),
        defineField({
            name: 'contact',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'franchiseContact' }] }],
        }),
    ]
});

export const franchiseContact = defineType({
    name: 'franchiseContact',   
    title: 'Franchise Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'content',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            type: 'string',
        }),
    ]
});


export const franchiseSteps = defineType({
    name: 'franchiseSteps',
    title: 'Franchise Steps',
    type: 'document',
    fields: [
        defineField({
            name: 'index',
            type: 'number',
        }),
        defineField({
            name: 'title',
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