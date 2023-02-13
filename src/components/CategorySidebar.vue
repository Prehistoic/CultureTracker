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
                    Change size of cards with a cool zipper here
                </div>  
            </li>
            <li>
                <div class="sidebar-link" id="sortMenu" @click="collapseDropdown('sortSubmenu')">
                    <fa-icon icon="filter"/>
                    <div class="sidebar-link-text hidden">Sorting on...</div>
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
                    <fa-icon id="decreasing-sorting-order-icon" class="hidden" icon="arrow-up-wide-short"/>
                    <fa-icon id="increasing-sorting-order-icon" icon="arrow-down-wide-short"/>
                    <div class="sidebar-link-text hidden">Reverse sorting</div>
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
        this.$router.push({ name: 'Home'})
    },
    collapseSidebar() {
        document.getElementById("sidebar").classList.toggle("closed")
        document.getElementById("closed-sidebar-icon").classList.toggle("hidden")
        document.getElementById("opened-sidebar-icon").classList.toggle("hidden")
        Array.from(document.getElementsByClassName("sidebar-link-text")).forEach(element => {
            element.classList.toggle("hidden")
        });
    },
    makeActive(menu) {
        Array.from(document.getElementsByClassName("active")).forEach(element => {
            element.classList.remove("active")
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
    }
  }
};
</script>

<style>
#sidebar {
    width: 250px;
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

#sidebar .components {
    padding: 20px 0;
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
</style>