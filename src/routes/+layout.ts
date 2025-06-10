export function load({ url }) {
  // Check if we're on a forced theme page
  if (url.pathname === '/dark') {
    return { forcedTheme: 'dark' };
  }
  if (url.pathname === '/light') {
    return { forcedTheme: 'light' };
  }
  
  return {};
}