// Fetches Medium RSS at build/dev time — no CORS issues, always fresh
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';

const USERNAME = 'aashishngupta';
const RSS_URL = `https://medium.com/feed/@${USERNAME}`;
const OUTPUT = new URL('../public/medium-articles.json', import.meta.url);

function get(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-fetcher/1.0)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        return get(res.headers.location, redirects - 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

try {
  const xml = await get(RSS_URL);
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6);

  const articles = itemMatches.map(m => {
    const item = m[1];

    const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]>/) || [])[1]?.trim() || '';
    const link  = (item.match(/<link>(https?:\/\/[^<]+)<\/link>/) ||
                   item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/))?.[1]?.trim() || '#';
    const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
    const date = pubDate
      ? new Date(pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '';

    // Full article HTML — Medium puts images here
    const content = (item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]>/) || [])[1] || '';
    // Description for excerpt
    const description = (item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]>/) || [])[1] || '';

    const cdnMatch  = content.match(/src="(https:\/\/cdn-images-\d+\.medium\.com\/[^"]+)"/);
    const miroMatch = content.match(/src="(https:\/\/miro\.medium\.com\/[^"]+)"/);
    const cover = cdnMatch?.[1] || miroMatch?.[1] || null;

    const excerpt = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 140) + '…';

    const categories = [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]>/g)]
      .map(c => c[1]).slice(0, 2);

    return { title, body: excerpt, date, href: link, cover, categories };
  });

  fs.writeFileSync(fileURLToPath(OUTPUT), JSON.stringify(articles, null, 2));
  console.log(`✓ Medium: fetched ${articles.length} articles (${articles.filter(a => a.cover).length} with images)`);
} catch (err) {
  console.warn('⚠ Medium fetch failed, skipping:', err.message);
}
