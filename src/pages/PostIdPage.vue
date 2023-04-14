<template>
  <div v-if="post">
    <h1>Это страница поста с ID = {{ post.id }}</h1>
    <br />
    <h1>{{ post.title }}</h1>
    <br />
    <h1>{{ post.body }}</h1>
    <br />
    <h1>Лайков: {{ likes }}</h1>
    <my-button @click="changePost('prev')">Предыдущий пост</my-button>
    <my-button @click="changePost('next')">Следующий пост</my-button>
    <my-button @click="$store.commit('incrementLikes', post.id)"
      >Поставить лайк</my-button
    >
  </div>
  <div v-else>Идет загрузка...</div>
</template>

<script>
import axios from "axios";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: { MyButton },
  data() {
    return {
      post: null,
    };
  },

  methods: {
    async fetchPost() {
      try {
        const id = this.$route.params.id;

        if (!id) {
          return;
        }

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        this.post = response.data;
      } catch (error) {
        console.trace(error);
      }
    },

    async changePost(state) {
      switch (state) {
        case "next":
          await this.$router.push(`/posts/${this.post.id + 1}`);
          break;
        case "prev":
          await this.$router.push(`/posts/${this.post.id - 1}`);
          break;
      }
      await this.fetchPost();

      this.$store.commit("posts", {
        post_id: this.post.id,
        likes: 0,
      });
      // console.log(this.$store.state.posts.likes);
    },
  },

  mounted() {
    this.fetchPost(); // TODO: узнать зачем на mounted async у fetchPost()
    this.$store.commit("posts", {
      post_id: Number(this.$route.params.id),
      likes: 0,
    });
  },

  computed: {
    likes() {
      const posts = this.$store.state.posts;
      const curPost = posts.find((item) => item.post_id === this.post.id);
      if (curPost) {
        return curPost.likes;
      }

      return 0;
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px;
}
</style>
