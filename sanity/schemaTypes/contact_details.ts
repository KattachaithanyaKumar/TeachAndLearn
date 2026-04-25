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
        defineField({
            name: 'mapScreenshot',
            title: 'Map screenshot',
            description: 'Optional image shown on the public Contact page for this branch (e.g. map capture).',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'latitude',
            title: 'Latitude',
            type: 'number',
            description: 'Optional (WGS84). With longitude, improves Google Maps directions links.',
        }),
        defineField({
            name: 'longitude',
            title: 'Longitude',
            type: 'number',
            description: 'Optional (WGS84). With latitude, improves Google Maps directions links.',
        }),
    ]
});

export const contactUs = defineType({
    name: 'contact_us',
    title: 'Contact Us',
    type: 'document',
    fields: [
        defineField({
            name: 'mapLatitude',
            title: 'Map Latitude',
            type: 'number',
        }),
        defineField({
            name: 'mapLongitude',
            title: 'Map Longitude',
            type: 'number',
        }),
        defineField({
            name: 'mapZoom',
            title: 'Map Zoom',
            type: 'number',
            initialValue: 15,
        }),
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