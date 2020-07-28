module.exports = {
  env: {
    "react-native/react-native": true,
  },
  extends: [
    `airbnb`,
    `plugin:react-native/all`,
    `plugin:import/errors`,
    `plugin:import/warnings`,
    `plugin:security/recommended`,
    `plugin:sonarjs/recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:import/typescript`,
    `plugin:react-hooks/recommended`,
  ],
  globals: {
    __DEV__: true,
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: [
        `**/__tests__/*.{js,jsx,ts,tsx}`,
        `*.test.{js,jsx,ts,tsx}`,
      ],
    },
    {
      files: [
        `**/*-stories.js`,
      ],
      rules: {
        "import/no-extraneous-dependencies": [
          `error`,
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
        "no-console": `warn`,
      },
    },
    {
      files: [`*.json`],
      settings: {
        "disable/plugins": [`no-secrets`],
      },
    },
    {
      files: [`**/*.js`],
      settings: {
        "disable/plugins": [`@typescript-eslint`],
        rules: {
          "@typescript-eslint/no-vars-requires": `off`,
        },
      },
    },
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8,
  },
  plugins: [
    `react`,
    `react-native`,
    `jsx-a11y`,
    `import`,
    `security`,
    `no-secrets`,
    `json-format`,
    `sonarjs`,
    `sort-keys-fix`,
    `@typescript-eslint`,
    `react-hooks`,
    `disable`,
  ],
  processor: `disable/disable`,
  root: true,
  rules: {
    "@typescript-eslint/member-delimiter-style": [
      `error`,
      {
        multiline: {
          delimiter: `comma`,
          requireLast: true,
        },
        singleline: {
          delimiter: `comma`,
          requireLast: true,
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      `warn`,
      {
        filter: {
          match: false,
          regex: `__DEV__`,
        },
        format: [
          `camelCase`,
          `UPPER_CASE`,
          `PascalCase`,
        ],
        leadingUnderscore: `forbid`,
        selector: `variable`,
        trailingUnderscore: `forbid`,
      },
    ],
    "@typescript-eslint/no-empty-function": `off`,
    "@typescript-eslint/no-explicit-any": `off`,
    "@typescript-eslint/no-unused-vars": `error`,
    "@typescript-eslint/semi": [
      `error`,
      `never`,
    ],
    camelcase: `off`,
    "comma-dangle": [
      `error`,
      `always-multiline`,
    ],
    "global-require": `off`,
    "import/extensions": [
      `error`,
      `ignorePackages`,
      {
        js: `never`,
        jsx: `never`,
        ts: `never`,
        tsx: `never`,
      },
    ],
    "import/no-extraneous-dependencies": [
      `error`,
      {
        devDependencies: true,
        optionalDependencies: false,
        packageDir: `./`,
        peerDependencies: false,
      },
    ],
    "import/no-unresolved": `error`,
    indent: [
      `warn`,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [
          `JSXElement`,
          `JSXElement > *`,
          `JSXAttribute`,
          `JSXIdentifier`,
          `JSXNamespacedName`,
          `JSXMemberExpression`,
          `JSXSpreadAttribute`,
          `JSXExpressionContainer`,
          `JSXOpeningElement`,
          `JSXClosingElement`,
          `JSXText`,
          `JSXEmptyExpression`,
          `JSXSpreadChild`,
        ],
      },
    ],
    "jsx-a11y/accessible-emoji": `off`,
    "jsx-a11y/anchor-is-valid": `off`,
    "max-len": [
      `warn`,
      {
        code: 100,
      },
    ],
    "no-console": `off`,
    "no-empty-function": `off`,
    "no-secrets/no-secrets": `error`,
    "no-underscore-dangle": [
      `error`,
      {
        allow: [
          `__DEV__`,
        ],
      },
    ],
    "no-unused-vars": `off`,
    "no-var": `error`,
    "object-property-newline": `error`,
    "prefer-const": `error`,
    quotes: [
      `error`,
      `backtick`,
    ],
    "react-native/no-raw-text": `off`,
    "react/jsx-closing-bracket-location": [
      `error`,
    ],
    "react/jsx-filename-extension": `off`,
    "react/jsx-indent": `off`,
    "react/jsx-indent-props": [
      `error`,
      2,
    ],
    "react/jsx-props-no-spreading": `off`,
    "react/prop-types": `off`,

    "react/static-property-placement": [
      `error`,
      `static public field`,
    ],
    "security/detect-non-literal-regexp": `off`,
    "security/detect-non-literal-require": `off`,
    /* until
      https://github.com/nodesecurity/eslint-plugin-security/issues/27
       is fixed
    */
    "security/detect-object-injection": `off`,
    semi: [
      `error`,
      `never`,
    ],
    "sort-keys-fix/sort-keys-fix": `warn`,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [
        `.ts`,
        `.tsx`,
      ],
    },
    "import/resolver": {
      node: {
        extensions: [
          `.js`,
          `.jsx`,
          `.android.js`,
          `.ios.js`,
        ],
      },
      typescript: {
        alwaysTryTypes: true,
        directory: `./tsconfig.json`,
      },
    },
  },
}
