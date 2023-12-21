/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ts from 'typescript';

function tsHasDecorators(tsNamespace: typeof ts): tsNamespace is typeof ts & {
	canHaveDecorators(node: ts.Node): node is any;
	getDecorators(node: ts.Node): readonly ts.Decorator[] | undefined;
} {
	return typeof tsNamespace.canHaveDecorators === 'function';
}

export function getDecorators(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean) {
	// beginning in ts4.8 node.decorator is undefined, use getDecorators instead.
	const decorators = tsHasDecorators(ts) && ts.canHaveDecorators(node) ? ts.getDecorators(node) : [];

	if (!decorators || !decorators.length) {
		return [];
	}

	return decorators
		.map((e: any) => {
			while (e.expression !== undefined) {
				e = e.expression;
			}

			return e as ts.Identifier;
		})
		.filter(isMatching);
}

export type test = ts.MethodDeclaration;

export function getNodeFirstDecoratorName(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean) {
	const decorators = getDecorators(node, isMatching);
	if (!decorators || !decorators.length) {
		return;
	}

	return decorators[0].text;
}

export function getNodeFirstDecoratorValue(node: ts.Node, typeChecker: ts.TypeChecker, isMatching: (identifier: ts.Identifier) => boolean) {
	const decorators = getDecorators(node, isMatching);
	if (!decorators || !decorators.length) {
		return;
	}
	const values = getDecoratorValues(decorators[0], typeChecker);
	return values && values[0];
}

export function getDecoratorValues(decorator: ts.Identifier, typeChecker: ts.TypeChecker): any[] {
	const expression = decorator.parent as ts.CallExpression;
	const expArguments = expression.arguments;
	if (!expArguments || !expArguments.length) {
		return [];
	}
	return expArguments.map((a) => getInitializerValue(a, typeChecker));
}

export function getSecurites(decorator: ts.Identifier, typeChecker: ts.TypeChecker) {
	const [first, second] = getDecoratorValues(decorator, typeChecker);
	if (isObject(first)) {
		return first;
	}
	return { [first]: second || [] };
}

export function isDecorator(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean) {
	const decorators = getDecorators(node, isMatching);
	if (!decorators || !decorators.length) {
		return false;
	}
	return true;
}

function isObject(v: any) {
	return typeof v === 'object' && v !== null;
}

export function getPath(decorator: ts.Identifier, typeChecker: ts.TypeChecker): string {
	const [path] = getDecoratorValues(decorator, typeChecker);

	if (path === undefined) {
		return '';
	}

	return path;
}

export function getProduces(node: ts.Node, typeChecker: ts.TypeChecker): string[] {
	const producesDecorators = getDecorators(node, (identifier) => identifier.text === 'Produces');

	if (!producesDecorators || !producesDecorators.length) {
		return [];
	}

	return producesDecorators.map((decorator) => getDecoratorValues(decorator, typeChecker)[0]);
}

const hasInitializer = (node: ts.Node): node is ts.HasInitializer => Object.prototype.hasOwnProperty.call(node, 'initializer');
const extractInitializer = (decl?: ts.Declaration) => (decl && hasInitializer(decl) && (decl.initializer as ts.Expression)) || undefined;
const extractImportSpecifier = (symbol?: ts.Symbol) =>
	(symbol?.declarations && symbol.declarations.length > 0 && ts.isImportSpecifier(symbol.declarations[0]) && symbol.declarations[0]) || undefined;

export type InitializerValue = string | number | boolean | undefined | null | InitializerValue[];
export type DefinedInitializerValue = string | number | boolean | null | DefinedInitializerValue[];
export function isNonUndefinedInitializerValue(value: InitializerValue): value is DefinedInitializerValue {
	if (Array.isArray(value)) {
		return value.every(isNonUndefinedInitializerValue);
	} else {
		return value !== undefined;
	}
}

export function getInitializerValue(initializer?: ts.Expression | ts.ImportSpecifier, typeChecker?: ts.TypeChecker): InitializerValue | DefinedInitializerValue {
	if (!initializer || !typeChecker) {
		return;
	}

	switch (initializer.kind) {
		case ts.SyntaxKind.ArrayLiteralExpression: {
			const arrayLiteral = initializer as ts.ArrayLiteralExpression;
			return arrayLiteral.elements.map((element) => getInitializerValue(element, typeChecker));
		}
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
			return (initializer as ts.StringLiteral).text;
		case ts.SyntaxKind.TrueKeyword:
			return true;
		case ts.SyntaxKind.FalseKeyword:
			return false;
		case ts.SyntaxKind.PrefixUnaryExpression: {
			const prefixUnary = initializer as ts.PrefixUnaryExpression;
			switch (prefixUnary.operator) {
				case ts.SyntaxKind.PlusToken:
					return Number((prefixUnary.operand as ts.NumericLiteral).text);
				case ts.SyntaxKind.MinusToken:
					return Number(`-${(prefixUnary.operand as ts.NumericLiteral).text}`);
				default:
					throw new Error(`Unsupport prefix operator token: ${prefixUnary.operator}`);
			}
		}
		case ts.SyntaxKind.NumberKeyword:
		case ts.SyntaxKind.FirstLiteralToken:
			return Number((initializer as ts.NumericLiteral).text);
		case ts.SyntaxKind.NewExpression: {
			const newExpression = initializer as ts.NewExpression;
			const ident = newExpression.expression as ts.Identifier;

			if (ident.text === 'Date') {
				let date = new Date();
				if (newExpression.arguments) {
					const newArguments = newExpression.arguments.filter((args) => args.kind !== undefined);
					const argsValue = newArguments.map((args) => getInitializerValue(args, typeChecker));
					if (argsValue.length > 0) {
						date = new Date(argsValue as any);
					}
				}
				const dateString = date.toISOString();
				// if (type && type.dataType === 'date') {
				// 	return dateString.split('T')[0];
				// }
				return dateString;
			}
			return;
		}
		case ts.SyntaxKind.NullKeyword:
			return null;
		case ts.SyntaxKind.ObjectLiteralExpression: {
			const objectLiteral = initializer as ts.ObjectLiteralExpression;
			const nestedObject: any = {};
			objectLiteral.properties.forEach((p: any) => {
				nestedObject[p.name.text] = getInitializerValue(p.initializer, typeChecker);
			});
			return nestedObject;
		}
		case ts.SyntaxKind.ImportSpecifier: {
			const importSpecifier = initializer as ts.ImportSpecifier;
			const importSymbol = typeChecker.getSymbolAtLocation(importSpecifier.name);
			if (!importSymbol) return;
			const aliasedSymbol = typeChecker.getAliasedSymbol(importSymbol);
			const declarations = aliasedSymbol.getDeclarations();
			const declaration = declarations && declarations.length > 0 ? declarations[0] : undefined;
			return getInitializerValue(extractInitializer(declaration), typeChecker);
		}
		default: {
			const symbol = typeChecker.getSymbolAtLocation(initializer);
			return getInitializerValue(extractInitializer(symbol?.valueDeclaration) || extractImportSpecifier(symbol), typeChecker);
		}
	}
}
