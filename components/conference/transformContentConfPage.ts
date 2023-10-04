import cheerio from 'cheerio'

type ConferenceData = {
  introductionSection: string,
  featuredCasesSection: string,
  videosSection: string,
}
/**
 * Transform html content from cms to json
 */
export const transformContent = (
  content: string,
): ConferenceData => {
  const $ = cheerio.load(content)
  const introductionSection = $('.introduction').html()
  const featuredCasesSection = $('.featured-cases').html()
  const videosSection = $('.videos').html()
  return {
    introductionSection,
    featuredCasesSection,
    videosSection
  }
}
