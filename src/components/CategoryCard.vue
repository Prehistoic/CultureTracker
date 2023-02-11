<template>
    <div class="card mb-4 shadow-lg border border-secondary bg-dark text-light" @click="goToCategory(category)">
        <img
            class="card-img-top category-img"
            :src="require('../assets/categories/' + category.toLowerCase() + '.jpg')"
            alt="category image"
            draggable="false"
        />
        <div class="card-body">
            <p class="card-text text-center">{{ category }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToCategory(category) {
        this.$router.push({ name: 'Category', params: { name: category.toLowerCase() }})
    }
  }
};
</script>

<style>
.category-img {
    height: 200px;
}
</style>