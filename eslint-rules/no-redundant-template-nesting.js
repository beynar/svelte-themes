/**
 * Custom ESLint rule to detect redundant template literal nesting
 * Detects patterns like `outer${`inner`}` that can be simplified
 */

export default {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Disallow redundant nesting in template literals',
			category: 'Best Practices',
		},
		fixable: 'code',
		schema: [],
		messages: {
			redundantNesting: 'Redundant nesting in template literal. Consider simplifying this expression.',
		},
	},
	
	create(context) {
		const visitedNodes = new WeakSet();
		
		function checkTemplateLiteral(node) {
			// Avoid processing the same node multiple times
			if (visitedNodes.has(node)) return;
			visitedNodes.add(node);
			
			// Check each expression in the template literal
			node.expressions.forEach((expression) => {
				// Case 1: String literals in template expressions - these can always be simplified
				if (expression.type === 'Literal' && typeof expression.value === 'string') {
					context.report({
						node: expression,
						messageId: 'redundantNesting',
					});
				}
				
				// Case 2: Nested template literals
				if (expression.type === 'TemplateLiteral') {
					context.report({
						node: expression,
						messageId: 'redundantNesting',
					});
				}
			});
		}

		return {
			TemplateLiteral: checkTemplateLiteral,
		};
	},
};