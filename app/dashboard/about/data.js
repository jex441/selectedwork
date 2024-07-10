const obj = {
    id: 1,
    template: 'a1',
    title: "About",
    slug: "about",
    userId: 33,
    sections:[
        {
            id: 12,
            type: 'text',
            tag: 'about-tex',
            sectionAttributes: [
                {id: 333, tag: 'text-body', value: 'This is the about page.'},
                {id: 334, tag: 'about-heading', value: 'This is the about page.'}
            ]
        },
    {
        id: 13,
        type: 'image',
        tag: 'about-image',
        sectionAttributes: [
            {id: 335, tag: 'about-image', value: 'https://via.placeholder.com/150'}
        ]
    }]
}