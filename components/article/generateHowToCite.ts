import dayjs from "dayjs";

type HowToCite = {
  title: string;
  authors: {
    display_name?: string;
    name?: {
      last?: string;
      first?: string;
      middle?: string;
    };
  }[],
  preprint_date?: any
  published?: any,
  publication_id?: any
}

const getAuthors = (authors: HowToCite['authors']) => {
  if (!authors.length) return ""
  const firstThree = authors.slice(0, 8).map((author) => {
    //removes all the lowercase letters and spaces
    const firstNameinitials = author.name?.first?.split(' ').reduce((acc, curr) => {
      const firstLetter = curr[0]
      return acc + firstLetter;
    }, '')
    const middleNameInitials = author.name?.middle?.charAt(0) ?? "";
    return `${author.name.last} ${firstNameinitials}${middleNameInitials}`
  }).join(', ')
  const etAl = authors[7] ? ", et al" : ""

  return firstThree + etAl;
}

const getVolume = (article: HowToCite) => {
  if (article.published) {
    return dayjs(article.published).year()
  } else if (article.preprint_date) {
    return dayjs(article.preprint_date).year()
  } else {
    return ''
  }
}

/**
 * Generates a citation html for journal. Example:
 * 
 * Boisvert CJ, Warras B. Title of article with only first letter capital. J Med Insight (italics). 2022;2022(Article ID; example: 0340). doi:XXXXXX.
 * @param article 
 * @returns generated string
 */
export const generateHowToCiteStr = (article: HowToCite) => {
  const { authors, title, publication_id } = article;
  const _authors = getAuthors(authors);
  const _volume = getVolume(article);

  const _title = title.toLowerCase().replace(/./, (s: string) => s.toUpperCase())
  const journal = `<i>J Med Insight.</i> ${_volume};${_volume}(${publication_id})`
  const url = `https://doi.org/10.24296/jomi/${publication_id}`;
  const doiText = `doi:10.24296/jomi/${publication_id}`
  const doi = `<a href="${url}">${doiText}</a>`;
  const generated = [_authors, _title, journal, doi].join('. ');
  return generated;
}