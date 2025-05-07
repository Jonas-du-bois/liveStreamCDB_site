<template>
    <footer class="footer">
        <div class="container mx-auto px-4">
            <div class="footer-content flex flex-col items-center gap-4">
                <p class="text-[var(--text-secondary)] text-sm">
                    © 2025 Coupe des Bains - Tous droits réservés
                </p>
                <div class="footer-links flex gap-2">
                    <a href="https://agy.ch/cdb/" class="text-[var(--secondary)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Accueil</a>
                    <a href="https://agy.ch/cdb/competition/" class="text-[var(--secondary)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Programme</a>
                    <a href="https://agy.ch/cdb/resultats/" class="text-[var(--secondary)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Résultats</a>
                    <a href="https://agy.ch/cdb/nous-contacter/" class="text-[var(--secondary)] text-sm hover:text-[var(--primary)] transition-colors duration-200 hover:underline">Contact</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: var(--surface);
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
    margin-top: auto;
}

.container {
    max-width: 1200px;
}

.footer-links {
    display: flex;
    gap: 1.5rem;
}

@media (min-width: 1024px) {
    .footer {
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 40;
    }
}
</style>