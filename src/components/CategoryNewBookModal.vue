<script>
import Book from "@/models/books"

export default {
    name: "CategoryNewBookModal",
    data() {
      return {
        fillMode: "AUTO",
        genres: [],
        newAsset: new Book()
      }
    },
    methods: {
      close() {
          this.$emit('close');
      },
      saveBook() {

      },
      switchFillMode() {
        this.fillMode = this.fillMode == "AUTO" ? "MANUAL" : "AUTO";
        this.cleanAndToggleDisabledInputs();
      },
      cleanAndToggleDisabledInputs() {
        const inputs = document.getElementsByTagName("input");
        Array.from(inputs).forEach(input => {
          if (input.classList.contains("auto-disabled")) {
            input.disabled = !input.disabled;
            if (input.type == "text") {
              input.value = "";
            }
            else if (input.type == "date") {
              input.value = "";
            }
            else if (input.type == "number") {
              input.value = "1";
            }
          }
        });

        const buttons = document.getElementsByTagName("button");
        Array.from(buttons).forEach(button => {
          if (button.classList.contains("auto-disabled")) {
            button.disabled = !button.disabled;
          }
        });

        this.genres = [];
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
      }
    },
    mounted() {
      document.querySelector('#rating').addEventListener('click', function (e) {
          let action = 'add';
          for (const span of this.children) {
              span.classList[action]('active');
              if (span === e.target) action = 'remove';
          }
      });

      const bookGenresInput = document.getElementById("bookGenres");
      bookGenresInput.addEventListener("keyup", this.addTag);
    }
}
</script>

<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <header class="custom-modal-header" id="modalTitle">
              <slot name="header" >NEW BOOK</slot>
            </header>
  
          <section class="modal-body" id="modalDescription">
            <div class="modal-body-left">
              <div class="cover-loader"></div>
              <button type="button" class="btn btn-primary cover-upload-btn auto-disabled" disabled>UPLOAD</button>

              <div class="rating-title">RATING</div>
              <div id="rating">
                <span class="active"></span>
                <span class="active"></span>
                <span class="active"></span>
                <span class="active"></span>
                <span class="active"></span>
              </div>
            </div>
            <div class="modal-body-right">
              <div class="form-group">
                <label for="bookTitle">Title</label>
                <input type="text" spellcheck="false" class="form-control" id="bookTitle" placeholder="Enter a title...">
              </div>

              <div class="form-group">
                <label for="bookAuthor">Author</label>
                <input type="text" spellcheck="false" class="form-control auto-disabled" id="bookAuthor" placeholder="Enter an author..." disabled>
              </div>

              <div class="row">
                <div class="col-4 form-group">
                  <label for="bookReleaseDate">Release date</label>
                  <input type="date" class="form-control auto-disabled" id="bookReleaseDate" disabled>
                </div>

                <div class="col-4 form-group">
                  <label for="bookVolumeId">Volume ID</label>
                  <input type="number" class="form-control auto-disabled" id="bookVolumeId" value="1" min="1" disabled>
                </div>

                <div class="col-4 form-group">
                  <label for="bookPageCount">Page count</label>
                  <input type="number" class="form-control auto-disabled" id="bookPageCount" value="1" disabled>
                </div>
              </div>

              <div class="form-group">
                <label for="bookGenres">Genres</label>
                <ul id="genresList" class="genres-list">
                  <li v-for="(tag, index) in this.genres" :key="index">
                    {{ tag }}
                    <fa-icon icon="xmark" @click="this.removeTag(tag)" />
                  </li>
                  <input type="text" spellcheck="false" id="bookGenres" class="genres-input auto-disabled" disabled>
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
  
          <footer class="modal-footer">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch" @click="switchFillMode()" checked>
              <label class="form-check-label" for="flexSwitch">{{ this.fillMode }}</label>
            </div>
            <div class="action-buttons">
              <button type="button" class="btn btn-secondary cancel-button" @click="close()">CANCEL</button>
              <button type="button" class="btn btn-success create-button" @click="saveBook()">CREATE</button>
            </div>
          </footer>
        </div>
      </div>
    </transition>
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
  
    .modal {
      background: #FFFFFF;
      box-shadow: 2px 2px 20px 1px;
      display: flex;
      flex-direction: column;
      width: 90%;
      height: 95%;
      margin-top: 1%;
      margin-left: 5%;
    }
  
    .custom-modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }
  
    .custom-modal-header {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      color: white;
      background: #6b81d6;
      justify-content: space-between;
      font-weight: bold;
    }
  
    .modal-footer {
      border-top: 1px solid #eeeeee;
      justify-content: space-between;
      font-weight: bold;
    }
  
    .modal-body {
      position: relative;
      padding: 20px 10px;
      display: flex;
    }

    .modal-body-left {
      width: 25%;
    }

    .cover-loader {
      width: 80%;
      height: 50%;
      border: solid 1px black;
      margin-bottom: 5%;
      margin-left: auto;
      margin-right: auto;
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

    .modal-body-right {
      width: 75%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 1%;
    }

    .modal-body-right label {
      margin-bottom: 5px;
    }

    .form-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
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

    .create-button {
      margin-left: 20px;
    }
  </style>