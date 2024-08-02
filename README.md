## Selected-Work

This is a prototype for a dashboard for artists to upload their work and personal information. It will then generate a custom looking static website with their work.

I am making this because major website creation platforms do not cater to artists' specific needs, especially in displaying images which are of physical artwork, which often wildly differ in scale and dimension.

Additionally, major website creation platforms are too difficult to use and often require hiring a web designer. I am making an app for non technical people to quickly generate a website with artist specific features and have it be as easy to maintain as a social media page.

Art is often sold at a very high price point and is displayed in galleries with the utmost attention to detail out of respect for the work and the audience. In contrast, artist websites are often ineffective, poorly designed, and outdated, reflecting poorly on work. This is through no fault of the artist, but a failing on current website creation platforms.

Planned features are:

- Easy onboarding experience featuring drag and drop to upload, instant site generation
- Template selection
x Content organization tailored specifically for artwork: Collections which contain pieces, each piece containing set of metadata and additional thumbnails/media
x Standard fields for artwork metadata, title, medium, dimensions, price, etc
- Customization of sizing/spacing for odd sized works so that pieces are displayed with a sense of scale to the actual physical work
x Hidden collections for private links
- Custom domains
- Billing portal

It uses 
- Clerk for authentication
- Next.js
- Vercel
- UploadThing for file uploads
- React DND Kit for drag and drop functionality
- Drizzle ORM

It is in a state of rapid development.

An example site generated using Selected Work is found [here](https://dash-xi-seven.vercel.app/camdenross)

![ScreenRecording2024-08-02at9 39 39AM-ezgif com-optimize](https://github.com/user-attachments/assets/74a6a37c-0968-4311-929f-358fd5ecb7c1)
