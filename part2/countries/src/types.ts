export interface Country {
  name: Name;
  capital: string[];
  languages: Languages;
  area: number;
  flag: string;
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
}

interface Languages {
  [shortenedLang: string]: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
