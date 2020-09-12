<template>
  <caratula-detalle :is-edit="false" />
</template>

<script>
import CaratulaDetalle from './components/CaratulaDetalle'

export default {
  name: 'CrearExpediente',
  components: { CaratulaDetalle }
}
</script>
