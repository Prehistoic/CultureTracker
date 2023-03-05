<script>
import Book from "@/models/books"
import Openlibrary from "@/sources/openlibrary";
import CategorySearchResultsModal from "./CategorySearchResultsModal.vue";

export default {
  name: "CategoryNewBookModal",
  emits: {
    closeNewAssetEvent: null
  },
  components: {
    CategorySearchResultsModal
  },
  data() {
    return {
      genres: [],
      temp_cover_filename: "",
      currently_searching: false,
      is_visible_search_results_modal: false,
      search_results: {}
    }
  },
  methods: {
    close() {
      this.$emit('closeNewAssetEvent');
    },
    getRating() {
      let rating = 0
      const ratingSpans = document.getElementsByClassName("rating-span");
      Array.from(ratingSpans).forEach(span => {
        if (span.classList.contains("active")) {
          rating = rating + 1;
        }
      });
      return rating;
    },
    saveCover() {
      const fs = window.require('fs');
      
      const old_cover_path = "src/data/temp/" + this.temp_cover_filename;
      const new_cover_path = "src/data/covers/" + this.temp_cover_filename;
      fs.rename(old_cover_path, new_cover_path, (error) => { if (error) throw error; })

      this.temp_cover_filename = "";
    },
    saveBook() {
      const fs = window.require('fs');

      const title = document.getElementById("bookTitle").value;
      const author = document.getElementById("bookAuthor").value;
      const release_date = document.getElementById("bookReleaseDate").value;
      const volumeId = document.getElementById("bookVolumeId").value;
      const pageCount = document.getElementById("bookPageCount").value;
      const genres = this.genres.target;
      const cover_url = this.temp_cover_filename;
      const start_date= document.getElementById("bookStartDate").value;
      const end_date = document.getElementById("bookEndDate").value;
      const finished = document.getElementById("bookFinished").checked;
      const synopsys = document.getElementById("bookSynopsys").value;
      const comment = document.getElementById("bookComment").value;
      const rating = this.getRating();

      if (title == "" | author == "" | release_date == "" | start_date== "" | synopsys == "" | comment == "" | cover_url == "" | (finished && end_date == "")) {
        this.$toast.error("Missing elements !", { position: 'bottom', duration: 1500});
      } else if (new Date(start_date) > new Date(end_date) | new Date(release_date) > new Date(start_date)) {
        this.$toast.error("Problem in dates !", { position: 'bottom', duration: 1500});
      } else {
        let new_book = new Book(title, author, release_date, pageCount, volumeId, genres, cover_url, start_date, end_date, finished, synopsys, rating, comment);
        
        let new_book_data = JSON.parse(JSON.stringify(new_book));
        let books_data = JSON.parse(fs.readFileSync("src/data/books.json"))
        books_data["assets"].push(new_book_data);
        fs.writeFileSync("src/data/books.json", JSON.stringify(books_data));

        this.saveCover();

        this.close();
      }
    },
    clickUploadCoverInput() {
      this.$refs.coverUpload.click();
    },
    uploadCover(event) {
      const fs = window.require('fs');
      const path = window.require('path');
      const crypto = window.require('crypto');

      const cover_img_input_file = event.target.files[0].path;
      const cover_img_output_file = "src/data/temp/" + crypto.randomBytes(20).toString('hex') + path.extname(cover_img_input_file);
      fs.copyFile(cover_img_input_file, cover_img_output_file, (err) => { if (err) throw err });

      this.temp_cover_filename = path.basename(cover_img_output_file);
    },
    removeTag(genre) {
      let index  = this.genres.indexOf(genre);
      this.genres = [...this.genres.slice(0, index), ...this.genres.slice(index + 1)];
    },
    addTag(e) {
      if(e.key == "Enter") {
        let genre = e.target.value.replace(/\s+/g, '').trim();
        if(genre.length > 1 && !this.genres.includes(genre)){
          if(this.genres.length < 10){
            genre.split(',').forEach(tag => {
              this.genres.push(tag);
            });
          }
        }
        e.target.value = "";
      } else if (e.key == "Backspace" || e.key == "Delete") {
        if (this.genres != []) this.removeTag(this.genres[this.genres.length - 1])
      }
    },
    openSearchResultsModal() {
      this.is_visible_search_results_modal = true;
    },
    closeSearchResultsModal() {
      this.is_visible_search_results_modal = false;
    },
    searchOpenlibrary() {
      const openlibraryAPI = new Openlibrary();

      var bookTitleInput = document.getElementById("bookTitle").value;
      if (bookTitleInput != "") {
        if (bookTitleInput.length >= 3) {
          this.currently_searching = true;
          openlibraryAPI.searchByTitle(bookTitleInput)
            .then( (results) => {
              this.search_results = results;
              this.openSearchResultsModal();
              this.currently_searching = false;
            });
        } else {
          this.$toast.error("Title is too short (3 characters min) !", { position: 'bottom', duration: 1500});
        }
      } else {
        this.$toast.error("Title is empty !", { position: 'bottom', duration: 1500});
      }
    },
    updateViewChosenResult(chosen_result_index) {
      const path = window.require('path');
      const crypto = window.require("crypto");

      const bookTitle = document.getElementById("bookTitle");
      bookTitle.value = this.search_results[chosen_result_index]["title"];

      const bookAuthor = document.getElementById("bookAuthor");
      const searchResultAuthor = this.search_results[chosen_result_index]["author"];
      if (searchResultAuthor != "Unknown") bookAuthor.value = searchResultAuthor;

      const bookPageCount = document.getElementById("bookPageCount");
      const searchResultPageCount = this.search_results[chosen_result_index]["page_count"];
      if (searchResultPageCount != "Unknown") bookPageCount.value = searchResultPageCount;

      const bookReleaseDate = document.getElementById("bookReleaseDate");
      const searchResultReleaseDate = this.search_results[chosen_result_index]["release_date"];
      if (searchResultReleaseDate != "Unknown") bookReleaseDate.value = searchResultReleaseDate;

      const target_path = "src/data/temp/" + crypto.randomBytes(20).toString('hex') + ".jpg"
      const searchResultCover = this.search_results[chosen_result_index]["cover_url"];
      if (searchResultCover != "Unknown") {
        this.downloadRemoteImage(searchResultCover, target_path).then(() => {
          this.temp_cover_filename = path.basename(target_path);
        }); 
      }
    },
    downloadRemoteImage(file_url, target_path) {
      const fs = window.require("fs");
      const request = window.require("request");

      const out = fs.createWriteStream(target_path);
      return new Promise((resolve, reject) => {
        request.get(file_url, null)
          .on('response', (res) => {
            res.pipe(out);
            resolve();
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    }
  },
  mounted() {
    document.querySelector('#rating').addEventListener('click', function(e) {
        let action = 'add';
        for (const span of this.children) {
            span.classList[action]('active');
            if (span === e.target) action = 'remove';
        }
    });

    const bookGenresInput = document.getElementById("bookGenres");
    bookGenresInput.addEventListener("keyup", this.addTag);

    const finishedCheckbox = document.getElementById("bookFinished");
    finishedCheckbox.addEventListener('change', function(e) {
      const bookEndDateInput = document.getElementById("bookEndDate");
      bookEndDateInput.disabled = !e.target.checked;
      bookEndDateInput.value = "";
    });
  }
}
</script>

<template>
  <transition name="modal-fade">
    <div class="new-asset-modal-backdrop" :style="[this.is_visible_search_results_modal ? {'pointer-events': 'none'} : {}]">
      <div class="new-asset-modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="new-asset-modal-header" id="modalTitle">
            <slot name="header" >NEW BOOK</slot>
          </header>

        <section class="new-asset-modal-body" id="modalDescription">
          <div class="new-asset-modal-body-left">
            <div id="coverLoader" class="cover-loader" 
              :style="this.temp_cover_filename != '' ? { 'background-image':  'url(' + require(`@/data/temp/${this.temp_cover_filename}`) } : { }"
            ></div>
            <input type="file" @change="uploadCover" ref="coverUpload" style="display: none" accept=".png,.jpg,.jpeg">
            <button type="button" class="btn btn-primary cover-upload-btn" @click="clickUploadCoverInput()">UPLOAD</button>

            <div class="rating-title">RATING</div>
            <div id="rating">
              <span class="rating-span active"></span>
              <span class="rating-span active"></span>
              <span class="rating-span active"></span>
              <span class="rating-span active"></span>
              <span class="rating-span active"></span>
            </div>
          </div>
          <div class="new-asset-modal-body-right">
            <div class="title-input-row">
              <div class="form-group title-input">
                <label for="bookTitle">Title</label>
                <input type="text" spellcheck="false" class="form-control" id="bookTitle" placeholder="Enter a title...">
              </div>
              <button type="button" class="btn btn-primary search-btn" @click="this.searchOpenlibrary()">
                <fa-icon v-if="!this.currently_searching" icon="magnifying-glass" />
                <div v-if="this.currently_searching" class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>
            </div>

            <div class="form-group">
              <label for="bookAuthor">Author</label>
              <input type="text" spellcheck="false" class="form-control" id="bookAuthor" placeholder="Enter an author...">
            </div>

            <div class="row">
              <div class="col-4 form-group">
                <label for="bookReleaseDate">Release date</label>
                <input type="number" class="form-control" id="bookReleaseDate" min="1000" max="2100" placeholder="Enter a year...">
              </div>

              <div class="col-4 form-group">
                <label for="bookVolumeId">Volume ID</label>
                <input type="number" class="form-control" id="bookVolumeId" value="1" min="1">
              </div>

              <div class="col-4 form-group">
                <label for="bookPageCount">Page count</label>
                <input type="number" class="form-control" id="bookPageCount" min="0" max="10000" placeholder="Enter a page count...">
              </div>
            </div>

            <div class="form-group">
              <label for="bookGenres">Genres</label>
              <ul id="genresList" class="genres-list">
                <li v-for="(tag, index) in this.genres" :key="index">
                  {{ tag }}
                  <fa-icon icon="xmark" @click="this.removeTag(tag)" />
                </li>
                <input type="text" spellcheck="false" id="bookGenres" class="genres-input">
              </ul>
            </div>

            <div class="row">
              <div class="col-4 form-group">
                <label for="bookStartDate">Start date</label>
                <input type="date" class="form-control" id="bookStartDate">
              </div>

              <div class="col-4 form-group">
                <label for="bookEndDate">End date</label>
                <input type="date" class="form-control" id="bookEndDate">
              </div>

              <div class="col-4 custom-form-check">
                <div >Finished ?</div>
                <input type="checkbox" class="form-check-input" id="bookFinished" checked>
              </div>
            </div>

            <div class="form-group">
              <label for="bookSynopsys">Synopsys</label>
              <textarea spellcheck="false" class="form-control" id="bookSynopsys" rows="5" placeholder="Enter a synopsys..."></textarea>
            </div>

            <div class="form-group">
              <label for="bookComment">Comment</label>
              <textarea spellcheck="false" class="form-control" id="bookComment" rows="5" placeholder="Enter a comment..."></textarea>
            </div>
          </div>
        </section>

        <footer class="new-asset-modal-footer">
          <div class="action-buttons">
            <button type="button" class="btn btn-secondary cancel-button" @click="close()">CANCEL</button>
            <button type="button" class="btn btn-success create-button" @click="saveBook()">CREATE</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
  
  <CategorySearchResultsModal v-if="this.is_visible_search_results_modal" @closeSearchResultsEvent="this.closeSearchResultsModal()" @chosenResultEvent="this.updateViewChosenResult" :results="this.search_results"/>
</template>

<style>
  .new-asset-modal-backdrop {
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

  .new-asset-modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 95%;
    margin-top: 1%;
    margin-left: 5%;
  }

  .new-asset-modal-header,
  .new-asset-modal-footer {
    padding: 15px;
    display: flex;
  }

  .new-asset-modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: white;
    background: #6b81d6;
    justify-content: space-between;
    font-weight: bold;
  }

  .new-asset-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
    font-weight: bold;
  }

  .new-asset-modal-body {
    position: relative;
    padding: 20px 10px;
    display: flex;
    height: 100%;
  }

  .new-asset-modal-body-left {
    width: 25%;
  }

  .cover-loader {
    width: 80%;
    height: 50%;
    border: solid 1px black;
    margin-bottom: 5%;
    margin-left: auto;
    margin-right: auto;
    background-size: contain;
  }

  .cover-upload-btn {
    width: 80%;
    margin-bottom: 5%;
  }

  .rating-title {
    margin-top: 25%;
    font-size: 1.8em;
  }

  #rating { font-size: 0; color: gold; }
  #rating span { font-size: 60px; }
  #rating span::before { content: "☆"; }
  #rating span.active::before {content: "★"; }
  #rating span:hover { cursor: pointer; }

  .new-asset-modal-body-right {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 1%;
  }

  .new-asset-modal-body-right label {
    margin-bottom: 5px;
  }

  .form-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .title-input-row {
    display: flex;
  }

  .title-input {
    width: 100%;
  }

  .search-btn {
    width: 8%;
    margin-left: 2%;
  }

  .search-btn svg {
    font-size: 30px;
  }

  .genres-input {
    flex: 1;
    padding: 5px;
    border: none;
    outline: none;
    font-size: 16px;
  }

  .genres-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #a6a6a6;
  }

  .genres-list li {
    color: #333;
    margin: 4px 3px;
    list-style: none;
    border-radius: 5px;
    background: #F2F2F2;
    padding: 5px 8px 5px 10px;
    border: 1px solid #e3e1e1;
  }

  .genres-list li svg {
    cursor: pointer;
  }

  .custom-form-check {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
  }

  .form-check-input {
    margin-top: 0;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  input[type="checkbox"]:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }

  .action-buttons {
    justify-self: end;
  }

  .create-button {
    margin-left: 20px;
  }
</style>