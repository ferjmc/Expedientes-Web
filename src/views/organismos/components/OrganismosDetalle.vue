<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '">
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >Guardar</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="180px" label="Organización Superior:" class="postInfo-container-item">
              <el-input v-model="postForm.parentnombre" :disabled="true" size="medium" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="codigo">
              <MDinput v-model="postForm.codigo" :maxlength="100" name="codigo" required>Código</MDinput>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="nombre">
              <MDinput v-model="postForm.nombre" :maxlength="100" name="nombre" required>Organización</MDinput>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // header
import { getOrg, setOrg } from '@/api/organizacion'

const defaultForm = {
  id: undefined,
  nombre: '',
  codigo: '',
  parentid: undefined,
  parentcodigo: '',
  parentnombre: ''
}

export default {
  name: 'OrganismosDetalle',
  components: { MDinput, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        nombre: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },

  created() {
    const id = this.$route.params && this.$route.params.id
    if (this.isEdit) {
      console.log('pasa por el created y obtiene el id: ' + id)
      this.fetchData(id)
    } else {
      this.fetchParentData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      getOrg(id)
        .then(response => {
          this.postForm.id = response.data.id
          this.postForm.codigo = response.data.codigo
          this.postForm.nombre = response.data.nombre
          this.postForm.parentid = response.data.parentid
          this.postForm.parentcodigo = response.data.parentcodigo
          this.postForm.parentnombre = response.data.parentnombre
          console.log(this.postForm)
          // set tagsview title
          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchParentData(id) {
      getOrg(id)
        .then(response => {
          this.postForm.parentid = response.data.id
          this.postForm.parentcodigo = response.data.codigo
          this.postForm.parentnombre = response.data.nombre
          console.log(this.postForm)
          // set tagsview title
          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTagsViewTitle() {
      const title = 'Modificar Organismo'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Modificar Organismo'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitSignup(payload) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('organizaciones/updateOrganizacion', payload)
          .then(response => {
            this.$notify({
              title: 'Exito',
              message: 'Organización guardada con éxito',
              type: 'success',
              duration: 2000
            })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call
          console.log('formulario validado')
          this.submitSignup(this.postForm)
            .then(() => {
              this.$router.push({
                path: '/organismos/index'
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
