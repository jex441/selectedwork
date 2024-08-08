export const identifierHandler = (username: string, hostname: string) => {
  if (hostname === 'localhost') return username;
  if (hostname === 'selected-work.com') return username;
  if (hostname === 'dash.xi-seven.vercel.app') return username;
  else return hostname;
};
