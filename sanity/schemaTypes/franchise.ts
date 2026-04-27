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
            name: 'pageBody',
            title: 'Public page — marketing copy',
            description: 'Shown on /franchises. Edit in the custom admin “Franchises page body” card.',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({ name: 'heroTitle', title: 'Hero title', type: 'string' }),
                defineField({ name: 'heroLead', title: 'Hero lead paragraph', type: 'text', rows: 4 }),
                defineField({
                    name: 'valueChecks',
                    title: 'Value bullets (checkmarks)',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
                defineField({ name: 'phoneDisplay', title: 'Phone — display text', type: 'string' }),
                defineField({
                    name: 'phoneTel',
                    title: 'Phone — tel link',
                    description: 'Example: tel:+919581598942',
                    type: 'string',
                }),
                defineField({ name: 'ctaApplyLabel', title: 'CTA — Apply button label', type: 'string' }),
                defineField({ name: 'ctaTalkLabel', title: 'CTA — Talk button label', type: 'string' }),
                defineField({ name: 'sectionWhyTitle', title: 'Section: Why — title', type: 'string' }),
                defineField({ name: 'sectionWhyBody', title: 'Section: Why — body', type: 'text', rows: 6 }),
                defineField({ name: 'sectionImpactTitle', title: 'Section: Impact — title', type: 'string' }),
                defineField({ name: 'sectionImpactBody', title: 'Section: Impact — body', type: 'text', rows: 6 }),
                defineField({ name: 'sectionTrustTitle', title: 'Section: Trust — title', type: 'string' }),
                defineField({ name: 'sectionTrustBody', title: 'Section: Trust — body', type: 'text', rows: 5 }),
                defineField({ name: 'sectionTrustPartner', title: 'Section: Trust — partner paragraph', type: 'text', rows: 4 }),
                defineField({ name: 'sectionFacilityTitle', title: 'Section: Facility — title', type: 'string' }),
                defineField({
                    name: 'facilityLines',
                    title: 'Section: Facility — bullet lines',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
                defineField({ name: 'sectionJoinTitle', title: 'Section: Join — title', type: 'string' }),
                defineField({ name: 'sectionJoinBody', title: 'Section: Join — body', type: 'text', rows: 5 }),
                defineField({ name: 'sectionPartnersTitle', title: 'Section: Partners — title', type: 'string' }),
                defineField({
                    name: 'partnerCriteria',
                    title: 'Section: Partners — bullet lines',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
            ],
        }),
        defineField({
            name: 'pageBodyBlocks',
            title: 'Public page — blocks (new)',
            description: 'Dynamic blocks for /franchises (preferred).',
            type: 'array',
            of: [
                { type: 'franchise_page_block_hero' },
                { type: 'franchise_page_block_value_checks' },
                { type: 'franchise_page_block_ctas' },
                { type: 'franchise_page_block_phone' },
                { type: 'franchise_page_block_text_section' },
                { type: 'franchise_page_block_bullets_section' },
                { type: 'franchise_page_block_custom_markdown' },
            ],
        }),
        defineField({
            name: 'supportCardImage',
            title: 'Contact card image (legacy)',
            description: 'Legacy field; no longer displayed on the public Franchises page. Safe to clear in Studio.',
            type: 'image',
            options: {
                hotspot: true,
            },
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
        defineField({
            name: 'requirements',
            type: 'reference',
            to: [{ type: 'franchiseReq' }],
        }), 
    ]
});

export const franchiseReq = defineType({
    name: 'franchiseReq',
    title: 'Franchise Requirements',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'requirements',
            type: 'array',
            of: [{ type: 'string' }],
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