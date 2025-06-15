import { ref } from 'vue';

export default function useGameState() {
  const health = ref(10);
  const mana = ref(10);

  const increment = (type: 'health' | 'mana') => {
    if (type === 'health') {
      health.value++;
    } else if (type === 'mana') {
      mana.value++;
    }
  };

  const decrement = (type: 'health' | 'mana') => {
    if (type === 'health' && health.value > 0) {
      health.value--;
    } else if (type === 'mana' && mana.value > 0) {
      mana.value--;
    }
  };

  return { health, mana, increment, decrement };
}