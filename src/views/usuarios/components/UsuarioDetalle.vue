<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >Guardar</el-button>
        <!-- <el-button v-loading="loading" type="warning" @click="draftForm">Guardar Borrador</el-button> -->
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="username">
              <MDinput v-model="postForm.username" :maxlength="100" name="name" required>Username</MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-form-item style="margin-bottom: 40px;" prop="email">
                <MDinput
                  v-model="postForm.email"
                  :maxlength="100"
                  type="email"
                  placeholder="Ingresa el e-mail"
                  required
                >E-Mail</MDinput>
              </el-form-item>

              <el-form-item v-if="!isEdit" style="margin-bottom: 40px;" prop="password">
                <MDinput
                  v-model="postForm.password"
                  :maxlength="60"
                  type="password"
                  placeholder="Ingrese una contraseña"
                  required
                >Contraseña</MDinput>
              </el-form-item>

              <el-checkbox-group v-model="postForm.roles" size="medium">
                <el-checkbox-button v-for="rol in roles" :key="rol" :label="rol">{{ rol }}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // header
import { getUser, signup } from '@/api/usuarios'

const opcionesRoles = ['usuario', 'mod', 'admin']

const defaultForm = {
  status: 'draft',
  username: '',
  email: '',
  password: '',
  content_short: '',
  display_time: undefined,
  id: undefined,
  roles: ['usuario']
}

export default {
  name: 'UsuarioDetalle',
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
      roles: opcionesRoles,
      loading: false,
      rules: {
        username: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }],
        password: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time)
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      console.log('pasa por el created y obtiene el id: ' + id)
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      getUser(id)
        .then(response => {
          this.postForm.id = response.data.id
          this.postForm.username = response.data.username
          this.postForm.email = response.data.email
          this.postForm.roles.pop()
          console.log(response.data.roles)
          for (var i in response.data.roles) { this.postForm.roles.push(response.data.roles[i].name) }

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
      const title = 'Modificar Usuario'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Modificar Usuario'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitSignup(payload) {
      return new Promise((resolve, reject) => {
        signup(payload)
          .then(response => {
            this.$notify({
              title: 'Exito',
              message: 'Usuario guardado con éxito',
              type: 'success',
              duration: 2000
            })
            this.$refs.postForm.status = 'published'
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    submitForm() {
      const signupPayload = {
        username: this.postForm.username,
        email: this.postForm.email,
        password: this.postForm.password,
        role: ['admin', 'mod']
      }

      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // api call

          this.submitSignup(signupPayload)
            .then(() => {
              this.$router.push({
                path: '/usuarios/index'
              })
              this.loading = false
            })
            .catch(() => {
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
