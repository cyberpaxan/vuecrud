<template>
    <div >
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск по названию" />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пользователя</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>

        <post-list
                v-if="!isPostsLoading"
                :posts="sortedAndSearchedPosts"
                @remove="removePost"
        />
        <div v-else>Идет загрузка постов...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                class="page"
                :class="{ 'current-page': page === pageNumber }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '../components/UI/MyButton.vue';
import MySelect from '../components/UI/MySelect.vue';
import axios from 'axios';

export default {
    components: {
        PostList,
        PostForm,
        MyButton,
        MySelect,
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
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

                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                );
                this.posts = response.data;
            } catch (error) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },

        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                );
                this.posts = [...this.posts, ...response.data];
            } catch (error) {
                alert('Ошибка');
            }
        },

        // changePage(pageNumber) {
        //     this.page = pageNumber;
        //     this.fetchPosts();
        // },
    },
    mounted() {
        this.fetchPosts();



    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort]
                );
            });
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );
        },
    },
};
</script>

<style>


.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 2px solid black;
    padding: 10px;
    margin: 5px;
}

.current-page {
    border: 3px solid teal;
}

.observer {
    height: 30px;
    background: white;
}
</style>
