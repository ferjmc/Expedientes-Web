<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.value"
        placeholder="Buscar"
        style="width: 200px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.key"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in keyOptions" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="handleFilter"
      >Buscar</el-button>
      <router-link :to="'/expedientes/crear'">
        <el-button class="filter-item boton__accion" type="primary" size="small" icon="el-icon-edit">Nuevo</el-button>
      </router-link>
      <el-button :disabled="disableCerrar" class="filter-item boton__accion" type="warning" size="small" icon="el-icon-close" @click="handleCerrar">Cerrar Expediente</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="caratulas"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
    >

      <el-table-column width="180px" align="center" label="Expediente">
        <template slot-scope="{row}">
          <el-tooltip content="Ver Pases" placement="top" effect="light">
            <router-link :to="'/expedientes/pases/'+row.id">
              <el-button type="primary" plain>{{ row.expediente }}</el-button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Fecha">
        <template slot-scope="scope">
          <span>{{ scope.row.fecha | parseTime('{d}-{m}-{y}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Estado">
        <template slot-scope="scope">
          <el-tag :type="scope.row.estado === 'RECHAZADO' ? 'danger' : 'success'">{{ scope.row.estado }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="65px" align="center" label="Folios">
        <template slot-scope="scope">
          <span>{{ scope.row.folios }}</span>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Organismo">
        <template slot-scope="scope">
          <span>{{ scope.row.codigo + ' - ' + scope.row.organismo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Extracto">
        <template slot-scope="scope">
          <span v-html="scope.row.extracto" />
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="totalElements>0"
      :total="totalElements"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'Expedientes',
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        key: null,
        value: null
      },
      currentRow: null,
      disableCerrar: true,
      keyOptions: [
        {
          key: 1,
          label: 'Código',
          value: 'id'
        },
        {
          key: 2,
          label: 'Expediente',
          value: 'expediente'
        },
        {
          key: 3,
          label: 'Fecha',
          value: 'fecha'
        },
        {
          key: 4,
          label: 'Estado',
          value: 'estado'
        },
        {
          key: 5,
          label: 'Folios',
          value: 'folios'
        },
        {
          key: 6,
          label: 'Organismo',
          value: 'organismo'
        },
        {
          key: 7,
          label: 'Extracto',
          value: 'extracto'
        }]
    }
  },
  mounted() {
    this.$store.dispatch('caratulas/fetchCaratulas', this.listQuery).then(() => {
      this.listLoading = false
    })
  },
  computed: mapState('caratulas', ['caratulas', 'totalElements']),
  methods: {
    getList() {
      this.listLoading = true
      this.$store.dispatch('caratulas/fetchCaratulas', this.listQuery).then(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val
      if (typeof val !== undefined) {
        this.disableCerrar = false
      }
    },
    handleFilter() {
      this.getList()
    },
    handleCerrar() {
      const id = this.currentRow.id
      this.$router.push({
        name: 'Cerrar', params: { id }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.boton__accion {
  margin-left: 50px;
}
</style>
