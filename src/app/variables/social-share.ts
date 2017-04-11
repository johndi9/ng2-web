const website: string = 'http://jdmiguel.xyz';
const title: string = 'Juan Diego de Miguel Website';
const summary: string = 'Check my new website with Angular2 / Google Material';

export const SOCIAL_SHARE = {
  twitter: encodeURI(`https://twitter.com/intent/tweet?text=${summary}&via=juandiegodemi&url=${website}`),
  googlePlus: encodeURI(`https://plus.google.com/share?url=${website}`),
  facebook: encodeURI(`https://www.facebook.com/dialog/share?app_id=429283144074151&display=popup&href=${website}&quote=${summary}`),
  linkedIn: encodeURI(`https://www.linkedin.com/shareArticle?url=${website}&title=${title}&summary=${summary}&source=${website}`)
};