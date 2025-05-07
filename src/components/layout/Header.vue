<template>
    <header class="bg-[var(--surface)] shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-12 py-16">
            <div class="header-content flex justify-between items-center py-12 px-4 sm:px-6"> 
                <div class="logo flex items-center gap-2 p-6">
                    <router-link to="/" class="flex items-center gap-2 no-underline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 h-8 fill-[var(--primary-light)]">
                            <path d="M9 10v8l7-4zm12-4h-4.18C16.4 3.39 14.38 2 12 2c-2.38 0-4.4 1.39-4.82 3H3v14h18V6zm-6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
                        </svg>
                        <h1 class="text-2xl font-bold logo-text">
                            <span class="text-white">CDB</span>
                            <span class="text-[var(--secondary)]">stream</span>
                        </h1>
                    </router-link>
                </div>
                
                <!-- Burger Menu Button -->
                <div class="burger-menu md:hidden" @click="toggleMenu">
                    <div class="burger-icon" :class="{ 'open': isMenuOpen }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="hidden md:flex items-center gap-6">
                    <router-link 
                        to="/"
                        class="nav-link font-bold"
                    >
                        Tous les streams
                    </router-link>
                    <router-link 
                        v-for="(stream, index) in streams" 
                        :key="index"
                        :to="'/stream/' + (index + 1)"
                        class="nav-link"
                    >
                        {{ stream.description }}
                    </router-link>
                </nav>

                <div class="date-time text-[var(--text-secondary)] text-sm px-2">
                    {{ currentDateTime }}
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="mobile-menu md:hidden" :class="{ 'show': isMenuOpen }">
                <router-link 
                    to="/"
                    class="mobile-nav-link font-bold"
                    @click="closeMenu"
                >
                    Tous les streams
                </router-link>
                <router-link 
                    v-for="(stream, index) in streams" 
                    :key="index"
                    :to="'/stream/' + (index + 1)"
                    class="mobile-nav-link"
                    @click="closeMenu"
                >
                    {{ stream.description }}
                </router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    currentDateTime: {
        type: String,
        required: true
    }
})

const streams = [
    { description: "Salle des Isles - 1" },
    { description: "Salle des Isles - 2" },
    { description: "Salle des Isles - 3" },
    { description: "Salle de Léon Michaud" }
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}
</script>

<style scoped>
.header {
    background-color: var(--surface);
    padding: 2rem 0;
    border-bottom: 1px solid var(--border);
}
.container {
    max-width: 1200px;
}

h1 {
    padding: 1rem
}

.nav-link {
    color: var(--text-primary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background-color: var(--primary-light);
    color: var(--on-primary);
}

.burger-icon {
    width: 30px;
    height: 20px;
    position: relative;
    cursor: pointer;
}

.burger-icon span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--text-primary);
    border-radius: 9px;
    transform-origin: center;
    transition: .25s ease-in-out;
}

.burger-icon span:nth-child(1) { top: 0px; }
.burger-icon span:nth-child(2) { top: 9px; }
.burger-icon span:nth-child(3) { top: 18px; }

.burger-icon.open span:nth-child(1) {
    transform: rotate(45deg);
    top: 9px;
}

.burger-icon.open span:nth-child(2) {
    opacity: 0;
}

.burger-icon.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 9px;
}

.mobile-menu {
    display: none;
    background-color: var(--surface);
    padding: 1rem;
}

.mobile-menu.show {
    display: block;
}

.mobile-nav-link {
    display: block;
    padding: 1rem;
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--border);
}

.mobile-nav-link:last-child {
    border-bottom: none;
}

.logo-text {
    padding: 1rem;
}

.logo a {
    text-decoration: none;
    color: inherit;
}

/* Supprime l'apparence de lien au survol */
.logo a:hover {
    text-decoration: none;
    color: inherit;
}

/* Supprime la couleur bleue par défaut des liens */
.logo a:visited {
    color: inherit;
}
</style>