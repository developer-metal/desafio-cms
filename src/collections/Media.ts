import { CollectionConfig } from 'payload/types';

const myBucketUrl = 'https://tbk-cms-test.s3.amazonaws.com/images';
const Media: CollectionConfig = {
  slug: 'Media',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    admin: () => true,
    delete: () => true,
  },
  fields: [
      {
        name: 'title',
        type: 'text',
        required: true
      },
      {
        name: 'description',
        type: 'text',
        required: true
      },
      {
        name: 'date',
        type: 'date',
        required: true,
        admin: {
          date: {
            // All config options above should be placed here
            pickerAppearance: 'dayOnly'
          }
        },
      },
  ],
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
   // disableLocalStorage: true,
    s3: {
      bucket: 'tbk-cms-test',
      prefix: 'images/',
      s3Url: ({ doc }) => `https://tbk-cms-test.s3.amazonaws.com/images/${doc.type}/${doc.filename}`
    },
    mimeTypes: ['image/*','video/*'],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        doc.url = `${myBucketUrl}/${doc.filename}`;
        const urlEach: any = Object.keys(doc?.sizes || {});
        urlEach.forEach((k): any => {
          doc.sizes[k].url = `${myBucketUrl}/${doc.sizes[k].filename}`
        });
      }
    ]
  },
}

export default Media;