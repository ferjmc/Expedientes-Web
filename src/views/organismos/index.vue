<template>
  <div class="app-container">
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ data.codigo }}</span>
        <span>{{ data.nombre }}</span>
        <span>
          <router-link :to="'/organismos/crear/'+data.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">
              Agregar Dependencia
            </el-button>
          </router-link>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>

</template>

<script>

export default {
  data() {
    const data = [{
      id: 1,
      codigo: 1,
      nombre: '',
      children: [],
      createdAt: '',
      createdBy: 1,
      updatedAt: '',
      updatedBy: 1
    }]
    return {
      data
    }
  },

  computed: {
    treeData() {
      return this.$store.getters.organizaciones
    }
  },

  created() {
    this.$store
      .dispatch('organizaciones/getOrganizaciones')
      .then(
      )
      .catch(() => {
      })
      // this.getList();
  },
  methods: {
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
