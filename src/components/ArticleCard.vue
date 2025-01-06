<template>
  <li class="article">
    <a :href="article.link" target="_blank" class="title-and-image-link">
      <img v-if="article.image" :src="article.image" alt="Article Image" class="article-image" />
      <h3>{{ article.title }}</h3>
    </a>

    <!-- Source Tag and Publication Date -->
    <div class="article-meta">
      <span class="source-tag">{{ article.source }}</span>
      <span class="publication-date">{{ article.date }}</span>
    </div>

    <p class="article-description">{{ article.description }}</p>
  </li>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.article {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.article:hover {
  background-color: #f9f9f9;
}

.title-and-image-link {
  text-decoration: none;
  color: inherit;
}

.article-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
}

.article-description {
  font-size: 0.95rem;
  color: #555;
}

/* Style for the source tag */
.source-tag {
  display: inline-block;
  background-color: #007bff;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 10px;
}


.article-meta {
  display: flex;
  gap: 10px;
  margin: 5px 0;
  font-size: 0.85rem;
  color: #777;
}

.publication-date {
  font-style: italic;
}

</style>
