<template>
  <div class="bg-[var(--background)] min-h-screen font-sans">
    <Header :current-date-time="currentDateTime" />

    <!-- Contenu principal avec padding ajusté -->
    <main class="main-content">
      <div class="container mx-auto px-6 md:px-8 lg:px-12">
        <div class="stream-grid">
          <div
            v-for="(stream, index) in streams"
            :key="index"
            class="stream-card"
          >
            <div class="video-container">
              <div class="live-badge">
                EN DIRECT
                <span class="pulse"></span>
              </div>
              <iframe
                :src="stream.embedUrl"
                allowfullscreen
              ></iframe>
            </div>
            <div class="stream-info">
              <h2 class="stream-title">
                {{ stream.currentTitle }}
              </h2>
              <p class="stream-description">
                {{ stream.description }}
              </p>
            </div>
          </div>
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
import scheduleData from '../data/schedule.json'

const schedule = scheduleData.schedule;

const streamDescriptions = [
  "Salle des Isles - 1",
  "Salle des Isles - 2",
  "Salle des Isles - 3",
  "Salle de Léon Michaud"
];

const streams = ref([
  { embedUrl: "https://player.infomaniak.com?channel=PR99617043325684504&player=12679", description: streamDescriptions[0], currentTitle: "Chargement..." },
  { embedUrl: "https://player.infomaniak.com?channel=RG99617043325684505&player=12678", description: streamDescriptions[1], currentTitle: "Chargement..." },
  { embedUrl: "https://player.infomaniak.com?channel=GM99617043325684506&player=12680", description: streamDescriptions[2], currentTitle: "Chargement..." },
  { embedUrl: "https://player.infomaniak.com?channel=SA99617043325684507&player=12681", description: streamDescriptions[3], currentTitle: "Chargement..." }
]);

const currentTime = ref(new Date());
let timer;

const currentDateTime = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return currentTime.value.toLocaleDateString('fr-FR', options);
});

const updateStreamTitles = () => {
  const now = currentTime.value;
  let currentEvent = null;

  for (const event of schedule) {
    const [startHour, startMinute] = event.start.split(':').map(Number);
    const [endHour, endMinute] = event.end.split(':').map(Number);
    const startDate = new Date(now);
    const endDate = new Date(now);
    startDate.setHours(startHour, startMinute, 0);
    endDate.setHours(endHour, endMinute, 0);
    if (now >= startDate && now <= endDate) {
      currentEvent = event;
      break;
    }
  }

  if (currentEvent) {
    streams.value.forEach((stream, index) => {
      if (index < currentEvent.titles.length) {
        stream.currentTitle = currentEvent.titles[index];
      } else {
        stream.currentTitle = "Aucun événement en cours";
      }
    });
  } else {
    streams.value.forEach(stream => {
      stream.currentTitle = "Aucun événement en cours";
    });
  }
};

onMounted(() => {
  updateStreamTitles();
  timer = setInterval(() => {
    currentTime.value = new Date();
    updateStreamTitles();
  }, 60000);
  currentTime.value = new Date();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.main-content {
  padding: 2rem;
  min-height: calc(100vh - 160px); /* Hauteur du header + footer */
}

@media (min-width: 1024px) {
  .main-content {
    padding: 2rem;
    padding-bottom: calc(3rem + 120px); /* Espace supplémentaire pour le footer fixe */
  }
}

.container {
  width: 100%;
  max-width: 1400px; /* Augmentation de la largeur maximale */
  margin: 0 auto;
}

.stream-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.stream-card {
  background-color: var(--surface);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border);
}

.stream-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.live-badge {
  position: absolute;
  top: 1rem;
  right: 1rem; /* Changé de left à right */
  background-color: var(--error);
  color: var(--on-error);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.35rem 0.75rem;
  border-radius: 2rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end; /* Ajouté pour aligner le contenu à droite */
}

.pulse {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ffffff;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

.stream-info {
  padding: 1.5rem;
}

.stream-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.stream-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Responsive */
@media (min-width: 640px) {
  .stream-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stream-title {
    font-size: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .stream-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  main {
    padding: 3rem 0;
  }
}
</style>