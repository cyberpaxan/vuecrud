<template>
    <div class="app">
        <post-form @create="createPost" />
        <post-list :posts="posts" @remove="removePost" />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

export default {
    components: {
        PostList,
        PostForm,
    },

    data() {
        return {
            posts: [
                { id: 1, title: 'Описание поста 1', body: 'Описание поста 1' },
            ],
        };
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            this.posts = this.posts.filter((item) => item.id !== post.id);
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>
