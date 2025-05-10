<template>
  <a :href="props.url" 
     target="_blank" 
     class="score-button">
    {{ props.title }}
  </a>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.score-button {
  display: block;
  background: linear-gradient(88deg, var(--surface) -2.43%, #0A1144 60.6%, var(--surface) 104.58%);
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid var(--border);
  text-align: center;
  font-weight: 500;
  width: 100%;
}

.score-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-light);
}

.score-button:active {
  transform: translateY(0);
}
</style>