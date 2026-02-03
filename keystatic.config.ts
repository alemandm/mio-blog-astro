import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? { kind: 'local' }
        : {
            kind: 'github',
            repo: {
                owner: 'alemandm',
                name: 'mio-blog-astro',
            },
            pathPrefix: 'src/content',
        },
    collections: {
        posts: collection({
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
    },
});
