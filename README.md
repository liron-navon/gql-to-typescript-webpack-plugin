### GQL to Typescript webpack plugin

### usage

First you gonna need to install it: `npm install --save gql-to-typescript-webpack-plugin`

Lets say you have a bunch of files on the server, in which you use the gql tag, you want them to be turned into greatly typed typescript? it's simply a matter of adding this plugin to your webpack build:

```javascript
import gqlToTypescriptWebpackPlugin from 'gql-to-typescript-webpack-plugin';

module.exports = {
    /* ...whatever webpack configurations you use */
    plugins: [
        new gqlToTypescriptWebpackPlugin(
            './src/**/*.spec.ts',
            {
                outputFile: tempFilePath,
                namespace: 'TestNameSpace'
            }
        )
    ]
    /* ...whatever webpack configurations you use */
}

```

Here is a sample file
```graphql
/* .... some code */
const mySchema = gql`
    type Query {
        " Live long, and prosper. 🖖 "
        getSpoke(season: String!): Spoke
    }
    type Spoke {
        name: String
        age: Int
        id: ID!
    }
`;
/* .... some other code */
```
And after going through the converter, we will get this typescript file, do notice that all functions (queries, mutations and subscriptions) will be optionals to make life easier when using them in your ts code.

```typescript
export namespace StarTrackApi {
    export interface Query {
        /*  Live long, and prosper. 🖖  */
        getSpoke?: (season: string) => Spoke;
    }
    export interface Spoke {
        name?: string
        age?: number
        id: string | number
    }
}
```

#### what problem does this library solve

Let's say you want to be able to define a strongly typed server that works with a strongly typed frontend, and you want both to work with graphql, the issue is you might find yourself using typescript-to-graphql kind of libraries that generate graphql fron annotated typescript, the issue is that you want to take the types to the frontend, but not the output of the annotations use since those libraries are pretty big for a client - instead of doing that, the idea behind this library is to make use of the gql tag, and create a single typescript file which you can share between the client and the server.

gql is the graphql-tag way of doing graphql, it defines multiple small schemas annotated with the gql tag and it makes building a graphql server very simple and intuitive.
