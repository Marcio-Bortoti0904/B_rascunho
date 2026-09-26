<template>
<div class="app"> 
  <Header /> 
  <div class="estrutura"> 
    <Menu /> 
    <main class="conteudo"> 
      <RouterView /> 
    </main> 
  </div> 
  </div> 
</template> 
<script setup> 
import Header from '/src/views/Header.vue' 
import Menu from '/src/views/Menu.vue' 
</script> 
<style> 
* { 
  box-sizing: border-box; 
} 
html, 
body, 
#app { 
  margin: 0; 
  padding: 0; 
  width: 100%; 
  min-height: 100%; 
} 
body { 
  margin: 0; 
  background: #090C10; 
  color: white; 
  font-family: Arial, Helvetica, sans-serif; 
} 
.app { 
  width: 100%; 
  min-height: 100vh; 
  background: #090C10; 
}
.estrutura { 
  display: flex;
  width: 100%;
  min-height: calc(100vh - 40px); 
} 
.conteudo { 
  flex: 1; 
  min-width: 0; 
  min-height: calc(100vh - 60px); 
  background: #090C10; 
  overflow-y: auto; 
} 
</style>