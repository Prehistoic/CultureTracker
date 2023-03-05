<script>
export default {
  name: "HomeCard",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToCategory(category) {
        this.$router.push({ name: 'Category', params: { type: category }})
    }
  }
};
</script>

<template>
  <div class="card mb-4 shadow-lg border border-secondary bg-dark text-light" @click="goToCategory(category)">
      <img
          class="card-img-top"
          :src="require('@/assets/categories/' + category.toLowerCase() + '.jpg')"
          draggable="false"
      />
      <div class="card-body">
          <p class="card-text text-center">{{ category.toUpperCase() }}</p>
      </div>
  </div>
</template>

<style>
.card-img-top {
  height: 200px !important;
  max-height: 200px;
}
</style>