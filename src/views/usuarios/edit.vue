<template>
  <usuario-detalle :is-edit="true" />
</template>

<script>
import UsuarioDetalle from './components/UsuarioDetalle'

export default {
  name: 'EditForm',
  components: { UsuarioDetalle }
}
</script>
