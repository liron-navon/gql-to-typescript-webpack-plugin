import { GqlToTSConfig } from 'gql-to-typescript';
export default class GqlToTypescriptPlugin {
    private glob;
    private options;
    constructor(glob: string, options: GqlToTSConfig);
    apply(compiler: any): void;
}
