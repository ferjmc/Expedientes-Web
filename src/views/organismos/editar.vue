<template>
  <organismos-detalle :is-edit="true" />
</template>

<script>
import OrganismosDetalle from './components/OrganismosDetalle'

export default {
  name: 'EditarOrganismo',
  components: { OrganismosDetalle }
}
</script>
