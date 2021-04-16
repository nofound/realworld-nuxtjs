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
              &nbsp; Follow Eric Simons
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
                <a
                  class="nav-link"
                  :class="{
                    active: isActive == 'my',
                  }"
                  @click="getMyArticles()"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: isActive == 'myFa',
                  }"
                  @click="getFavoritedArticles()"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOtherUserInfo } from "@/api/user";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  data() {
    return {
      user: {},
      page: 1,
      limit: 20,
      articles: [],
      isActive: "my",
    };
  },
  created() {
    this.getUserInfo(this.$route.params.username);
  },
  methods: {
    async getUserInfo(username) {
      const { data } = await getOtherUserInfo(username);
      this.user = { ...data.profile };
      this.getMyArticles();
    },
    async getMyArticles() {
      const { limit, page, user } = this;
      const { data } = await getArticles({
        limit,
        offset: (page - 1) * limit,
        author: user.username,
      });
      this.isActive = "my";
      this.articles = data.articles;
      console.log(this.articles);
    },
    async getFavoritedArticles() {
      const { limit, page, user } = this;
      const { data } = await getArticles({
        limit,
        offset: (page - 1) * limit,
        favorited: user.username,
      });
      this.isActive = "myFa";
      this.articles = data.articles;
    },
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>
