<template>
    <div class="bg-[var(--background)] min-h-screen font-sans flex flex-col">
        <Header :current-date-time="currentDateTime" />
        
        <main class="main-content flex-grow">
            <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
                <div class="single-stream-container max-w-[90%] mx-auto">
                    <div class="video-wrapper">
                        <div class="video-container">
                            <div class="live-badge">
                                EN DIRECT
                                <span class="pulse"></span>
                            </div>
                            <iframe
                                :src="stream.embedUrl"
                                allowfullscreen
                                class="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                    <div class="stream-info">
                        <h1 class="stream-title">
                            {{ stream.currentTitle }}
                        </h1>
                        <p class="stream-description">
                            {{ stream.description }}
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import scheduleData from '../data/schedule.json'

const route = useRoute()
const streamId = computed(() => parseInt(route.params.id) - 1)

const streamUrls = [
    "https://player.infomaniak.com?channel=PR99617043325684504&player=12679",
    "https://player.infomaniak.com?channel=RG99617043325684505&player=12678",
    "https://player.infomaniak.com?channel=GM99617043325684506&player=12680",
    "https://player.infomaniak.com?channel=SA99617043325684507&player=12681"
]

const streamDescriptions = [
    "Salle des Isles - 1",
    "Salle des Isles - 2",
    "Salle des Isles - 3",
    "Salle de Léon Michaud"
]

const stream = ref({
    embedUrl: streamUrls[streamId.value],
    description: streamDescriptions[streamId.value],
    currentTitle: "Chargement..."
})

const currentTime = ref(new Date())
let timer

const currentDateTime = computed(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return currentTime.value.toLocaleDateString('fr-FR', options)
})

const updateStreamTitle = () => {
    const now = currentTime.value
    let currentEvent = null

    for (const event of scheduleData.schedule) {
        const [startHour, startMinute] = event.start.split(':').map(Number)
        const [endHour, endMinute] = event.end.split(':').map(Number)
        const startDate = new Date(now)
        const endDate = new Date(now)
        startDate.setHours(startHour, startMinute, 0)
        endDate.setHours(endHour, endMinute, 0)
        
        if (now >= startDate && now <= endDate) {
            currentEvent = event
            break
        }
    }

    if (currentEvent && currentEvent.titles[streamId.value]) {
        stream.value.currentTitle = currentEvent.titles[streamId.value]
    } else {
        stream.value.currentTitle = "Aucun événement en cours"
    }
}

onMounted(() => {
    updateStreamTitle()
    timer = setInterval(() => {
        currentTime.value = new Date()
        updateStreamTitle()
    }, 60000)
})

onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>

<style scoped>
.main-content {
    padding: 1.5rem 0;
    margin-bottom: 2rem;
}

.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
}

.single-stream-container {
    background-color: var(--surface);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border);
    margin: 1rem auto 3rem auto;
}

.video-wrapper {
    position: relative;
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
    right: 1rem;
    background-color: var(--error);
    color: var(--on-error);
    font-size: 0.875rem;
    font-weight: bold;
    padding: 0.35rem 0.75rem;
    border-radius: 2rem;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    padding: 2rem;
    background-color: var(--surface-variant);
}

.stream-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.stream-description {
    font-size: 1rem;
    color: var(--text-secondary);
}

:root {
    --header-height: 120px;
    --footer-height: 100px;
}
</style>