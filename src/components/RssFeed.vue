<template>
  <div>
    <SourceSelector :sources="allSources" @filterApplied="filterSources" />
    <div v-if="debugMode">
      <button @click="checkLocalStorage">Check Local Storage</button>
      <button @click="clearLocalStorage">Clear Local Storage</button>
    </div>
    <div class="feed-container">
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-if="!loading && !error" class="feed">
        <ArticleCard v-for="article in articles" :key="article.link" :article="article" />
      </ul>
    </div>
  </div>
</template>

<script>
import SourceSelector from '@/components/SourceSelector';
import ArticleCard from '@/components/ArticleCard';
import { fetchRssSources, fetchRssFeed } from '@/utils/rssFetcher';
import { getFromStorage } from '@/utils/storage';

export default {
  name: 'RssFeed',
  components: { SourceSelector, ArticleCard },
  data() {
    return {
      allSources: [],
      selectedSources: getFromStorage('selectedSources', []),
      articles: [],
      loading: true,
      error: null,
      proxyUrl: process.env.VUE_APP_USE_PROXY === '1' ? process.env.VUE_APP_PROXY_URL : '',
      debugMode: process.env.VUE_APP_DEBUG === '1', // Debug mode based on environment
    };
  },
async mounted() {
  const storedSources = getFromStorage('selectedSources', []);
  const sourcesUrl = `${process.env.BASE_URL}rss_sources.json`;
  console.log('Retrieved selected sources from storage:', storedSources);

  //this.selectedSources = storedSources;
  this.selectedSources = storedSources.length ? storedSources : this.allSources.map(s => s.id);
  try {
    this.allSources = await fetchRssSources(sourcesUrl);
    console.log('All sources:', this.allSources);

    const defaultSources = this.allSources.map(s => s.id);
    this.filterSources(this.selectedSources.length ? this.selectedSources : defaultSources);
  } catch (error) {
    console.error('Error loading sources:', error);
    this.error = 'Failed to load sources. Please try again later.';
  }
},
  methods: {
    async filterSources(selectedSourceIds) {
      this.loading = true;
      this.error = null;
      this.articles = [];
      try {
        const selectedSources = this.allSources.filter(source => selectedSourceIds.includes(source.id));
        for (const source of selectedSources) {
          const items = await fetchRssFeed('http://192.168.0.105:8081/', source);
          this.articles = [...this.articles, ...items.slice(0, 3)]; // Limit to 3 items per source
        }
      } catch (error) {
        console.error('Error filtering sources:', error);
        this.error = 'Failed to load articles. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
     checkLocalStorage() {
    const storedSources = localStorage.getItem('selectedSources');
    alert(`Selected Sources: ${storedSources}`);
  },
  clearLocalStorage() {
    localStorage.removeItem('selectedSources');
    alert('Local storage cleared!');
  }
  },
};
</script>
