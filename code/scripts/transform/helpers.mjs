import * as t from "@babel/types";

export function getAttr(attrs, name) {
  const a = attrs.find(a => t.isJSXAttribute(a) && a.name?.name === name);
  if (!a) return null;
  if (t.isStringLiteral(a.value)) return a.value.value;
  return null;
}

export function makeJSXElement(tagName, attrs, children, selfClosing) {
  const id = tagName.includes(".")
    ? t.jsxMemberExpression(t.jsxIdentifier(tagName.split(".")[0]), t.jsxIdentifier(tagName.split(".")[1]))
    : t.jsxIdentifier(tagName);
  const jsxAttrs = Object.entries(attrs).map(([k, v]) => {
    if (v === true) return t.jsxAttribute(t.jsxIdentifier(k), null);
    if (typeof v === "string") return t.jsxAttribute(t.jsxIdentifier(k), t.stringLiteral(v));
    return t.jsxAttribute(t.jsxIdentifier(k), t.jsxExpressionContainer(v));
  });
  if (selfClosing || children.length === 0) {
    return t.jsxElement(t.jsxOpeningElement(id, jsxAttrs, true), null, [], true);
  }
  const closeId = tagName.includes(".")
    ? t.jsxMemberExpression(t.jsxIdentifier(tagName.split(".")[0]), t.jsxIdentifier(tagName.split(".")[1]))
    : t.jsxIdentifier(tagName);
  return t.jsxElement(t.jsxOpeningElement(id, jsxAttrs, false), t.jsxClosingElement(closeId), children, false);
}

export function textContent(node) {
  if (t.isJSXText(node)) return node.value.trim();
  if (t.isJSXExpressionContainer(node) && t.isStringLiteral(node.expression)) return node.expression.value;
  return null;
}

export function getTextChildren(element) {
  const texts = [];
  for (const child of element.children || []) {
    if (t.isJSXText(child) && child.value.trim()) texts.push(child.value.trim());
    else if (t.isJSXElement(child)) texts.push(...getTextChildren(child));
  }
  return texts;
}
