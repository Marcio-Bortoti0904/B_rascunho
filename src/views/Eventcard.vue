<template>

  <article class="evento">

    <img
      :src="evento.imagem"
      :alt="evento.titulo"
    >

    <div class="informacoes">

      <span class="categoria">
        {{ evento.categoria }}
      </span>

      <h3>
        {{ evento.titulo }}
      </h3>

      <p class="data">
        {{ evento.data }}
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


<style scoped>

.evento {
  flex: 0 0 260px;

  background: #0D1117;

  border: 1px solid #1F2937;

  border-radius: 14px;

  overflow: hidden;
}


.evento img {
  width: 100%;

  height: 160px;

  object-fit: cover;

  display: block;
}


.informacoes {
  padding: 14px;
}


.categoria {
  color: #FFD600;

  font-size: 11px;

  font-weight: 700;

  text-transform: uppercase;
}


.informacoes h3 {
  margin: 6px 0;

  color: white;

  font-size: 16px;
}


.data {
  margin: 0 0 8px;

  color: #D1D5DB;

  font-size: 12px;

  font-weight: 600;
}


.descricao {
  margin: 0;

  color: #9CA3AF;

  font-size: 13px;

  line-height: 1.4;
}

</style>