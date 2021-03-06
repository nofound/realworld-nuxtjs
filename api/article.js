import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取公共文章列表
export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params,
        // headers: {
        //   // 添加用户身份，数据格式：Token空格Token数据
        //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
        // }
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 评论文章
export const createComment = (slug, data) => {
    return request({
        method: "post",
        url: `/api/articles/${slug}/comments`,
        data
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 创建文章
export const createArticles = (data, slug) => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}

// 获取文章详情
export const getArticleDetail = slug => {
    return request({
        method: "GET",
        url: `api/articles/${slug}`
    })
}

// 更新文章
export const updateArticle = (data, slug) => {
    console.log(data, slug);
    return request({
        method: "PUT",
        url: `/api/articles/${slug}`,
        data
    })
}