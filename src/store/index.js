import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },

  mutations: {
    incrementLikes(state, post_id) {
      state.posts.find((item) => {
        console.log(item);
        if (item.post_id === post_id) {
          item.likes++;
        }
      });
    },

    posts(state, payload) {
      // state.posts = payload;
      if (state.posts.find((item) => item.post_id === payload.post_id)) {
        return;
      }
      state.posts.push(payload);
    },
  },
});
