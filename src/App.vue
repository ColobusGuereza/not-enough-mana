<script setup lang="ts">
import {ref} from 'vue'

const health = ref(10);
const mana = ref(10);
const increment = (type: 'health' | 'mana') => {
  if (type === 'health' && health.value < 10) {
    health.value++;
  } else if (type === 'mana' && mana.value < 10) {
    mana.value++;
  }
};
const decrement = (type: 'health' | 'mana') => {
  if (type === 'health') {
    if (health.value > 0) health.value--;
  } else {
    if (mana.value > 0) mana.value--;
  }
};
</script>

<template>
  <div class="split-container">
    <div class="panel health-panel">
      <img src="./assets/heart.png" class="icon health" alt="Health icon" />
      <button class="plus" @click="increment('health')">+</button>
      <div class="number"> {{ health }} </div>
      <button class="minus" @click="decrement('health')">-</button>
    </div>
    <div class="panel mana-panel">
      <img src="./assets/mana.png" class="icon mana" alt="Mana icon" />
      <button class="plus" @click="increment('mana')">+</button>
      <div class="number"> {{ mana }} </div>
      <button class="minus" @click="decrement('mana')">-</button>
    </div>
  </div>
</template>

<style scoped>
.split-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 2em 0;
}

.health-panel {
  background: linear-gradient(to bottom, #ffb6c1, #ff4d4d); /* rose to red */
}

.mana-panel {
  background: linear-gradient(to bottom, #b3e0ff, #298893); /* light blue to blue */
}

.icon {
  height: 6em;
  width: 6em;
  margin-top: 1em;
  object-fit: contain;
}

.icon.health:hover {
  filter: drop-shadow(0 0 2em #ff4d4daa);
}

.icon.mana:hover {
  filter: drop-shadow(0 0 2em #298893aa);
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
}


.plus:hover, .minus:hover {
  background: #eee;
}

</style>
