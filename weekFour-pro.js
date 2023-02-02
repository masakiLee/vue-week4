import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./pagination.js";

const url = "https://vue3-course-api.hexschool.io/";
const path = "masaki";

let proModal = "";
let delModal = "";

const App = createApp({
  data() {
    return {
      product: [],
      isNew: false, // 依據點擊開的按鈕不同顯示不同的標題
      // 先預設 product 沒有照片 等同於 新增商品跳出視窗
      tempProduct: {
        imagesUrl: [],
      },
      //儲存分頁資料
      page: {},
    };
  },
  //區域元件要加上 s
  components: {
    pagination,
  },
  methods: {
    checkLogin() {
      axios
        .post(`${url}v2/api/user/check`)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //需要帶上變數
    getProducts(page = 1) {
      //預設參數
      axios
        .get(`${url}v2/api/${path}/admin/products/?page=${page}`)
        .then((res) => {
          console.log(res.data);
          this.product = res.data.products;
          //pagination要存到上方 data 資料裡面
          this.page = res.data.pagination;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct() {
      //先預設為新增商品
      let newurl = `${url}v2/api/${path}/admin/product`;
      let http = "post";
      //如果是修改則更改url & http
      if (!this.isNew) {
        newurl = `${url}v2/api/${path}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }
      // 帶入不同的api
      axios[http](newurl, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          proModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    openModal(type, item) {
      if (type === "new") {
        // 新增商品時旁邊不能有照片
        this.tempProduct = {
          imagesUrl: [],
        };
        //因點擊的是新增商品所以 需要顯示新增商品
        this.isNew = true;
        proModal.show();
      } else if (type === "edit") {
        // 修改商品時帶出點擊中的item 用淺複製不然會改變原始資料
        this.tempProduct = { ...item };
        //因點擊的是編輯商品所以 需要顯示編輯商品
        this.isNew = false;
        proModal.show();
      } else if (type === "delete") {
        // 刪除商品時帶出點擊中的item 用淺複製不然會改變原始資料
        this.tempProduct = { ...item };
        delModal.show();
      }
    },
    delProduct() {
      axios
        .delete(`${url}v2/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((response) => {
          alert(response.data.message);
          // 關閉跳出視窗
          delModal.hide();
          // 重新抓取getProducts
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //新增圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  mounted() {
    proModal = new bootstrap.Modal(document.querySelector("#productModal"));
    delModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // defaults 每次都會帶入
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
});

//modal元件化
App.component("product-modal", {
  props: ["tempProduct", "updateProduct", "createImages"],
  template: `#product-modal-template`,
});

App.mount("#app");
