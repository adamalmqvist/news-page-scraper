import { Article } from './types/types';
import addArticles from './database/db';
import { scrapeMultipleUrls } from './controller/scraping';
import { getSummaryFromOpenAI } from './controller/summary';

const urls = [
  'https://svt.se',
  'https://www.dn.se/'
  // Add more URLs here
];


const main = async () => {
  const scrapedDataList = await scrapeMultipleUrls(urls);
  const summaries: Article[] = [];
  
  for (const data of scrapedDataList) {
    for (const content of data.content) {
      const summary = await getSummaryFromOpenAI(content);
      summaries.push(summary);
    }
  }

  await addArticles(summaries)
  
}

main().catch(error => console.error('Error in main function:', error));
