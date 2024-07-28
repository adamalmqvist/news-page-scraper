import OpenAI from "openai";
import { Article } from "../types/types";


export const getSummaryFromOpenAI = async (text: string): Promise<Article> => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
      });
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "Summarize the following text. I want you to remove all unnecessary data and only summarize the news. Also, the text might be in different languages so I want you to translate all to Swedish. I want you to only return a json object that has a title and a summary. If the text is not a news article, return an empty string. The json object should look like this: {\"title\": \"<title>\", \"summary\": \"<summary>\"}" },
          { role: "user", content: text }
        ],
        temperature: 0.5,
      });
  
      return JSON.parse(response.choices[0].message?.content) ?? {
        title: '',
        summary: ''
      }
    } catch (error) {
      console.error('Error getting summary from OpenAI:', error);
      return {
        title: '',
        summary: ''
      }
    }
  }
  