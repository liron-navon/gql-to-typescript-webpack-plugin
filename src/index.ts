import {convertFiles, GqlToTSConfig} from 'gql-to-typescript';

export default class GqlToTypescriptPlugin {
    constructor(private glob: string, private options: GqlToTSConfig) {}

    apply(compiler) {
        compiler.plugin('done', () => {
            const {glob, options} = this;
            convertFiles(glob, options);
        });
    }
}

module.exports = GqlToTypescriptPlugin;

