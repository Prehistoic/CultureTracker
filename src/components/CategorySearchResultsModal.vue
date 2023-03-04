<script>
export default {
    name: "CategorySearchResultsModal",
    emits: {
        closeSearchResultsEvent: null
    },
    props: ['results'],
    methods: {
        close() {
            this.$emit('closeSearchResultsEvent');
        },
        chooseResult() {
            console.log(JSON.parse(JSON.stringify(this.results)));
        }
    },
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="search-results-modal">
            <header class="search-results-modal-header">
                <slot name="header">SEARCH RESULTS</slot>
            </header>
            <section class="search-results-modal-body">Search results</section>
            <footer class="search-results-modal-footer">
            <div class="search-results-action-buttons">
                <button type="button" class="btn btn-secondary cancel-button" @click="close()">CANCEL</button>
                <button type="button" class="btn btn-success choose-button" @click="chooseResult()">CONFIRM</button>
            </div>
            </footer>
        </div>
    </div>
</template>
    
<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-results-modal {
    background: #FFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    min-width: 50%;
    margin-top: 1%;
    margin-left: 5%;
    z-index: 1;
}

.search-results-modal-header,
.search-results-modal-footer {
    padding: 15px;
    display: flex;
}

.search-results-modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: white;
    background: #6b81d6;
    justify-content: space-between;
    font-weight: bold;
}

.search-results-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: space-between;
    font-weight: bold;
    justify-content: flex-end;
}

.search-results-modal-body {
    position: relative;
    padding: 20px 10px;
    display: flex;
}

.choose-button {
    margin-left: 20px;
}
</style>