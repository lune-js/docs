<template>
  <button type="button" class="NavBarAskAiButton">
    <span class="vpi-sparkles" aria-hidden="true"></span>
  </button>
</template>

<style scoped>
.NavBarAskAiButton {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  font-size: 20px;
}

@media (min-width: 768px) {
  .NavBarAskAiButton {
    height: auto;
    padding: 11.5px;
    transition: color 0.3s ease;
    background-color: var(--vp-c-bg-alt);
    border-radius: 8px;
    font-size: 15px;
    color: var(--vp-c-text-2);
  }

  .NavBarAskAiButton:hover {
    color: var(--vp-c-brand-1);
  }
}
</style>
