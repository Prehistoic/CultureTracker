<script>
import CategoryNewBookModal from '../modals/CategoryNewBookModal.vue';
import CategoryNewMacroModal from '../modals/CategoryNewMacroModal.vue';

export default {
    name: "CategoryTopBar",
    emits: {
        needUpdateEvent: null
    },
    components: {
        CategoryNewBookModal,
        CategoryNewMacroModal
    },
    props: {
        category: {
        type: String,
        required: true,
        },
    },
    data() {
        return {
            isNewAssetModalVisible: false,
            isNewMacroModalVisible: false,
        }
    },
    methods: {
        showNewAssetModal() {
            this.isNewAssetModalVisible = true;
        },
        closeNewAssetModal() {
            this.isNewAssetModalVisible = false;
            this.$emit('needUpdateEvent');
        },
        showNewMacroModal() {
            this.isNewMacroModalVisible = true;
        },
        closeNewMacroModal() {
            this.isNewMacroModalVisible = false;
            this.$emit('needUpdateEvent');
        }
    }
}
</script>

<template>
    <div id="topbar">
        <div class="topbar-title"> {{ category.toUpperCase() }}</div>
        <div class="new-asset-buttons">
            <button class="btn btn-success new-asset-btn" @click="showNewAssetModal">
                NEW ASSET
                <fa-icon icon="plus" />
            </button>
            <button class="btn btn-primary new-macro-asset-btn" @click="showNewMacroModal">
                NEW SERIES
                <fa-icon icon="plus" />
            </button>
        </div>

        <CategoryNewMacroModal v-if="isNewMacroModalVisible" @closeNewMacroEvent="closeNewMacroModal" :category="this.category" />

        <CategoryNewBookModal v-if="category == 'books' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'mangas' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'webtoons' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'comics' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'movies' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'series' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'animes' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
        <CategoryNewBookModal v-if="category == 'games' && isNewAssetModalVisible" @closeNewAssetEvent="closeNewAssetModal" />
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
    width: 200px;
    height: 100%;
    margin-right: 30px;
}

#topbar .new-macro-asset-btn {
    width: 200px;
    height: 100%;
    margin-right: 30px;
}

#topbar svg {
    margin-left: 10px;
}
</style>