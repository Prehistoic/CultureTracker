<script>
import HomeCard from '../components/HomeCard.vue'
import HomeWishlistButton from '../components/HomeWishlistButton.vue'

export default {
  name: 'HomeView',
  components: {
    HomeCard,
    HomeWishlistButton
  },
  data() {
    return {
      categories: [["books", "mangas", "webtoons", "comics"], ["movies", "animes", "series", "games"]],
    }
  },
  methods: {
    clearDirectory(directory) {
      const fs = window.require("fs");
      const path = window.require("path");

      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          if ([".png", ".jpg", ".jpeg"].includes(path.extname(file))) {
            fs.unlink(path.join(directory, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });
    }
  },
  mounted() {
    this.clearDirectory("src/data/temp");
  }
}
</script>

<template>
  <div class="home">
    <div class="text-center my-5">
      <h2 class="text-center">Culture Tracker 🍿</h2>
      <p>Let's go down your own cultural memory lane !</p>
    </div>

    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-content-around" v-for="(category_row, i) in categories" :key="i">
        <div class="card-container" v-for="(category, j) in category_row" :key="j">
          <HomeCard :category="category" />
        </div>
      </div>
    </div>

    <HomeWishlistButton />
  </div>
</template>

<style>
.card-container {
  width: 23%;
  max-width: 350px;
}
</style>
