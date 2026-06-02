export const CHATBOT_VISIBLE_PATHS = ['/', '/portfolio', '/about', '/contact'] as const;

export function isNavItemActive(pathname: string, itemHref: string) {
  if (itemHref === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(itemHref);
}
