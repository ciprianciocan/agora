<template>
  <div id="app">
    <h1>AgorA</h1>
    <RssFeed />
  </div>
</template>

<script>
import './assets/styles.css';
import RssFeed from './components/RssFeed.vue';

export default {
  name: 'App',
  components: {
    RssFeed,
  },
};
</script>
