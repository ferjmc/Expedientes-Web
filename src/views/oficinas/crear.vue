<template>
  <oficinas-detalle :is-edit="false" />
</template>

<script>
import OficinasDetalle from './components/OficinasDetalle'

export default {
  name: 'CrearOficina',
  components: { OficinasDetalle }
}
</script>
