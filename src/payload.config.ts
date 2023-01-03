import { buildConfig } from 'payload/config';
const s3Upload = require('payload-s3-upload') as any;
import path from 'path';
import Users from './collections/Users';
import Media from './collections/Media';

export default buildConfig({
  serverURL: process.env.SERVER,
  admin: {
    user: Users.slug
  },
  collections: [
    Users,
    Media,
  ],
  plugins: [
    s3Upload({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.KEY_S3,
        secretAccessKey: process.env.SECRET_S3,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts') || "",
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql') || "",
  },
});
