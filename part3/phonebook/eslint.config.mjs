import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      "arrow-spacing": [
        "error",
        {
          after: true,
          before: true,
        },
      ],
      eqeqeq: "error",
      "no-console": "off",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
    },
  },
  {
    ignores: ["dist/**"],
  },
];
