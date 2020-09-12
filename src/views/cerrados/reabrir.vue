<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Reabrir
        </el-button>
        <el-button v-loading="loading" type="warning" @click="cancelForm">
          Cancelar
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <span class="label__textarea">Motivo de Reapertura del Expediente: </span>
        <el-input
          v-model="postForm.observaciones"
          class="motivo__textarea"
          type="textarea"
          :rows="3"
          placeholder="Motivo"
        />

      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { postReabrir } from '@/api/cerrados'

export default {
  name: 'Reabrir',
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
        id: undefined,
        observaciones: ''
      },
      loading: false,
      rules: {
        observaciones: [{ validator: validateRequire }]
      }
    }
  },
  mounted() {
    this.postForm.id = this.$route.params && this.$route.params.id
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call
          postReabrir(this.postForm)
            .then(() => {
              this.$notify({
                title: 'Exito',
                message: 'Expediente reabierto con éxito.',
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
        path: '/cerrados/index'
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

.label__textarea {
    margin-top: 40px;
    display: inline-block;
    font-weight: bold;
}

.motivo__textarea {
    margin-top: 10px;
}
</style>
