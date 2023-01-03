import { buildConfig } from 'payload/config';
const s3Upload = require('payload-s3-upload') as any;
import path from 'path';
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
  plugins: [
    s3Upload({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIA4OERV2YQWKXT76OX',
        secretAccessKey: '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',
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
