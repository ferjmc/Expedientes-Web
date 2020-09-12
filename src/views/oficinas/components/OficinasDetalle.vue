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
            <el-form-item label-width="100px" label="Organismo:" class="postInfo-container-item">
              <el-select v-model="postForm.organizacionid" filterable default-first-option placeholder="Seleccione" style="width: 100%">
                <el-option v-for="org in optionsOrg" :key="org.id" :label="org.nombre" :value="org.id">
                  <span> {{ org.codigo }} - {{ org.nombre }} </span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="nombre">
              <MDinput v-model="postForm.nombre" :maxlength="100" name="nombre" required>Nombre de Oficina</MDinput>
            </el-form-item>
            <el-form-item>
              <el-transfer
                v-model="postForm.usuarios"
                :titles="['Usuarios', 'En la Oficina']"
                filterable
                :data="optionsUser"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
import { oficinasUpdate } from '@/api/oficinas'

export default {
  name: 'OficinasDetalle',
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

    const defaultForm = {
      id: undefined,
      organizacionid: undefined,
      nombre: '',
      usuarios: []
    }

    return {
      postForm: Object.assign({}, this.defaultForm),
      loading: false,
      rules: {
        nombre: [{ validator: validateRequire }]
      },
      tempRoute: {},
      filterMethod(query, item) {
        return item.username.indexOf(query.toLowerCase()) > -1
      }
    }
  },
  created() {
    this.$store.dispatch('organizaciones/getOptions')
    this.$store.dispatch('user/getUserSimpleList')
  },
  computed: {
    ...mapGetters(['optionsOrg', 'optionsUser'])
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call
          console.log('formulario validado')
          console.log(this.postForm)
          oficinasUpdate(this.postForm)
            .then(() => {
              this.$notify({
                title: 'Exito',
                message: 'Oficina guardada con éxito',
                type: 'success',
                duration: 2000
              })
              this.$router.push({
                path: '/oficinas/index'
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
