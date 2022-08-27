import type { Rule } from "eslint";

const rule: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Make all boolean cast the same",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        schema: [],
    },
    create: (context) => {
        void context;
        return {};
    },
};

export = rule;
