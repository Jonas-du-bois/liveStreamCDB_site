<template>
  <div class="bg-[var(--background)] min-h-screen font-sans">
    <Header :current-date-time="currentDateTime" />

    <main class="main-content">
      <div class="container mx-auto px-6 md:px-8 lg:px-12">
        <h1 class="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">
          Résultats en Direct
        </h1>
        
        <div class="score-buttons-grid">
          <ScoreButton
            v-for="(score, index) in scoreCategories"
            :key="index"
            :title="score.title"
            :url="score.url"
          />
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import ScoreButton from './layout/ScoreButton.vue'

const currentDateTime = computed(() => {
  const now = new Date()
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  }
  return now.toLocaleDateString('fr-FR', options)
})

const scoreCategories = [
  {
    title: 'Saut',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=1&catSocId=1'
  },
  {
    title: 'Gymnastique sans engin à main',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=3;4;5&catSocId=1'
  },
  {
    title: 'Sol',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=6&catSocId=1'
  },
  {
    title: 'Anneaux balançants',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=7&catSocId=1'
  },
  {
    title: 'Gymnastique avec engin à main',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=9;10;11&catSocId=1'
  },
  {
    title: 'Barre asymétrique scolaires',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=12&catSocId=1'
  },
  {
    title: 'Barre fixe',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=13&catSocId=1'
  },
  {
    title: 'Combinaison d\'engins',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=14&catSocId=1'
  },
  {
    title: 'Barres parallèles',
    url: 'https://aubep-srv-app37.aubeperp.ch:8443/cdb/JSP/resultat.jsp?catId=15&catSocId=1'
  }
]
</script>

<style scoped>
.main-content {
  padding: 2rem 1rem;
  min-height: calc(100vh - 160px);
}

.score-buttons-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .score-buttons-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .score-buttons-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .main-content {
    padding: 3rem 2rem;
  }
}
</style>