<template>
    <nav class="closed" id="sidebar">
        <div class="sidebar-header" @click="collapseSidebar()">
            <fa-icon id="closed-sidebar-icon" icon="bars" />
            <fa-icon id="opened-sidebar-icon" class="hidden" icon="xmark" />
        </div>

        <ul class="list-unstyled components">
            <li>
                <div class="sidebar-link" @click="goToHome()">
                    <fa-icon icon="house"/>
                    <div class="sidebar-link-text hidden">Home</div>
                </div>
            </li>
            <li>
                <div class="sidebar-link" id="displayMenu" @click="collapseDropdown('displaySubmenu')">
                    <fa-icon icon="expand"/>
                    <div class="sidebar-link-text hidden">Display</div>
                </div>
                <div class="sidebar-link-submenu hidden" id="displaySubmenu">
                    <input type="range" id="range-input" class="form-range range-input" min="150" max="350" defaultValue="250" step="10" @input="updateCardSize($event.target.value)">
                    <output class="range-counter" id="range-counter">250</output>
                </div>  
            </li>
            <li>
                <div class="sidebar-link" id="sortMenu" @click="collapseDropdown('sortSubmenu')">
                    <fa-icon icon="filter"/>
                    <div class="sidebar-link-text hidden">Sort by</div>
                </div>
                <div class="sidebar-link-submenu hidden" id="sortSubmenu">
                    <ul class="list-unstyled">
                        <li>Date</li>
                        <li>Title</li>
                        <li>Author / Realisator</li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="sidebar-link" id="sortingOrderMenu" @click="reverseSortingOrder()">
                    <fa-icon id="decreasing-sorting-order-icon" class="hidden" icon="arrow-down-wide-short"/>
                    <fa-icon id="increasing-sorting-order-icon" icon="arrow-down-short-wide"/>
                    <div class="sidebar-link-text hidden">Sort direction</div>
                </div>
            </li>
            <li>
                <div class="sidebar-link" id="settingsMenu" @click="goToSettings()">
                    <fa-icon icon="gear"/>
                    <div class="sidebar-link-text hidden">Settings</div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: "CategorySidebar",
  methods: {
    goToHome() {
        this.$router.push({ name: 'Home' })
    },
    goToSettings() {
        this.$router.push({ name: 'Settings' })
    },
    collapseSidebar() {
        document.getElementById("sidebar").classList.toggle("closed")
        document.getElementById("closed-sidebar-icon").classList.toggle("hidden")
        document.getElementById("opened-sidebar-icon").classList.toggle("hidden")
        Array.from(document.getElementsByClassName("sidebar-link-text")).forEach(element => {
            element.classList.toggle("hidden")
        });

        if(document.getElementById("sidebar").classList.contains("closed")) {
            Array.from(document.getElementsByClassName("sidebar-link-submenu")).forEach(element => {
                element.classList.add("hidden")
            })
        }
    },
    makeActive(menu) {
        Array.from(document.getElementsByClassName("sidebar-link")).forEach(element => {
            if (element.classList.contains("active")) element.classList.remove("active")
        })
        document.getElementById(menu).classList.add("active")
    },
    collapseDropdown(submenu) {
        if(document.getElementById("sidebar").classList.contains("closed")) this.collapseSidebar()
        this.makeActive(submenu.replace("Submenu", "Menu"))
        document.getElementById(submenu).classList.toggle("hidden")
    },
    reverseSortingOrder() {
        this.$emit('reverse-sort-order-event')
        this.makeActive("sortingOrderMenu")
        document.getElementById("decreasing-sorting-order-icon").classList.toggle("hidden")
        document.getElementById("increasing-sorting-order-icon").classList.toggle("hidden")
    },
    updateCardSize(input) {
        document.getElementById("range-counter").innerHTML = input;
        this.$emit('card-size-update-event');
    }
  }
};
</script>

<style>
#sidebar {
    width: 280px;
    height: 100vh;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #5365b4;
    display: flex;
    justify-content: flex-end;
}

#sidebar .sidebar-link {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-top: 10px;
    padding-bottom: 10px;
}

#sidebar .sidebar-link.active {
    background: #5365b4;
}

#sidebar .sidebar-link:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar .sidebar-link svg {
    font-size: 1.5em;
    padding: 10px;
    width: 30px;
}

#sidebar .sidebar-link-text {
    padding: 10px;
    font-size: 1.5em;
}

#sidebar .sidebar-link-submenu {
    background: #8494d4;
}

/* Shrinking the sidebar from 250px to 80px and center aligining its content*/
#sidebar.closed {
    min-width: 80px;
    max-width: 80px;
}

#sidebar.closed .sidebar-header {
    justify-content: center;
}

#sidebar.closed .sidebar-link {
    justify-content: center;
}

#sidebar.closed .sidebar-link svg {
    font-size: 2em;
}

.hidden {
    display: none
}

.range-input {
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 15px;
    margin-bottom: 5px;
}

.range-counter {
    margin-bottom: 10px;
}
</style>