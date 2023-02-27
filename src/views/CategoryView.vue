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
      sortingOrder: "inc",
      itemCardSize: 250,
      shouldReload: false,
    }
  },
  methods: {
    reverseSortingOrder() {
      if (this.sortingOrder == "inc") this.sortingOrder = "dec"
      else this.sortingOrder = "inc"
    },
    updateCardSize() {
      this.itemCardSize = Number(document.getElementById("range-input").value);
    },
    updateView() {
      this.shouldReload = !this.shouldReload;
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <CategorySidebar @reverseSortOrderEvent="reverseSortingOrder" @cardSizeUpdateEvent="updateCardSize"/>

    <div id="content">
      <CategoryTopBar :category="this.$route.params.type" @needUpdateEvent="updateView"/>
      <CategoryScrollableContent :category="this.$route.params.type" :cardSize="itemCardSize" :sortingOrder="this.sortingOrder" :shouldReload="this.shouldReload"/>
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