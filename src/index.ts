import {convertFiles} from 'gql-to-typescript';

interface PluginOptions {
    scalars?: {
        [name: string]: string
    };
    ignoreFields?: Array<string>;
    ignoreTypes?: Array<string>;
    namespace?: string;
    outputFile: string;
}


export default class GqlToTypescriptPlugin {
    constructor(private glob: string, private options: PluginOptions) {}

    apply(compiler) {
        compiler.plugin('done', () => {
            const {glob, options} = this;
            convertFiles(glob, options);
        });
    }
}
