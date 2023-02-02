//1.匯出設定

export default {
  //
  props: ["pages", "getProducts"],
  template: `
    <nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item"
        :class="{ disabled: !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="getProducts(pages.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" 
        :class="{active:page === pages.current_page}"
        v-for="page in pages.total_pages" :key="page+'page'">
            <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item"
        :class="{ disabled: !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next"
            @click.prevent="getProducts(pages.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    </nav>`,
};

//1. 需要先加入頁碼 使用 v-for
//2. 當前選擇頁碼連結加上 "active" class，顯示為正在觀看的頁面
//3. 需要新增方法點擊頁碼 也是利用 props 上傳下
