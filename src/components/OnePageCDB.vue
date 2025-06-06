<template>
  <div class="bg-[var(--background)] min-h-screen font-sans">
    <Header :current-date-time="currentDateTime" />

    <main class="main-content">
      <div class="container mx-auto px-6 md:px-8 lg:px-12">
        <!-- <div class="score-button-container">
          <AnimatedScoreButton />
        </div> -->
        <div class="stream-grid">
          <StreamContainer
            v-for="(stream, index) in streams"
            :key="index"
            :embed-url="stream.embedUrl"
            :title="stream.currentTitle"
            :description="stream.description"
          />
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import StreamContainer from './common/StreamContainer.vue'
import AnimatedScoreButton from './layout/AnimatedScoreButton.vue'
import { streamUrls, streamDescriptions, formatDateTime, findCurrentEvent } from '../utils/streamUtils'

const streams = ref(streamUrls.map((url, index) => ({
  embedUrl: url,
  description: streamDescriptions[index],
  currentTitle: "Chargement..."
})))

const currentTime = ref(new Date())
let timer

const currentDateTime = computed(() => formatDateTime(currentTime.value))

const updateStreamTitles = () => {
  streams.value.forEach((stream, index) => {
    const currentEvent = findCurrentEvent(currentTime.value, index) // Passer l'index du stream
    if (currentEvent && currentEvent.evenement) {
      stream.currentTitle = currentEvent.evenement
    } else {
      stream.currentTitle = "Aucun événement en cours"
    }
  })
}

onMounted(() => {
  updateStreamTitles()
  timer = setInterval(() => {
    currentTime.value = new Date()
    updateStreamTitles()
  }, 60000)
  currentTime.value = new Date()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.main-content {
  padding: 2rem;
  min-height: calc(100vh - 160px);
}

@media (min-width: 1024px) {
  .main-content {
    padding: 2rem;
    padding-bottom: calc(3rem + 120px);
  }
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.stream-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  max-width: 110%;
  padding: 0.1rem;
  margin: 0 auto;
  position: relative;
}

@media (min-width: 640px) {
  .stream-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .stream-grid:has(.stream-card:hover) .stream-card:not(:hover) {
    filter: blur(3px);
    transition: filter 0.3s ease;
  }

  .stream-card {
    transition: filter 0.3s ease;
  }
  
  .stream-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  main {
    padding: 3rem 0;
  }
}

.score-button-container {
  padding: 0.5rem 0 1rem 0;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .score-button-container {
    padding: 1.5rem 0 2.5rem 0;
  }
}

@media (min-width: 1024px) {
  .score-button-container {
    padding: 2rem 0 3rem 0;
  }
}
</style>