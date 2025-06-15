<script setup lang="ts">
import {ref} from 'vue'
import useGameState from './store/useGameState';
import RulesPanel from './components/RulesPanel.vue';
import StatPanel  from './components/StatPanel.vue';
import heartIcon from './assets/heart.png'
import manaIcon from './assets/mana.png'
import './assets/global.css';

const { health, mana, increment, decrement } = useGameState();
const showRules = ref(false);

function openRulesPanel() {
  showRules.value = true;
}

function closeRulesPanel() {
  showRules.value = false;
}
</script>


<template>
  <div class="split-container">
    <StatPanel
    type="health"
    :value="health"
    :icon="heartIcon"
    @increment="increment('health')"
    @decrement="decrement('health')"
    ></StatPanel>
    <StatPanel
    type="mana"
      :value="mana"
      :icon="manaIcon"
      @increment="increment('mana')"
      @decrement="decrement('mana')"
    ></StatPanel>
  </div>
  <button 
    class="rules-button" 
    @click="openRulesPanel"
    v-if="!showRules" 
  >?</button>
  <transition name="fade">
    <RulesPanel 
      v-if="showRules"
      @close="closeRulesPanel">
    </RulesPanel>
  </transition>
</template>

<style scoped>
.split-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.split-container > * {
  flex: 1; /* Ensures both panels take up 50% */
  min-width: 0;
}

.rules-button {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 1rem;
  right: 1rem;
  background-color: #8d97a3;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.rules-button:hover {
  background: #eee;
  transform: scale(1.1);
}

/*default opacity is 1, so no need to define enter-to and leave-from*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>