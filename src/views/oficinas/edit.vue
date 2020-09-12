<template>
  <oficinas-detalle :is-edit="true" />
</template>

<script>
import OficinasDetalle from './components/OficinasDetalle'

export default {
  name: 'EditarOficina',
  components: { OficinasDetalle }
}
</script>
