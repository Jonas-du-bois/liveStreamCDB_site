<template>
    <footer class="footer">
        <div class="container mx-auto px-8">
            <div class="footer-content flex flex-col items-center gap-4">
                <p class="text-[var(--text-secondary)] text-sm">
                    © 2025 GymnaStream - Tous droits réservés
                </p>
                <div class="footer-links flex gap-2">
                    <a href="#" class="text-[var(--primary-light)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Accueil</a>
                    <a href="#" class="text-[var(--primary-light)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Programme</a>
                    <a href="#" class="text-[var(--primary-light)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Résultats</a>
                    <a href="#" class="text-[var(--primary-light)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Contact</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: var(--surface);
    padding: 2rem 0;
    border-top: 1px solid var(--border);
}

.container {
    max-width: 1200px;
}

@media (min-width: 1024px) {
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 40;
    }
}
</style>