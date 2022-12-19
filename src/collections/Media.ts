import { CollectionConfig } from 'payload/types';
import uploadImages  from '../common/s3General';


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
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'date',
        type: 'date',
      },
  ],
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: false,
    imageSizes: [
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
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  endpoints: [
    {
      path: '/media',
      method: 'post',
      handler: async (req, res, next) => {
      try {
        console.log(req);
        console.log(res);
         /*   const responseAWS = await uploadImages(req.files) as any;
          if (responseAWS) {
            console.log('no4');
               res.status(200).json({ message: 'Api s3 cms Active' });
          } else {
            console.log('no3');
            res.status(200).json({ message: 'Api s3 cms Active no' });
          }*/
       
        } catch(e) {
          console.log('no5');
        }
    },

    }
  ],
}

export default Media;