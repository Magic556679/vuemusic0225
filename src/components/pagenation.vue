<template>
  <div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- pre -->
            <li class="page-item" :class="{'disabled': !pagenations.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="pageComponent(pagenations.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
            <!--  -->
            </li>
            <li class="page-item" v-for="page in pagenations.total_pages" :key="page"
            :class="{'active':pagenations.current_page === page}">
                <a class="page-link" href="#" @click.prevent="pageComponent(page)">{{page}}</a>
            </li>
            <!-- next -->
            <li class="page-item" :class="{'disabled': !pagenations.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="pageComponent(pagenations.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'pagenations',
    props:{
        pagenations:{
            type: Object,
        }
    },
    methods: {
        pageComponent(page) {
            this.$emit('changeCurrPage', page)
        }
    }
}
</script>