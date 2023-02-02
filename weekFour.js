import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(url, this.user)
        .then(function (response) {
          const { token, expired } = response.data;
          //  token 加入 cookie expires 設置 cookie 有效時間
          document.cookie = `loginToken=${token}; expires=${new Date(
            expired
          )}; path=/`;
          window.location = "weekFour-pro.html";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

createApp(app).mount("#app");
