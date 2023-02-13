<template>
  <div class="wrapper">
    <CategorySidebar @reverse-sort-order-event="reverseSortingOrder" />

    <div id="content">
      This is {{ this.$route.params.name }} View !
      Current sorting order is {{ sortingOrder }}
    </div>
  </div>
</template>

<script>
import CategorySidebar from '@/components/CategorySidebar.vue';

export default {
  name: 'CategoryView',
  components: {
    CategorySidebar
  },
  data() {
    return {
      sortingOrder: "inc"
    }
  },
  methods: {
    reverseSortingOrder() {
      if (this.sortingOrder == "inc") this.sortingOrder = "dec"
      else this.sortingOrder = "inc"
    }
  }
}
</script>

<style>
.wrapper {
    display: flex;
    width: 100%;
}
</style>