<template>
    <div class="bg-[var(--background)] min-h-screen font-sans flex flex-col">
        <Header :current-date-time="currentDateTime" />
        
        <main class="main-content flex-grow">
            <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
                <div class="single-stream-container max-w-[90%] mx-auto">
                    <StreamContainer 
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
import { useRoute } from 'vue-router'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import StreamContainer from './common/StreamContainer.vue'
import { streamUrls, streamDescriptions, formatDateTime, findCurrentEvent } from '../utils/streamUtils'

const route = useRoute()
const streamId = computed(() => parseInt(route.params.id) - 1)

const stream = ref({
    embedUrl: streamUrls[streamId.value],
    description: streamDescriptions[streamId.value],
    currentTitle: "Chargement..."
})

const currentTime = ref(new Date())
let timer

const currentDateTime = computed(() => formatDateTime(currentTime.value))

const updateStreamTitle = () => {
    const currentEvent = findCurrentEvent(currentTime.value, streamId.value)
    if (currentEvent && currentEvent.evenement) {
        stream.value.currentTitle = currentEvent.evenement
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
    margin: 1rem auto 3rem auto;
}

:root {
    --header-height: 120px;
    --footer-height: 100px;
}
</style>