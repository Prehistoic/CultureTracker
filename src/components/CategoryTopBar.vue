<script>
import CategoryNewBookModal from './CategoryNewBookModal.vue';

export default {
    name: "CategoryTopBar",
    components: {
        CategoryNewBookModal
    },
    props: {
        category: {
        type: String,
        required: true,
        },
    },
    data() {
        return {
            isModalVisible: false,
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.$emit('need-update');
        }
    }
}
</script>

<template>
    <div id="topbar">
        <div class="topbar-title"> {{ category.toUpperCase() }}</div>
        <button class="btn btn-success new-asset-btn" @click="showModal">
            ADD
            <fa-icon icon="plus" />
        </button>

        <CategoryNewBookModal v-if="category == 'books' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'mangas' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'webtoons' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'comics' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'movies' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'series' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'animes' && isModalVisible" @close-new-asset="closeModal" />
        <CategoryNewBookModal v-if="category == 'games' && isModalVisible" @close-new-asset="closeModal" />
    </div>
</template>

<style>
#topbar {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
}

#topbar .topbar-title {
    font-size: 3em;
    margin-left: 30px;
}

#topbar .new-asset-btn {
    width: 100px;
    margin-right: 30px;
}

#topbar svg {
    margin-left: 10px;
}
</style>