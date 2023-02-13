<script>
import CategoryNewItemModal from './CategoryNewItemModal.vue';

export default {
    name: "CategoryTopBar",
    components: {
        CategoryNewItemModal
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
        <button class="btn btn-success" @click="showModal">
            ADD
            <fa-icon icon="plus" />
        </button>

        <CategoryNewItemModal v-show="isModalVisible" @close="closeModal"/>
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

#topbar .btn {
    width: 100px;
    margin-right: 30px;
}

#topbar svg {
    margin-left: 10px;
}
</style>