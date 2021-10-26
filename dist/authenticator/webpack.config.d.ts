export const entry: string;
export namespace module {
    const rules: {
        test: RegExp;
        exclude: RegExp;
        use: {
            loader: string;
            options: {
                transpileOnly: boolean;
            };
        }[];
    }[];
}
export namespace resolve {
    const extensions: string[];
    namespace fallback {
        const stream: string;
        const assert: string;
    }
}
export namespace resolveLoader {
    export const modules: string[];
    const extensions_1: string[];
    export { extensions_1 as extensions };
    export const mainFields: string[];
}
export namespace output {
    const filename: string;
    const path: string;
}
export const watch: boolean;
export namespace watchOptions {
    const aggregateTimeout: number;
    const poll: number;
    const ignored: RegExp;
}
export namespace optimization {
    const minimize: boolean;
}
