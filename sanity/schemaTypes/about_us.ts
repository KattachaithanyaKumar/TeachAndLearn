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
        defineField({
            name: 'aboutPageHeaderPrefix',
            title: 'About page — header (first part)',
            type: 'string',
            description: 'Shown before the gradient accent (e.g. “About”). Public /about-us only.',
        }),
        defineField({
            name: 'aboutPageHeaderHighlight',
            title: 'About page — header (accent)',
            type: 'string',
            description: 'Gradient line in the page header (e.g. “Teach & Learn”).',
        }),
        defineField({
            name: 'aboutPageEyebrow',
            title: 'About page — eyebrow',
            type: 'string',
            description: 'Small label above the main title in the first section (e.g. “About us”).',
        }),
        defineField({
            name: 'aboutPageHeroImage',
            title: 'About page — hero image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                }),
            ],
            description: 'Replaces the default photo beside the intro on /about-us.',
        }),
        defineField({
            name: 'promiseEyebrow',
            title: 'Our Promise — eyebrow',
            type: 'string',
        }),
        defineField({
            name: 'promiseHeading',
            title: 'Our Promise — heading',
            type: 'string',
        }),
        defineField({
            name: 'promiseBody',
            title: 'Our Promise — body',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'visionTitle',
            title: 'Vision — title',
            type: 'string',
        }),
        defineField({
            name: 'visionBody',
            title: 'Vision — body',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'missionTitle',
            title: 'Mission — title',
            type: 'string',
        }),
        defineField({
            name: 'missionBody',
            title: 'Mission — body',
            type: 'text',
            rows: 3,
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

