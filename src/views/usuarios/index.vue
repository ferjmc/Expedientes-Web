<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/usuarios/crear'">
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

      <el-table-column width="120px" align="center" label="Usuario">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="E-mail">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Nombre">
        <template slot-scope="scope">
          <span>{{ scope.row.persona }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Acciones" width="120">
        <template slot-scope="scope">
          <router-link :to="'/usuarios/editar/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Editar</el-button>
          </router-link>
        </template>
      </el-table-column>

      <!-- <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>-->
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
import { fetchList } from '@/api/usuarios'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Usuarios',
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
