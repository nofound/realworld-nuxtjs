<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" @click="getMyArticles()">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="getFavoritedArticles()">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getOtherUserInfo } from '@/api/user'
import { getArticles } from '@/api/article'
export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  data () {
    return {
      user: {},
      page: 1,
      limit: 20,
    }
  },
  created() {
    this.getUserInfo(this.$route.params.username)
  },
  methods: {
    async getUserInfo(username) {
      const { data } = await getOtherUserInfo(username);
      this.user = { ...data.profile }
      this.getMyArticles()
    },
    async getMyArticles() {
      const { limit, page, user } = this
      const { data } = await getArticles({
        limit,
        offset: (page - 1) * limit,
        author: user.username
      });
      console.log(data);
    },
    async getFavoritedArticles() {
      const { limit, page, user } = this
      const { data } = await getArticles({
        limit,
        offset: (page - 1) * limit,
        favorited: user.username
      });
      console.log(data);
    }
  }
}
</script>

<style>

</style>
