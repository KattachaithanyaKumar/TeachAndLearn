import { defineField, defineType } from "sanity";

export const home = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
        defineField({
            name: 'heroEyebrow',
            title: 'Hero — eyebrow',
            type: 'string',
            description: 'Small line above the headline (e.g. “Welcome to Teach & Learn”).',
        }),
        defineField({
            name: 'heroTitleLine1',
            title: 'Hero — title (first line)',
            type: 'string',
            description: 'Main headline before the gradient accent.',
        }),
        defineField({
            name: 'heroTitleHighlight',
            title: 'Hero — title (accent line)',
            type: 'string',
            description: 'Gradient accent line of the headline.',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero — description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'heroPrimaryCtaLabel',
            title: 'Hero — primary button label',
            type: 'string',
        }),
        defineField({
            name: 'heroSecondaryCtaLabel',
            title: 'Hero — secondary button label',
            type: 'string',
            description: 'Still scrolls to the book section on the home page.',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero — main image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                }),
            ],
        }),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'stats' }] }],
        }),
        defineField({
            name: 'aboutUs',
            title: 'About Us',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'about_us' }] }],
        }),
        defineField({
            name: 'service',
            title: 'Services',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'service' }] }],
        }),
        defineField({
            name: 'whyUs', 
            title: 'Why Us',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'whyUs' }] }],
        }),
        defineField({
            name: 'ourPhilosophy',
            title: 'Our Philosophy',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'our_philosophy' }] }],
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'testimonials' }] }],
        }),
    ]
});