const langs: any = {};

export function getLang(langName: string) : any {
  if (langName in langs) {
    return langs[langName];
  }
  langs[langName] = require(`../assets/locale/${langName}.json`);

  return getLang(langName);
}
