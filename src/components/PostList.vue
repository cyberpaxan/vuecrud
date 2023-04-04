<template>
    <div v-if="posts.length > 0">
        <h3>Посты пользователей</h3>
        <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
    </div>

    <h2 v-else style="text-align: center; margin-top: 20px; color: darkred">
        Посты отсутствуют
    </h2>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
    components: {
        PostItem,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped></style>
