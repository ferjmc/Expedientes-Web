<template>
  <organismos-detalle :is-edit="false" />
</template>

<script>
import OrganismosDetalle from './components/OrganismosDetalle'

export default {
  name: 'CrearOrganismo',
  components: { OrganismosDetalle }
}
</script>
