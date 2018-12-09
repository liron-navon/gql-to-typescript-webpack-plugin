import * as path from 'path';
import * as randomUUID from 'uuid/v4';
import gql from 'graphql-tag';
import * as fs from 'fs';
import * as webpackOptions from '../webpack.config.js';
import * as webpack from 'webpack';
import gqlToTypescriptWebpackPlugin from './index';

// since this test actually runs webpack I'm unsure how long it should take,
// the plugin itself should not take more than a couple hundred milliseconds
// for large projects with optimized glob.
const TEST_TIMEOUT = 60 * 1000;

// a sample of gql tag usage
const inputSample = gql`
    type Query {
        " get my type and have fun "
        getMyType(testString: String!): MyType
    }

    type MyType {
        test: String!
    }
`;

// what we are actually going to get
const outputSample = `
/*
*****************************************************
* This file was auto generated by gql-to-typescript *
*                  Type everything!                 *
*****************************************************
*/
export namespace TestNameSpace {
	export interface Query {
	/*  get my type and have fun  */
		getMyType?: (testString: string) => MyType;
	}
	export interface MyType {
		test: string;
	}
}
`;



test('The webpack plugin work as expected', () => {
    const tempFilePath = path.join(__dirname, `../temp/${Date.now()}=${randomUUID()}-types.ts`);
    const expectedOutput = removeAllSpaces(outputSample);

    // we return a promise since this is an asynchronous test
    return new Promise((resolve, reject) => {
        // we set the mode to none since it automatically set to test when running in test environment
        webpackOptions.mode = 'none';
        // we simply push our plugin with a randomly generated file name in temp
        webpackOptions.plugins.push(new gqlToTypescriptWebpackPlugin(
            './src/**/*.spec.ts',
            {
                silent: true,
                outputFile: tempFilePath,
                namespace: 'TestNameSpace'
            }
        ));
        // 1. Run webpack
        webpack(webpackOptions, function(err, stats) {

            // 2. Fail test if there are errors
            if (err) {
                return reject(err);
            } else if (stats.hasErrors()) {
                return reject(stats.toString());
            }

            // 3. since the webpack plugin is asynchronous we wait 1 second for the file to exist
            setTimeout(() => {
                const generatedFileContent = fs.readFileSync(tempFilePath, 'utf8');
                const output = removeAllSpaces(generatedFileContent);

                // 4. make sure that the file was created, and if so, resolve the promise
                expect(expectedOutput).toEqual(output);
                resolve();
            }, 1000);
        });
    });
}, TEST_TIMEOUT);

/**
 * A small utility to remove all the spaces from a given string,
 * it allows for faster comparison of large strings without hashing (which makes it horrible to debug).
 * @param str
 */
function removeAllSpaces(str: string) {
    return str.replace(/\s/g, '');
}
