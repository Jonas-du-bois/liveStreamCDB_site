<template>
  <div class="stream-card">
    <div class="video-container">
      <div class="live-badge">
        EN DIRECT
        <span class="pulse"></span>
      </div>
      <iframe
        :src="props.embedUrl"
        allowfullscreen
      ></iframe>
    </div>
    <div class="stream-info">
      <h2 class="stream-title">
        {{ props.title }}
      </h2>
      <p class="stream-description">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  embedUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.stream-card {
  background-color: #0f172a;
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
</style>