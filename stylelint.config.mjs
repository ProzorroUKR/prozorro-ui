export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-html/vue", "stylelint-config-recommended-vue/scss"],
  ignoreFiles: ["dist/**/*", "storybook-static/**/*", "node_modules/**/*"],
  plugins: ["stylelint-order"],
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "scss/at-extend-no-missing-placeholder": null,
    "no-empty-source": null,
    "no-descending-specificity": null,
    "selector-pseudo-element-no-unknown": [
      true,
      { ignorePseudoElements: ["/deep/", "deep", "v-deep", "slotted", "global"] },
    ],
    "custom-property-empty-line-before": [
      "never",
      {
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
    "property-no-vendor-prefix": [true, { ignoreProperties: ["appearance", "text-size-adjust", "hyphens"] }],
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["inside-block", "blockless-after-same-name-blockless", "blockless-after-blockless", "first-nested"],
        ignore: [
          "after-comment",
          "first-nested",
          "inside-block",
          "blockless-after-same-name-blockless",
          "blockless-after-blockless",
        ],
        ignoreAtRules: ["array", "of", "at-rules"],
      },
    ],
    "no-invalid-position-at-import-rule": null,
  },
};
