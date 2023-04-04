<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button style="margin: 15px" @click="showDialog"
            >Создать пользователя</my-button
        >
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>

        <post-list v-if="!isPostsLoading" :posts="posts" @remove="removePost" />
        <div v-else>Идет загрузка постов...</div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from 'axios';

export default {
    components: {
        PostList,
        PostForm,
        MyButton,
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
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

        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                setTimeout(async () => {
                    const response = await axios.get(
                        'https://jsonplaceholder.typicode.com/posts?_limit=10'
                    );
                    this.posts = response.data;
                    this.isPostsLoading = false;
                }, 1000);
            } catch (error) {
                alert('Ошибка');
            }
        },
    },
    mounted() {
        this.fetchPosts();
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
