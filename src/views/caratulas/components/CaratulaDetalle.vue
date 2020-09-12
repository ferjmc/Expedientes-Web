<template>
  <div class="createPost-container">
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
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="80px" label="Folios:" class="postInfo-container-item">
                    <el-input-number v-model="postForm.folios" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="80px" label="Fecha:" class="postInfo-container-item">
                    <el-date-picker v-model="display_fecha" type="datetime" format="dd-MM-yyyy HH:mm:ss" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item prop="extracto" style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="postForm.extracto" :height="400" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
import { caratulasUpdate } from '@/api/caratulas'

const defaultForm = {
  id: undefined,
  folios: 0,
  extracto: '',
  oficinaid: 0
}

export default {
  name: 'CaratulaDetalle',
  components: { Tinymce, Sticky },
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
        folios: [{ validator: validateRequire }],
        extracto: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    ...mapGetters(['oficinaid']),
    display_fecha: {
      get() {
        return (+new Date(this.postForm.fecha))
      },
      set(val) {
        this.postForm.fecha = new Date(val)
      }
    }
  },
  created() {

  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call
          this.postForm.oficinaid = this.oficinaid
          console.log(this.postForm)
          caratulasUpdate(this.postForm)
            .then(response => {
              console.log(response)
              this.$store.dispatch('caratulas/setCurrentCaratula', response.data)
              this.$notify({
                title: 'Exito',
                message: 'Caratula guardada con éxito',
                type: 'success',
                duration: 2000
              })
              this.$store.dispatch('caratulas/printCurrentCaratula')
              this.$router.push({
                path: '/Expedientes'
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
      this.postForm = Object.assign({}, this.defaultForm)
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
