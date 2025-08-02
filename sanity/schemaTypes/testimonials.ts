import { defineField, defineType } from "sanity";
export const testimonials = defineType({
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    fields: [
        defineField({
            name: 'review',
            type: 'string',
        }),
        defineField({
            name: 'author',
            type: 'string',
        }),
        defineField({
            name: 'rating',
            type: 'number',
            validation: Rule => Rule.min(1).max(5).error('Rating must be between 1 and 5')
        }),
    ]
});

