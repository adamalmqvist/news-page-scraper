import { createClient } from "@supabase/supabase-js";


 const addArticles = async (articles: {title: string, summary: string}[]) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const errors = [];
    for (const article of articles) {
        const {error } = await supabase
            .from('news_articles')
            .insert({
                title: article.title,
                summary: article.summary
            }); 
        if (error) {
            console.error('Error adding article:', error);
            errors.push(error);
        }
    }
    
    if (errors.length > 0) {
        return { success: false, errors };
    }

    return { success: true };
}

export default addArticles