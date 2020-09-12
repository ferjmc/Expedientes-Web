<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Guardar
        </el-button>
        <el-button v-loading="loading" type="warning" @click="cancelForm">
          Cancelar
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <span>Seleccione la Oficina Destino: </span>
        <el-select
          v-model="postForm.oficinaid"
          clearable
          style="width: 190px"
          class="filter-item"
          label="Oficina destino:"
        >
          <el-option v-for="item in oficinaOptions" :key="item.id" :label="item.nombre" :value="item.id" />
        </el-select>

        <el-input
          v-model="postForm.observaciones"
          type="textarea"
          :rows="2"
          placeholder="Observaciones"
        />

      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { fetchList } from '@/api/oficinas'
import { postDerivar } from '@/api/pases'

export default {
  name: 'Derivar',
  components: { Sticky },

  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + ' es obligatorio',
          type: 'error'
        })
        callback(new Error(rule.field + ' es obligatorio'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        caratulaid: undefined,
        oficinaid: undefined,
        observaciones: ''
      },
      queryOficinas: {
        page: 1,
        size: 50
      },
      oficinaOptions: [{
        id: undefined,
        nombre: '',
        cofigoOrg: undefined,
        nombreOrg: ''
      }],
      loading: false,
      rules: {
        oficinaid: [{ validator: validateRequire }],
        observaciones: [{ validator: validateRequire }]
      }
    }
  },
  mounted() {
    this.postForm.caratulaid = this.$route.params && this.$route.params.id
    this.getOficinas()
  },
  methods: {
    getOficinas() {
      this.listLoading = true
      fetchList(this.queryOficinas).then(response => {
        this.oficinaOptions = response.data.content
        this.listLoading = false
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call
          postDerivar(this.postForm)
            .then(() => {
              this.$notify({
                title: 'Exito',
                message: 'Pase realizado con éxito.',
                type: 'success',
                duration: 2000
              })
              this.$router.push({
                path: '/expedientes/index'
              })
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelForm() {
      this.$router.push({
        path: '/expedientes/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
