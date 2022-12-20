import { CollectionConfig } from 'payload/types';
import uploadImages from '../common/s3General';

const myBucketUrl = 'https://tbk8.s3.amazonaws.com/images';
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
    disableLocalStorage: true,
    s3: {
      bucket: 'tbk8',
      prefix: 'images/',
      s3Url: ({ doc }) => `/images/${doc.type}/${doc.filename}`
    },

    mimeTypes: ['image/*'],
    //adminThumbnail: ({ doc }) => `/images/${doc.filename}`,
    /*imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: null,
        position: 'centre',
      },
    ],*/
   // adminThumbnail: 'thumbnail',
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
  
 /* endpoints: [
    {
      path: '/media',
      method: 'post',
      handler: async (req, res, next) => {
        console.log(req);
      try {
        console.log(req);
        console.log(res);
            const responseAWS = await uploadImages(req.files) as any;
          if (responseAWS) {
            console.log('no4');
               res.status(200).json({ message: 'Api s3 cms Active' });
          } else {
            console.log('no3');
            res.status(200).json({ message: 'Api s3 cms Active no' });
          }
       
        } catch(e) {
          console.log('no5');
        }
    },
    }
  ],*/
}

export default Media;