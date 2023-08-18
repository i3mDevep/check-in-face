
import type { CodegenConfig } from '@graphql-codegen/cli';

const apiUrl = process.env.VITE_API_URL as string

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [apiUrl]: {
        headers: {
          'x-api-key': process.env.VITE_API_KEY as string
        }
      }
    }
  ],
  documents: "src/graphql/**/*.{gql,graphql}",
  generates: {
    "src/api-graphql-types.ts": {
      plugins: ['typescript', 'typescript-resolvers']
    },
  }
};

export default config;
