<template>
  <div class="home">
    <div class="text-center my-5">
      <h2 class="text-center">Culture Tracker 🍿</h2>
      <p>Let's go down your own cultural memory lane !</p>
    </div>

    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-content-around" v-for="(category_row, i) in categories" :key="i">
        <div class="card-container" v-for="(category, j) in category_row" :key="j">
          <CategoryCard :category="category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue'

export default {
  name: 'HomeView',
  components: {
    CategoryCard
  },
  data() {
    return {
      categories: [["BOOKS", "MANGAS", "COMICS", "MUSIC"], ["MOVIES", "ANIMES", "SERIES", "GAMES"]]
    }
  }
}
</script>

<style>
.card-container {
  width: 23%;
  max-width: 350px;
}
</style>
