interface PluginOptions {
    scalars?: {
        [name: string]: string;
    };
    ignoreFields?: Array<string>;
    ignoreTypes?: Array<string>;
    namespace?: string;
    outputFile: string;
}
export default class GqlToTypescriptPlugin {
    private glob;
    private options;
    constructor(glob: string, options: PluginOptions);
    apply(compiler: any): void;
}
export {};
