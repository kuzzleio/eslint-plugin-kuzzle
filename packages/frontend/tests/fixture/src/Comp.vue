<script setup lang="ts">
import local from './local';
import { ref } from 'vue';

interface Props {
  go(): void;
}

const count = ref(0);
defineProps<Props>();
console.log(local, count);
</script>

<template>
  <div></div>
</template>
