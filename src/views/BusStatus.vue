<template>
  <div class="bus-status">

    <div>
      <strong>Linha {{ linha }}</strong>
      <span>{{ destino }}</span>
    </div>

    <div class="tempo">
      {{ tempo }} min
    </div>

  </div>
</template>

<script setup>
defineProps({
  linha: String,
  destino: String,
  tempo: Number
})
</script>