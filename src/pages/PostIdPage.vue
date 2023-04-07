<template>
    <div v-if="post">
        <h1>Это страница поста с ID = {{post.id}}</h1>
        <br/>
        <h1>{{post.title}}</h1>
        <br/>
        <h1>{{post.body}}</h1>
        <my-button @click="prevPost">Предыдущий пост</my-button>
        <my-button @click="nextPost">Следующий пост</my-button>

    </div>
    <div v-else>Идет загрузка...</div>
</template>

<script>
import axios from "axios";
import MyButton from "@/components/UI/MyButton.vue";

export default {
    components: {MyButton},
    data() {
        return {
            post: null,
        }

    },

    methods: {
        async fetchPost() {
            try {
                const id = this.$route.params.id
                if (!id) {
                    return;
                }

                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

                this.post = response.data;




            } catch (error) {
                alert(error);
            }
        },

        async prevPost() {
            await this.$router.push(`/posts/${this.post.id - 1}`);
            this.fetchPost()
        },

        async nextPost() {
            await this.$router.push(`/posts/${this.post.id + 1}`);
            this.fetchPost()
        }
    },

    mounted() {
        this.fetchPost()

    }
};
</script>

<style scoped>
button {
    margin: 20px;
}
</style>