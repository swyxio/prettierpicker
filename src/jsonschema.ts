export const properties = {
  arrowParens: {
    description: "Include parentheses around a sole arrow function parameter.",
    default: "avoid",
    oneOf: [
      {
        enum: ["avoid"],
        description: "Omit parens when possible. Example: `x => x`"
      },
      {
        enum: ["always"],
        description: "Always include parens. Example: `(x) => x`"
      }
    ]
  },
  bracketSpacing: {
    description: "Print spaces between brackets.",
    default: true,
    type: "boolean"
  },
  jsxBracketSameLine: {
    description: "Put > on the last line instead of at a new line.",
    default: false,
    type: "boolean"
  },
  jsxSingleQuote: {
    description: "Use single quotes in JSX.",
    default: false,
    type: "boolean"
  },
  parser: {
    description: "Which parser to use.",
    default: "babel",
    oneOf: [
      { enum: ["flow"], description: "Flow" },
      { enum: ["babel"], description: "JavaScript" },
      { enum: ["babel-flow"], description: "Flow" },
      { enum: ["typescript"], description: "TypeScript" },
      { enum: ["css"], description: "CSS" },
      { enum: ["less"], description: "Less" },
      { enum: ["scss"], description: "SCSS" },
      { enum: ["json"], description: "JSON" },
      { enum: ["json5"], description: "JSON5" },
      { enum: ["json-stringify"], description: "JSON.stringify" },
      { enum: ["graphql"], description: "GraphQL" },
      { enum: ["markdown"], description: "Markdown" },
      { enum: ["mdx"], description: "MDX" },
      { enum: ["vue"], description: "Vue" },
      { enum: ["yaml"], description: "YAML" },
      { enum: ["html"], description: "HTML" },
      { enum: ["angular"], description: "Angular" }
    ]
  },
  printWidth: {
    description: "The line length where Prettier will try wrap.",
    default: 80,
    type: "integer"
  },
  proseWrap: {
    description: "How to wrap prose.",
    default: "preserve",
    oneOf: [
      {
        enum: ["always"],
        description: "Wrap prose if it exceeds the print width."
      },
      { enum: ["never"], description: "Do not wrap prose." },
      { enum: ["preserve"], description: "Wrap prose as-is." }
    ]
  },
  semi: {
    description: "Print semicolons.",
    default: true,
    type: "boolean"
  },
  singleQuote: {
    description: "Use single quotes instead of double quotes.",
    default: false,
    type: "boolean"
  },
  tabWidth: {
    description: "Number of spaces per indentation level.",
    default: 2,
    type: "integer"
  },
  trailingComma: {
    description: "Print trailing commas wherever possible when multi-line.",
    default: "none",
    oneOf: [
      { enum: ["none"], description: "No trailing commas." },
      {
        enum: ["es5"],
        description: "Trailing commas where valid in ES5 (objects, arrays, etc.)"
      },
      {
        enum: ["all"],
        description: "Trailing commas wherever possible (including function arguments)."
      }
    ]
  },
  useTabs: {
    description: "Indent with tabs instead of spaces.",
    default: false,
    type: "boolean"
  }
}
export const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Schema for .prettierrc",
  type: "object",
  properties
  // definitions: {
  //   overridesDefinition: {
  //     type: "object",
  //     properties: {
  //       overrides: {
  //         type: "array",
  //         description: "Provide a list of patterns to override prettier configuration.",
  //         items: {
  //           type: "object",
  //           required: ["files"],
  //           properties: {
  //             files: {
  //               description: "Include these files in this override.",
  //               oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }]
  //             },
  //             excludeFiles: {
  //               description: "Exclude these files from this override.",
  //               oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }]
  //             },
  //             options: {
  //               type: "object",
  //               description: "The options to apply for this override.",
  //               $ref: "#/definitions/optionsDefinition"
  //             }
  //           },
  //           additionalProperties: false
  //         }
  //       }
  //     }
  //   }
  // }
}
