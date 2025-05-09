<template>
    <header class="shadow-md sticky top-0 z-50 blur-lg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
            <div class="header-content flex justify-between items-center py-2 px-4 sm:px-6"> 
                <div class="logo flex items-center gap-2">
                    <router-link to="/" class="flex items-center gap-2 no-underline">
                        <img src="../../assets/logo.png" alt="Logo" class="w-1 h-1" />
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

                <div class="date-time text-[var(--text-secondary)] text-sm px-2 hidden md:block">
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
    { description: "Salle de Léon Michaud - 1" },
    { description: "Salle de Léon Michaud - 2" }
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

img {
    padding: 1rem;
    height: 80px;
}
div.burger-icon {
    margin-right: 10px;
}

header {
    /* background: linear-gradient(88deg, #242846 -2.43%, #0A1144 60.6%, #0018BF 104.58%); */
    /* background-color: var(--surface); */
    padding: 0.5rem 0;

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
    background: linear-gradient(88deg, var(--surface) -2.43%, #0A1144 60.6%, var(--surface) 104.58%);
    border-radius: 30px;
    /* background-color: var(--surface); */
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