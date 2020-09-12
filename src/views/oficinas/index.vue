<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/oficinas/crear'">
        <el-button class="filter-item" type="primary" size="small" icon="el-icon-edit">Nuevo</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="content"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="Cod. Org.">
        <template slot-scope="scope">
          <span>{{ scope.row.codigoOrg }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="Organismo">
        <template slot-scope="scope">
          <span>{{ scope.row.nombreOrg }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Nombre Oficina">
        <template slot-scope="scope">
          <span>{{ scope.row.nombre }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Acciones" width="120">
        <template slot-scope="scope">
          <router-link :to="'/oficinas/editar/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Editar</el-button>
          </router-link>
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
import { fetchList } from '@/api/oficinas'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Oficinas',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      content: null,
      totalElements: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.content = response.data.content
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
