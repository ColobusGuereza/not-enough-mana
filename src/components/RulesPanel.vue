<template>
    <div class="rules-panel">
        <h1>Game Rules</h1>
        <button class="close-button" @click="$emit('close')">X</button>
        
        <!-- Main Rules Dropdown -->
        <div class="dropdown">
            <h2 @click="toggleMainRules" class="dropdown-header">
                <span class="dropdown-icon">{{ showMainRules ? '🔽 ' : '▶️' }}</span>
                Main Rules
            </h2>
            <transition
                name="dropdown"
                enter-active-class="slide-down"
                leave-active-class="slide-up"
            >
                <ul v-if="showMainRules" class="dropdown-content">
                    <li>Each player starts with 10♥️ and 10💧.</li>
                    <li>Each player, on their turn, draws cards until they have 5 on their hand.</li>
                    <li>You can play as many cards as you want, as long as you have enough 💧.</li>
                    <li>1 sip restores +1💧</li>
                    <li>Players may restore 💧 at any time, even outside of their turn.</li>
                </ul>
            </transition>
        </div>
        
        <!--Cards Dropdown-->
        <div class="dropdown">
            <h2 @click="toggleCards" class="dropdown-header">
                <span class="dropdown-icon">{{ showCards ? '🔽 ' : '▶️' }}</span>
                Cards
            </h2>
            <transition
                name="dropdown"
                enter-active-class="slide-down"
                leave-active-class="slide-up"
            >
                <!-- Suits Tabs -->
                <div v-if="showCards" class="tabs">
                    <button
                        v-for="tab in tabs"
                        :key="tab"
                        :class="{ active: activeTab === tab }"
                        @click="activeTab = tab"
                    >
                        {{ tab }}
                    </button>
                    <div>
                        <table>
                            <thead>
                                <tr class="bg-gray-200">
                                    <th>Card</th>
                                    <th>Effect</th>
                                    <th>Cost of💧</th>
                                    <th>Required Discard</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(card, index) in filteredCards" 
                                    :key="index"
                                    :class="{'joker': card.suit === '🃏', 'spade': card.suit === '♠️', 'club': card.suit === '♣️', 'diamond': card.suit === '♦️', 'heart': card.suit === '♥️'}"
                                >
                                    <td><strong>{{ card.value }}</strong></td>
                                    <td>{{ card.effect }}</td>
                                    <td>{{ card.cost || '—' }}</td>
                                    <td>{{ card.discard || '—' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, effect } from 'vue';
const activeTab = ref('♠️');

const showMainRules = ref(true);
const showCards = ref(false);

const toggleMainRules = () => {
    showMainRules.value = !showMainRules.value;
};

const toggleCards = () => {
    showCards.value = !showCards.value;
};

const cards = [
    { suit: '♠️', value: '2-6', effect: 'Target loses 1♥️.', cost: 1 },
    { suit: '♠️', value: '7-10', effect: 'Target loses 2♥️.', cost: 1, discard: '1 card of ♠️' },
    { suit: '♠️', value: 'J', effect: 'Target loses 2♥️. Adjacent players lose 1 ♥️.', cost: 2, discard: '1 card of ♠️' },
    { suit: '♣️', value: '2-6', effect: 'Target loses 1♥️ and discards 1 card.', cost: 2 },
    { suit: '♣️', value: '7-10', effect: 'Target and adjacent players lose 1♥️ and discard 1 card.', cost: 2, discard: '1 card of ♣️' },
    { suit: '♣️', value: 'J', effect: 'Target skips their next turn.', cost: 3, discard: '1 card of ♣️' },
    { suit: '♦️', value: '2-10', effect: 'Target loses 2♥️. Target can play another card of this type to increase damage and redirect it to another player.', cost: 2 },
    { suit: '♦️', value: 'J', effect: 'Target loses 2♥️ and can\'t play offensive cards in their next turn.', cost: 2, discard: '1 card of ♦️' },
    { suit: '♥️', value: '2-6', effect: 'Target loses 1♥️.', cost: 2 },
    { suit: '♥️', value: '7-10', effect: 'Target loses 2♥️.', cost: 4 },
    { suit: '♥️', value: 'J', effect: 'Target cannot be affected until their next turn.', cost: 3 },
    { suit: '🃏', value: 'Q', effect: 'Prevents up to 2 damage. Can be played at any moment.', cost: 2 },
    { suit: '🃏', value: 'K', effect: 'Player creates a rule that lasts until the game ends. Whoever breaks the rule, loses 1💧.' },
    { suit: '🃏', value: 'A (♠️ ♣️ ♦️)', effect: 'Attack cards of this suit cost +1💧 and cause +1 damage until next Ace is played.' },
    { suit: '🃏', value: 'A (♥️)', effect: 'Players ignore damage taken. Instead, they lose the same amount of 💧 until next Ace is played.' },
    { suit: '🃏', value: 'Joker', effect: 'Cancels any action (except an Ace). Can be played at any time.', cost: 3, discard: '1 card of any suite' }
];

const tabs = computed(() => {
  const suits = cards.map(card => card.suit);
  const set = new Set(suits);
  set.add('🃏');
  return [...set];
});

const filteredCards = computed(() => {
    return cards.filter(card => card.suit === activeTab.value);
});

</script>

<style scoped>
@import '../assets/rulesPanel.css';
</style>