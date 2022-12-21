import { CollectionConfig } from 'payload/types';

const myBucketUrl = '/images';
const Media: CollectionConfig = {
  slug: 'Media',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    admin: () => true,
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
        required: true
      },
  ],
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
   // disableLocalStorage: true,
    s3: {
      bucket: '',
      prefix: 'images/',
      s3Url: ({ doc }) => `/images/${doc.type}/${doc.filename}`
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