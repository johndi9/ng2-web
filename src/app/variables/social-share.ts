const website: string = 'http://jdmiguel.xyz';

export const SOCIAL_SHARE = {
  twitter: 'https://twitter.com/intent/tweet?text=' +
  encodeURI(`Check my new website with Angular2 / Google Material\n${website} via @juandiegodemi'`),

  googlePlus: `https://plus.google.com/share?url=${website}`
};