export default async function refreshGithubToken(token) {
  try {
    const url = 'https://github.com/login/oauth/access_token';

    const params = new URLSearchParams({
      refresh_token: token.refreshToken,
      grant_type: 'refresh_token',
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
    });

    const urlWithParams = `${url}?${params}`;

    const resp = await fetch(urlWithParams, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error('RefreshAccessTokenError');
    }

    const newToken = await resp.json();

    return {
      ...token,
      accessToken: newToken.access_token,
      accessTokenExpires: Date.now() + newToken.expires_at * 1000,
      refreshToken: newToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: error.message,
    };
  }
}
