<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button style="margin: 15px" @click="showDialog"
            >Создать пользователя</my-button
        >
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>

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
            dialogVisible: false,
        };
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((item) => item.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
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
