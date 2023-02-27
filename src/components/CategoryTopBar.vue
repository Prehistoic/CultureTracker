<script>
import CategoryNewBookModal from './CategoryNewBookModal.vue';

export default {
    name: "CategoryTopBar",
    emits: {
        needUpdateEvent: null
    },
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
            this.$emit('needUpdateEvent');
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

        <CategoryNewBookModal v-if="category == 'books' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'mangas' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'webtoons' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'comics' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'movies' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'series' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'animes' && isModalVisible" @closeNewAssetEvent="closeModal" />
        <CategoryNewBookModal v-if="category == 'games' && isModalVisible" @closeNewAssetEvent="closeModal" />
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

#topbar .new-asset-btn svg {
    margin-left: 10px;
}
</style>