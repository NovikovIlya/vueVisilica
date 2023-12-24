<script setup lang="ts">
export type Props = {
  word:string;
  correctLetters:string[];
}

defineProps<Props>()

</script>

<template>
  <div class="word">
    <span v-for="(letter,index) in word" :key="index" class="letter" >
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
