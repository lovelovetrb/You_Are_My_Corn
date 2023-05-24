module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
//    plugins: ["react", "@typescript-eslint", "prefer-arrow"],
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "react/self-closing-comp": [
            "error",
            {
                component: true,
                html: false,
            },
        ],
//        "prefer-arrow/prefer-arrow-functions": [
//            "error",
//            {
//                disallowPrototype: true,
//                singleReturnOnly: false,
//                classPropertiesAllowed: false,
//            },
//        ],
//        "prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],
    },
};
