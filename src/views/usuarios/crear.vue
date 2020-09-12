<template>
  <usuario-detalle :is-edit="false" />
</template>

<script>
import UsuarioDetalle from './components/UsuarioDetalle'

export default {
  name: 'CrearUsuario',
  components: { UsuarioDetalle }
}
</script>
