
<template>
  <div>
    <button @click="toggleDropdown" class="menu-button">☰</button>
    <div v-if="dropdownVisible" class="dropdown">
      <h3>Select Sources</h3>
      <ul>
        <li v-for="source in sources" :key="source.id">
          <label>
            <input type="checkbox" :value="source.id" v-model="selectedSources" />
            {{ source.name }}
          </label>
        </li>
      </ul>
      <button @click="applyFilter">Filter</button>
    </div>
  </div>
</template>

<script>
import { saveToStorage, getFromStorage } from '@/utils/storage';

export default {
  name: 'SourceSelector',
  props: {
    sources: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dropdownVisible: false,
      selectedSources: getFromStorage('selectedSources', []),
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
   applyFilter() {
  console.log('Saving selected sources:', this.selectedSources);
  saveToStorage('selectedSources', this.selectedSources);
  this.$emit('filterApplied', this.selectedSources);
  this.dropdownVisible = false;
}

  },
};
</script>

<style scoped>
.menu-button {
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 40px;
  left: 10px;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
}
</style>