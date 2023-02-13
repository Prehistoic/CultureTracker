<script>
import CategorySidebar from '@/components/CategorySidebar.vue';
import CategoryTopBar from '@/components/CategoryTopBar.vue';
import CategoryScrollableContent from '@/components/CategoryScrollableContent.vue';

export default {
  name: 'CategoryView',
  components: {
    CategorySidebar,
    CategoryTopBar,
    CategoryScrollableContent
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

<template>
  <div class="wrapper">
    <CategorySidebar @reverse-sort-order-event="reverseSortingOrder" />

    <div id="content">
      <CategoryTopBar :category="this.$route.params.type" />
      <CategoryScrollableContent />
    </div>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  width: 100%;
}

#content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>