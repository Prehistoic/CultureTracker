<script>
export default {
    name: "CategorySearchResultsModal",
    emits: {
        closeSearchResultsEvent: null,
        chosenResultEvent: null
    },
    props: ['results'],
    data() {
        return {
            chosen_index: 0,
        }
    },
    methods: {
        close() {
            this.$emit('closeSearchResultsEvent');
        },
        chooseResult(clicked_index) {
            this.chosen_index = clicked_index;
            Array.from(document.getElementsByClassName("search-results-element")).forEach( (element, index) => {
                index == this.chosen_index ? element.classList.add("chosen") : element.classList.remove("chosen");
            });

            const chooseButton = document.getElementById("chooseButton");
            chooseButton.disabled = false;
        },
        confirmChosenResult() {
            this.$emit('chosenResultEvent', this.chosen_index);
            this.close();
        },
        getCoverUrl(url) {
            return url != "Unknown" ? url : require("@/assets/unknown_image.jpg");
        },
        getParsedResults() {
            return JSON.parse(JSON.stringify(this.results))
        }
    },
    mounted() {
        console.log(this.getParsedResults());
    }
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="search-results-modal">
            <header class="search-results-modal-header">
                <slot name="header">SEARCH RESULTS</slot>
            </header>
            <section class="search-results-modal-body">
                <div v-if="getParsedResults().length == 0" class="search-results-empty">No results found !</div>
                <div v-if="getParsedResults().length > 0" class="search-results-list">
                    <div class="search-results-element" v-for="(result, index) in getParsedResults()" :key="index" @click="chooseResult(index)">
                        <img class="search-results-img" :src="this.getCoverUrl(result.cover_url)">
                        <div class="search-results-title">{{ result.title }}</div>
                        <div class="search-results-author">{{ result.author }}</div>
                    </div>
                </div>
            </section>
            <footer class="search-results-modal-footer">
            <div class="search-results-action-buttons">
                <button type="button" id="cancelButton" class="btn btn-secondary cancel-button" @click="close()">CANCEL</button>
                <button type="button" id="chooseButton" class="btn btn-success choose-button" disabled @click="confirmChosenResult()">CONFIRM</button>
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
    margin-right: 5%;
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

.search-results-list {
    overflow-y: scroll;
    max-height: 700px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
}

.search-results-element {
    display: flex;
    align-items: center;
    border: solid 2px black;
    margin-bottom: 10px;
    background-color: lightgrey;
}

.search-results-element:hover {
    background-color: grey;
}

.search-results-element.chosen {
    background-color: lightgreen;
}

.search-results-img {
    width: 10%;
}

.search-results-title {
    width: 60%;
    font-size: 150%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.search-results-author {
    width: 30%;
    font-size: 150%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>