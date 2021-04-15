<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button @click="submit()" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {  createArticles, updateArticle, getArticleDetail } from '@/api/article'

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: ""
      },
      routeParams: {},

    }
  },
  created () {
    this.routeParams = this.$route.params
    if(this.routeParams.slug) {
      this.getArticleDetail(this.routeParams.slug)
    }
  },
  methods: {
    async submit () {
      const submitFunc = !!!this.routeParams.slug ?  createArticles :  updateArticle
      const { data } = await submitFunc(this.article, this.routeParams.slug )
      this.$router.push(`/article/${data.article.slug}`)
    },
    async getArticleDetail (slug) {
      const { data } = await getArticleDetail(slug)
      this.article = { ...data.article }
    }
  }
}
</script>

<style>

</style>
