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
    </div>
    <el-table
      v-loading="listLoading"
      :data="derivados"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-tooltip content="Recibir Expediente" placement="bottom" effect="light">
            <el-button type="success" icon="el-icon-check" circle @click="handleAceptar(row.id)" />
          </el-tooltip>
          <el-tooltip content="Rechazar Expediente" placement="bottom" effect="light">
            <el-button type="danger" icon="el-icon-close" circle @click="dialogFormVisible = true" />
          </el-tooltip>
          <el-dialog title="Confirmar Rechazo" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Observación" :label-width="formLabelWidth">
                <el-input v-model="recepcionRequest.observaciones" type="textarea" :rows="2" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancelar</el-button>
              <el-button type="primary" @click="handleRechazar(row.id)">Confirmar</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Expediente">
        <template slot-scope="{row}">
          <el-tag>{{ row.expediente }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Fecha">
        <template slot-scope="scope">
          <span>{{ scope.row.fecha | parseTime('{d}-{m}-{y}') }}</span>
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

      <el-table-column label="Observaciones">
        <template slot-scope="scope">
          <span>{{ scope.row.observaciones }}</span>
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
import { postRecibir, postRechazar } from '@/api/recepcion'

export default {
  name: 'Recepcion',
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
      recepcionRequest: {
        id: undefined,
        observaciones: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
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
          label: 'Observaciones',
          value: 'observaciones'
        }]
    }
  },
  computed: mapState('recepcion', ['derivados', 'totalElements']),
  mounted() {
    this.$store.dispatch('recepcion/fetchDerivados', this.listQuery).then(() => {
      this.listLoading = false
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$store.dispatch('recepcion/fetchDerivados', this.listQuery).then(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleAceptar(id) {
      this.recepcionRequest.id = id
      return new Promise((resolve, reject) => {
        postRecibir(this.recepcionRequest).then(response => {
          this.$notify({
            title: 'Exito',
            message: response.data.message,
            type: 'success',
            duration: 2000
          })
          this.getList()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleRechazar(id) {
      this.recepcionRequest.id = id
      return new Promise((resolve, reject) => {
        postRechazar(this.recepcionRequest).then(response => {
          this.$notify({
            title: 'Exito',
            message: response.data.message,
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
          this.getList()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
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
</style>
