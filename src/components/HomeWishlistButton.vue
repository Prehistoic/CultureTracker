<script>
import CircleType from 'circletype';

export default {
  name: "HomeWishlistButton",
  methods: {
    goToWishlist() {
      this.$router.push({ name: 'Wishlist' });
    }
  },
  mounted() {
    const circleType = new CircleType(document.getElementById('circle-text'));
    circleType.radius(103).dir(-1);
  }
};
</script>

<template>
    <button class="wishlist-link" @click="goToWishlist()">
      <img class="wishlist-img" :src="require('../assets/idea.png')" />
      <div class="wishlist-text" id="circle-text">WISHLIST</div>
    </button>
</template>

<style>
.wishlist-link {
  margin-top: 20px;
  background-color: orange;
  border: none;
  border-radius: 100%;
  width: 205px;
  height: 205px;
}

.wishlist-img {
  padding-right: 5px;
  padding-top: 5px;
  width: 120px;
}

.wishlist-text {
  position: relative;
  top: -60px;
  color: rgb(173, 102, 9);
  font-weight: bolder;
  font-size: 2rem;
}
</style>