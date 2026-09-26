<template>
  <section class="pagina">
    <div class="cabecalho">
      <h1>Histórico</h1>
      <p>Veja suas pesquisas e destinos recentes.</p>
    </div>

    <div class="historico-vazio">
      <span>🕘</span>
      <h2>Nenhuma atividade recente</h2>
      <p>
        Quando você pesquisar destinos, eles aparecerão aqui.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pagina {
  padding: 30px;
}

.cabecalho h1 {
  margin: 0;
  font-size: 28px;
}

.cabecalho p {
  color: #9CA3AF;
}

.historico-vazio {
  margin-top: 30px;
  padding: 50px 20px;

  text-align: center;

  background: #0D1117;
  border: 1px solid #1F2937;
  border-radius: 16px;
}

.historico-vazio span {
  font-size: 40px;
}

.historico-vazio h2 {
  margin: 15px 0 5px;
}

.historico-vazio p {
  color: #9CA3AF;
}
</style>