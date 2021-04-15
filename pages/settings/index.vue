<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="handleSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="user.image"  class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <button @click="logout()" class="btn btn-danger pull-xs-left">
            Or click here to logout.
          </button>
        </div>
        

      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data () {
    return {
      user: {
          bio: "",
          email: "",
          image: "",
          username: "",
          password: ""
      }
    }
  },
  created () {
      this.getDetail()
  },
  methods: {
      async getDetail () {
          const { data } = await getUserInfo()
          this.user =  { ...data.user }
      },
      handleSubmit () {
        const param = { user: this.user }
        updateUserInfo(param).then(res => {
          if (res.code === '200'){
            this.$router.push('/')
          }
        })
      },
      logout () {
        Cookie.remove('user')
        // this.$router.push('/login')
        this.$router.go(0)
      }
  }
}
</script>

<style>

</style>
