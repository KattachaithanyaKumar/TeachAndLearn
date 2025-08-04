import { defineField, defineType } from "sanity";

export const contactDetails = defineType({
    name: 'contact_details',
    title: 'Contact Details',
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
        // value
        defineField({
            name: 'value',
            type: 'string',
        }),
        // bool
        defineField({
            name: 'isAction',
            type: 'boolean',
            initialValue: false,
        }),
        // action type
        defineField({
            name: 'actionType',
            type: 'string',
        }),
    ]
});

export const contactAddress = defineType({
    name: 'contact_address',
    title: 'Contact Address',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'address',
            type: 'text',
        }),
    ]
});

export const contactUs = defineType({
    name: 'contact_us',
    title: 'Contact Us',
    type: 'document',
    fields: [
        // list of contact details
        defineField({
            name: 'contactDetails',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'contact_details' }] }],
            title: 'Contact Details',
        }),
        // list of contact address
        defineField({
            name: 'contactAddress',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'contact_address' }] }],
            title: 'Contact Address',
        }),
    ],
});