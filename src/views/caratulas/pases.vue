<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/expedientes/pases/'+listQuery.caratulaid+'/derivar'">
        <el-button class="filter-item" type="primary" size="small" icon="el-icon-d-arrow-right">Derivar</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="pases"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>Observaciones: {{ scope.row.observaciones }}</p>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Fecha">
        <template slot-scope="scope">
          <span>{{ scope.row.fecha | parseTime('{d}-{m}-{y} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Estado">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.estado }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Usuario">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="Oficina">
        <template slot-scope="scope">
          <span>{{ scope.row.oficina }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Organismo">
        <template slot-scope="scope">
          <span>{{ scope.row.codigoOrg + ' - ' + scope.row.organismo }}</span>
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
import { getPases } from '@/api/pases'
import Pagination from '@/components/Pagination'

export default {
  name: 'ListaPases',
  components: { Pagination },

  data() {
    return {
      pases: null,
      totalElements: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        caratulaid: 0
      }
    }
  },
  created() {
    this.listQuery.caratulaid = this.$route.params && this.$route.params.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPases(this.listQuery)
        .then(response => {
          this.pases = response.data.content
          this.totalElements = response.data.totalElements
          this.listLoading = false
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
