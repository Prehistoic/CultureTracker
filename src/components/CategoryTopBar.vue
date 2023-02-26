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

        <CategoryNewBookModal v-if="category == 'books'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'mangas'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'webtoons'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'comics'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'movies'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'series'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'animes'" v-show="isModalVisible" @close="closeModal" />
        <CategoryNewBookModal v-if="category == 'games'" v-show="isModalVisible" @close="closeModal" />
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