<template>
    <div v-if="posts.length > 0">
        <h3>Посты пользователей</h3>
        <transition-group name="list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
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

<style scoped>
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-move {
    transition: transform 0.6s ease;
}
</style>
