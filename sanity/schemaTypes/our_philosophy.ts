import { defineField, defineType } from "sanity";
export const our_philosophy = defineType({
    name: 'our_philosophy',
    title: 'Our Philosophy',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
        })
    ]
});

