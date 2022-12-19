import { buildConfig } from 'payload/config';
import s3Upload from 'payload-s3-upload';
import path from 'path';
import Examples from './collections/Examples';
import Users from './collections/Users';
import Media from './collections/Media';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug
  },
  collections: [
    Users,
    Media,
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  plugins: [
    s3Upload({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIA4OERV2YQ3JKGKPX2',
        secretAccessKey: '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',
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
