<script>
import Book from '@/models/books';

export default {
  name: "CategoryItemCard",
  props: {
    item: {
      type: Book,
      required: true,
    },
    cardSize: {
      type: Number,
      required: true,
    }
  },
  computed: {
    cssProps() {
      return {
        '--width': this.cardSize.toString() + "px",
        '--img-height': (this.cardSize * 0.9).toString() + "px",
        '--text-height': (this.cardSize * 0.25).toString() + "px"
      }
    }
  }
};
</script>

<template>
    <div class="card mb-4 shadow-lg border border-secondary bg-dark text-light" :style="cssProps">
        <img
            class="card-img-top item-img"
            :src="require(`@/data/covers/${this.item.getCoverUrl()}`)"
            alt="item image"
            draggable="false"
        />
        <div class="card-body">
            <p class="card-text">{{ item.getTitle() }}</p>
        </div>
    </div>
</template>

<style>
.card {
  width: var(--width);
  margin-right: 20px;
  align-self: first baseline;
}

.card-img-top {
  height: var(--img-height);
  object-fit: cover;
}

.card-body {
  width: var(--width);
  height: var(--text-height);
}
</style>