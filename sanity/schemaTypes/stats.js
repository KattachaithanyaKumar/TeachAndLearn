import { defineField, defineType } from "sanity";
export const stats = defineType({
    name: 'stats',
    title: 'Stats',
    type: 'document',
    fields: [
        defineField({
            name: 'label',
            type: 'string',
        }),
        defineField({
            name: 'number',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            type: 'string',
        }),
        defineField({
            name: 'iconColor',
            type: 'string',
        }),
        defineField({
            name: 'bgColor',
            type: 'string',
        }),
    ]
});

