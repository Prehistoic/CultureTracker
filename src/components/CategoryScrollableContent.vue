<script>
import CategoryItemCard from './CategoryItemCard.vue';
//import Book from '../models/books'

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

            var assets = JSON.parse(fs.readFileSync("src/data/" + category.toLowerCase() + ".json")).assets;

            /*var book = new Book("Harry Potter", "Rowling", "08/01/2022", 1000, 1, ["Fantasy"], "https://britishheritage.com/uploads/article/2004/11/1025/Harry_potter_chamber-of-secrets-theatrical-poster.jpg?t=1604661088", "14/02/2023", "16/02/2023", true, "Harry Potter est un sorcier", 5, "Vraiment sympa")
            assets.push(book);

            book = new Book("Winnie", "the Pooh", "12/08/1997", 50, 2, ["Kids"], "http://www.cenest.net/wp-content/uploads/2014/11/Winnie-lOurson-3Wallpapers-iPad-Retina.jpg", "12/02/2023", "13/02/2023", true, "Super", 5, "Super bien")
            for (let i=0; i < 50; i++) {
                assets.push(book)
            }*/

            return assets;
        },
        getSortedYears(category, sortingOrder) {
            const assets = this.getAssets(category);

            var years = [];
            assets.forEach(asset => {
                var year = asset.getReleaseDate().split('/')[2];
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
                if (year == asset.getReleaseDate().split('/')[2]) {
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