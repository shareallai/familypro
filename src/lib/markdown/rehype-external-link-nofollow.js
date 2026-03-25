function toRelTokens(rel) {
  if (Array.isArray(rel)) {
    return rel.flatMap((value) => String(value).split(/\s+/)).filter(Boolean);
  }

  if (typeof rel === 'string') {
    return rel.split(/\s+/).filter(Boolean);
  }

  return [];
}

function isExternalHttpLink(href, siteOrigin) {
  if (typeof href !== 'string' || !/^(https?:)?\/\//i.test(href)) {
    return false;
  }

  try {
    return new URL(href, siteOrigin).origin !== siteOrigin;
  } catch {
    return false;
  }
}

function visit(node, callback) {
  callback(node);

  if (!node || typeof node !== 'object' || !Array.isArray(node.children)) {
    return;
  }

  for (const child of node.children) {
    visit(child, callback);
  }
}

export function rehypeExternalLinkNofollow({ siteOrigin }) {
  return (tree) => {
    visit(tree, (node) => {
      if (node?.type !== 'element' || node.tagName !== 'a') {
        return;
      }

      const href = node.properties?.href;
      if (!isExternalHttpLink(href, siteOrigin)) {
        return;
      }

      const relTokens = toRelTokens(node.properties?.rel);
      if (relTokens.includes('nofollow')) {
        return;
      }

      node.properties = node.properties ?? {};
      node.properties.rel = [...relTokens, 'nofollow'];
    });
  };
}
