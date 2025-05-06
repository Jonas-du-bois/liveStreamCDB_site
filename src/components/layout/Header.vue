<template>
    <header class="bg-[var(--surface)] shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-12 py-12">
            <div class="header-content flex justify-between items-center py-6 px-6">
                <div class="logo flex items-center gap-2 p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 h-8 fill-[var(--primary-light)]">
                        <path d="M9 10v8l7-4zm12-4h-4.18C16.4 3.39 14.38 2 12 2c-2.38 0-4.4 1.39-4.82 3H3v14h18V6zm-6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
                    </svg>
                    <h1 class="text-2xl font-bold">
                        <span class="cyan-500">CDB</span>
                        <span class="text-[var(--secondary)]">stream</span>
                    </h1>
                </div>
                <div class="date-time text-[var(--text-secondary)] text-sm">
                    {{ currentDateTime }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    currentDateTime: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>