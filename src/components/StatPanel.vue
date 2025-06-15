<template>
  <div class="panel" :class="`${type}-panel`">
      <img :src="props.icon" class="icon" :class="`${props.type}`"/>
      <button class="plus" @click="() => handleClick('increment')">+</button>
      <div class="number"> {{ props.value }} </div>
      <button class="minus" @click="() => handleClick('decrement')">-</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  type: String, // 'health' or 'mana'
  value: Number,
  icon: String,
});

const emit = defineEmits(['increment', 'decrement']);

const isLocked = ref(false);

// Utility function to detect if the screen is mobile or tablet
function isTouchDevice() {
  return window.matchMedia('(max-width: 1023px)').matches;
}

function handleClick(type: 'increment' | 'decrement') {
  if (!isTouchDevice()){
    emit(type)
    return;
  }
  if (isLocked.value) return;
  isLocked.value = true;

  emit(type);

  setTimeout(() => {
    isLocked.value = false;
  }, 100);
}
</script>

<style scoped>
.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 4em 0;
  min-width: 0;
}

.health-panel {
  background: linear-gradient(to bottom, #FFB6C1, #FF4D4D); /* rose to red */
}

.mana-panel {
  background: linear-gradient(to bottom, #B3E0FF, #298893); /* light blue to blue */
}

.number {
  font-size: 4em;
  font-weight: bold;
  color: #222;
  margin: 1em 0;
  text-align: center;
}

.plus, .minus {
  font-size: 2em;
  width: 2.5em;
  height: 2.5em;
  border: none;
  border-radius: 20%;
  background: #fff;
  color: #222;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
}

.plus:hover, .minus:hover {
  background: #eee;
}

.icon {
  height: 6em;
  width: 6em;
  margin-top: 1em;
  margin-bottom: 1.5em;
  object-fit: contain;
}

.icon.health:hover {
  filter: drop-shadow(0 0 2em #ff4d4daa);
}

.icon.mana:hover {
  filter: drop-shadow(0 0 2em #298893aa);
}
</style>