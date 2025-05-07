<template class="px-4 py-2">
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'CDB Stream - Live'
  // Mise à jour des métadonnées
  const meta = document.createElement('meta')
  meta.name = 'description'
  meta.content = 'Streaming en direct des événements CDB - Retransmission multi-caméras des compétitions'
  document.head.appendChild(meta)

  // Mise à jour de la langue du document
  document.documentElement.lang = 'fr'

  // Ajout de la meta viewport si elle n'existe pas déjà
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta')
    viewport.name = 'viewport'
    viewport.content = 'width=device-width, initial-scale=1.0'
    document.head.appendChild(viewport)
  }
})
</script>

<style>
/* Import des styles globaux */
@import './assets/main.css';
@import './assets/base.css';
</style>