import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRssSources(sourcesUrl) {
  try {
    const response = await fetch(sourcesUrl);
    const data = await response.json();
    console.log('Fetched sources:', data.sources); // Log fetched sources for debugging
    return data.sources;
  } catch (error) {
    console.error('Error fetching RSS sources:', error);
    throw error;
  }
}

export async function fetchRssFeed(proxyUrl, source) {
  try {
    // Use proxy if provided; otherwise fetch directly
    const rssUrl = `${proxyUrl}${source.rss_feed_url.trim()}`;
    console.log(`Fetching RSS feed from: ${rssUrl}`);

    const feedResponse = await fetch(rssUrl);
    const feedData = await feedResponse.text();
    const feed = await parser.parseString(feedData);

    return feed.items.map(item => {
      console.log('Raw item:', item); // Debug: Log the entire item

      // Use RSS standards or fallback to common non-standard fields
      const rawDescription = item.content || item.description || ''; // Check for 'content' first
      const cleanedDescription = rawDescription
        ?.replace(/<!\[CDATA\[|\]\]>/g, '') // Remove CDATA markers
        ?.trim();

      // Extract the first <img> tag for the image
      const imageFromDescription = cleanedDescription?.match(/<img.*?src="(.*?)"/)?.[1] || '';
      const image = item.enclosure?.url || item['media:content']?.url || imageFromDescription;

      // Extract the <p> content for the description
      const textDescription = cleanedDescription?.match(/<p>(.*?)<\/p>/)?.[1] || '';

      console.log('Cleaned description:', textDescription);
      console.log('Extracted image:', image);

      return {
        title: item.title || '', // Ensure title is present
        link: item.link || '', // Ensure link is present
        description: textDescription || '', // Use only the <p> content
        image: image,
        source: source.name || 'Unknown', // Include the source name
        date: item.isoDate || item.pubDate || 'Unknown', // Extract the date
      };
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}
