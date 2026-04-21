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
            name: 'linkedListingItem',
            title: 'Full service page',
            type: 'reference',
            to: [{ type: 'service_listing_item' }],
            description:
                'Pick the existing child or adult service listing this card should open for “Read More” on the home page.',
        }),
    ]
});