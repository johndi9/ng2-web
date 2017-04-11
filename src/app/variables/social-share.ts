const website: string = 'http://jdmiguel.xyz';

export const SOCIAL_SHARE = {
  twitter: 'https://twitter.com/intent/tweet?text=' +
  encodeURI(`Check my new website with Angular2 / Google Material\n${website} via @juandiegodemi'`),
  googlePlus: `https://plus.google.com/share?url=${website}`,
  facebook: `https://www.facebook.com/dialog/share?app_id=429283144074151&display=popup&href=${website}`
};