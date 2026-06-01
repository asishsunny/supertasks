import * as t from "@babel/types";

export function iterVarName(collectionKey) {
  if (collectionKey.endsWith("ses") || collectionKey.endsWith("xes") || collectionKey.endsWith("zes")) {
    return collectionKey.slice(0, -2);
  }
  if (collectionKey.endsWith("ies")) {
    return collectionKey.slice(0, -3) + "y";
  }
  return collectionKey.replace(/s$/, "");
}

export function buildMemberExpr(dottedString) {
  const parts = dottedString.split(".");
  let node = t.identifier(parts[0]);
  for (let i = 1; i < parts.length; i++) {
    node = t.memberExpression(node, t.identifier(parts[i]));
  }
  return node;
}
