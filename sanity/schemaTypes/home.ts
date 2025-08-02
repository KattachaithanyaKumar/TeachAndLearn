import { defineField, defineType } from "sanity";

export const home = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
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