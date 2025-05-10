<template>
  <router-link to="/scores" class="animated-score-button">
    <span class="button-content">
      Accéder aux Scores Live
      <span class="arrow">→</span>
    </span>
  </router-link>
</template>

<style scoped>
.animated-score-button {
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, 
    var(--surface) 0%,
    #0A1144 30%,
    var(--primary) 50%,
    #0A1144 70%,
    var(--surface) 100%
  );
  background-size: 200% 100%;
  animation: gradientMove 3s linear infinite;
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.animated-score-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.animated-score-button:active {
  transform: translateY(0);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.arrow {
  transition: transform 0.3s ease;
}

.animated-score-button:hover .arrow {
  transform: translateX(5px);
}

@keyframes gradientMove {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>