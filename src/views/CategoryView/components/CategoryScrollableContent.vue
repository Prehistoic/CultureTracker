<script>
import Book from '@/models/books';
import CategoryItemCard from './CategoryItemCard.vue';

export default {
    name: "CategoryScrollableContent",
    props: {
        category: {
            type: String,
            required: true,
        },
        cardSize: {
            type: Number,
            required: true,
        },
        sortingOrder: {
            type: String,
            required: true,
        },
        shouldReload: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        sortingOrder: function() {
            if (this.getAssets(this.category).length != 0) {
                var currentPage = this.getSortedYears(this.category, this.getSortingOrder())[0];
                document.getElementById('carousel-indicator').innerHTML = currentPage;

                var carouselItems = document.getElementsByClassName('carousel-item');
                Array.from(carouselItems).forEach(item => {
                    item.classList.remove('active');
                })
                carouselItems[0].classList.add('active');
            }
        },
        shouldReload: function() {
            this.$forceUpdate();
        }
    },
    components: {
        CategoryItemCard
    },
    methods: {
        initAssets(category) {
            const fs = window.require('fs');
            const default_assets = {"assets": []}
            fs.writeFileSync("src/data/" + category.toLowerCase() + ".json", JSON.stringify(default_assets));
        },
        getAssets(category) {
            const fs = window.require('fs');

            if (!fs.existsSync("src/data/" + category.toLowerCase() + ".json")) {
                this.initAssets(category);
            }

            let assets = [];
            const jsonAssets = JSON.parse(fs.readFileSync("src/data/" + category.toLowerCase() + ".json")).assets;
            Array.from(jsonAssets).forEach(item => {
                const asset = new Book(item.title, item.author, item.release_date, item.page_count, item.volume_id, item.genres, item.cover_url, item.start_date, item.end_date, item.finished, item.synopsys, item.rating, item.comment);
                assets.push(asset);
            });

            return assets;
        },
        getSortedYears(category, sortingOrder) {
            const assets = this.getAssets(category);

            var years = [];
            assets.forEach(asset => {
                var year = asset.getReleaseDate().split('-')[0];
                years.push(year);
            });

            return [...new Set(years)].sort(function(a, b) { 
                if (sortingOrder == "inc") {
                    return a - b;
                } else {
                    return b - a;
                } 
            });
        },
        getAssetsFromYear(category, year) {
            const assets = this.getAssets(category);

            var result = [];
            assets.forEach(asset => {
                if (year == asset.getReleaseDate().split('-')[0]) {
                    result.push(asset);
                }
            });
            return result;
        },
        getSortingOrder() {
            return this.sortingOrder;
        },
    },
    mounted() {
        if (this.getAssets(this.category).length != 0) {
            var currentPage = this.getSortedYears(this.category, this.getSortingOrder())[0];
            document.getElementById('carousel-indicator').innerHTML = currentPage;

            const myCarousel = document.getElementById('carouselItemsCard')
            myCarousel.addEventListener('slide.bs.carousel', event => {
                var currentPage = this.getSortedYears(this.category, this.getSortingOrder())[event.to];
                document.getElementById('carousel-indicator').innerHTML = currentPage;
            });   
        }
    }
}
</script>

<template>
    <div class="empty-message" v-if="getAssets(category).length === 0">
        No {{ category.toLowerCase() }} found, try adding one !
    </div>

    <div class="container" v-else>
        <div class="scroll-container">
            <button class="carousel-button" type="button" data-bs-target="#carouselItemsCard" data-bs-slide="prev">
                <fa-icon icon="chevron-left" />
            </button>

            <div id="carouselItemsCard" class="carousel slide">
                <div class="carousel-inner">
                    <div v-for="(year, i) in getSortedYears(category, sortingOrder)" :key="i" :class= '{"carousel-item": true, "active": i == 0}'>
                        <div class="scrollable-panel">
                            <CategoryItemCard :item="asset" :cardSize="cardSize" v-for="(asset, j) in getAssetsFromYear(category, year)" :key="j"/>
                        </div>
                    </div>
                </div>
            </div>

            <button class="carousel-button" type="button" data-bs-target="#carouselItemsCard" data-bs-slide="next">
                <fa-icon icon="chevron-right" />
            </button>
        </div>

        <div id="carousel-indicator" class="carousel-indicator"></div>
    </div>
</template>

<style>
.empty-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 750px;
}

.container {
    display: flex;
    flex-direction: column;
}

.scroll-container {
    display: flex;
}

.carousel {
    width: 100%;
}

.carousel-button {
    height: 50px;
    align-self: center;
}

.scrollable-panel {
    margin: 50px;
    height: 750px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
}

::-webkit-scrollbar {
   display: none;
}

.carousel-indicator {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>