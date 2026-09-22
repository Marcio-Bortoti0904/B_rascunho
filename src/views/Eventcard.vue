<template>

  <article class="evento-card">

    <img
      :src="evento.imagem"
      :alt="evento.titulo"
    >

    <div class="conteudo">

      <span class="categoria">
        {{ evento.categoria }}
      </span>

      <h3>
        {{ evento.titulo }}
      </h3>

      <p class="data">
        📅 {{ evento.data }}
      </p>

      <p class="descricao">
        {{ evento.descricao }}
      </p>

    </div>

  </article>

</template>

<script setup>

defineProps({
  evento: {
    type: Object,
    required: true
  }
})

</script>