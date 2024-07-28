import FirecrawlApp from "@mendable/firecrawl-js";
import { WebsiteData } from "../types/types";

export const crawlUrl = async (url: string): Promise<string[]> => {
    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_KEY });
    try {
      const scrapedData = await app.crawlUrl(url,{
          crawlerOptions: {
            excludes: [],
            includes: [],
            limit: 10
          }
        });
      return scrapedData.map(item => item.content)
    } catch (error) {
      console.error(`Error scraping URL ${url}:`, error);
      return [];
    }
  }
  
export const scrapeMultipleUrls = async (urls: string[]): Promise<WebsiteData[]> => {
    const scrapedDataList: WebsiteData[] = [];
    for (const url of urls) {
      const scrapedData = await crawlUrl(url)
      scrapedDataList.push({ url, content: scrapedData });
    }
    return scrapedDataList;
  }