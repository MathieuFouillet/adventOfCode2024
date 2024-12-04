import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  tseslint.configs.eslintRecommended,
  ...tseslint.configs.recommended,
  {},
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: { prettier: eslintPluginPrettier },

    rules: {
      'prettier/prettier': ['error'],
    },
  }
);
