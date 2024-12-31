export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/_next')) {
        url.pathname = '/.next' + url.pathname;
      }
      return env.ASSETS.fetch(url);
    }
  };
  