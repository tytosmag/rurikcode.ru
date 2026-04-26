export const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: false, // пока http, в проде нужно true
  maxAge: 1000 * 60 * 60 * 24 * 7,
});