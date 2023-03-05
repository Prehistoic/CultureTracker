<script>
import Book from '@/models/books';
import Manga from '@/models/mangas';
import Webtoon from '@/models/webtoons';
import Comic from '@/models/comics';
import Movie from '@/models/movies';
import Anime from '@/models/animes';
import Serie from '@/models/series';
import Game from '@/models/games';

export default {
  name: "CategoryNewMacroModal",
  emits: {
    closeNewMacroEvent: null
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        genres: [],
        temp_cover_filename: "",
    }
  },
  methods: {
    close() {
        this.$emit('closeNewMacroEvent');
    },
    getRating() {
        let rating = 0
        const ratingSpans = document.getElementsByClassName("macro-rating-span");
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
    saveMacroAsset() {
        const fs = window.require('fs');

        const title = document.getElementById("macroTitle").value;
        const genres = this.genres.target;
        const cover_url = this.temp_cover_filename;
        const synopsys = document.getElementById("macroSynopsys").value;
        const comment = document.getElementById("macroComment").value;
        const rating = this.getRating();

        if (title == "" | synopsys == "" | comment == "" | cover_url == "") {
          this.$toast.error("Missing elements !", { position: 'bottom', duration: 1500});
        } else {
          let new_macro_asset = null;
          switch(this.category) {
            case "books":
              new_macro_asset = Book.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "mangas":
              new_macro_asset = Manga.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "webtoons":
              new_macro_asset = Webtoon.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "comics":
              new_macro_asset = Comic.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "movies":
              new_macro_asset = Movie.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "series":
              new_macro_asset = Serie.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            case "animes":
              new_macro_asset = Anime.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
              break;
            default:
              new_macro_asset = Game.MacroAssetInstance(title, genres, cover_url, synopsys, rating, comment);
          }

          let new_macro_asset_data = JSON.parse(JSON.stringify(new_macro_asset));
          let current_assets_data = JSON.parse(fs.readFileSync("src/data/" + this.category + ".json"))
          current_assets_data["assets"].push(new_macro_asset_data);
          fs.writeFileSync("src/data/" + this.category + ".json", JSON.stringify(current_assets_data));

          this.saveCover();

          this.close();
        }
    },
    clickUploadCoverInput() {
      this.$refs.macroCoverUpload.click();
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
  },
  mounted() {
    document.querySelector('#macro-rating').addEventListener('click', function(e) {
      let action = 'add';
      for (const span of this.children) {
        span.classList[action]('active');
        if (span === e.target) action = 'remove';
      }
    });

    const macroGenresInput = document.getElementById("macroGenres");
    macroGenresInput.addEventListener("keyup", this.addTag);
  }
}
</script>

<template>
<transition name="modal-fade">
<div class="new-macro-asset-modal-backdrop">
    <div class="new-macro-asset-modal" role="dialog" aria-labelledby="macroModalTitle" aria-describedby="macroModalDescription">
      <header class="new-macro-asset-modal-header" id="macroModalTitle">
        <slot name="header" >NEW SERIES</slot>
      </header>

      <section class="new-macro-asset-modal-body" id="macroModalDescription">
        <div class="new-macro-asset-modal-body-left">
          <div id="macroCoverLoader" class="macro-cover-loader" 
            :style="this.temp_cover_filename != '' ? { 'background-image':  'url(' + require(`@/data/temp/${this.temp_cover_filename}`) } : { }"
          ></div>
          <input type="file" @change="uploadCover" ref="macroCoverUpload" style="display: none" accept=".png,.jpg,.jpeg">
          <button type="button" class="btn btn-primary macro-cover-upload-btn" @click="clickUploadCoverInput()">UPLOAD</button>

          <div class="macro-rating-title">RATING</div>
          <div id="macro-rating">
            <span class="macro-rating-span active"></span>
            <span class="macro-rating-span active"></span>
            <span class="macro-rating-span active"></span>
            <span class="macro-rating-span active"></span>
            <span class="macro-rating-span active"></span>
          </div>
        </div>
        <div class="new-macro-asset-modal-body-right">
          <div class="macro-title-input-row">
            <div class="form-group macro-title-input">
              <label for="macroTitle">Title</label>
              <input type="text" spellcheck="false" class="form-control" id="macroTitle" placeholder="Enter a title...">
            </div>
          </div>

          <div class="form-group">
            <label for="macroGenres">Genres</label>
            <ul id="macroGenresList" class="macro-genres-list">
              <li v-for="(tag, index) in this.genres" :key="index">
                {{ tag }}
                <fa-icon icon="xmark" @click="this.removeTag(tag)" />
              </li>
              <input type="text" spellcheck="false" id="macroGenres" class="macro-genres-input">
            </ul>
          </div>

            <div class="form-group">
              <label for="macroSynopsys">Synopsys</label>
              <textarea spellcheck="false" class="form-control" id="macroSynopsys" rows="8" placeholder="Enter a synopsys..."></textarea>
            </div>

            <div class="form-group">
              <label for="macroComment">Comment</label>
              <textarea spellcheck="false" class="form-control" id="macroComment" rows="8" placeholder="Enter a comment..."></textarea>
            </div>
        </div>
      </section>

      <footer class="new-macro-asset-modal-footer">
        <div class="macro-action-buttons">
          <button type="button" class="btn btn-secondary macro-cancel-button" @click="this.close()">CANCEL</button>
          <button type="button" class="btn btn-success macro-create-button" @click="this.saveMacroAsset()">CREATE</button>
        </div>
      </footer>
    </div>
  </div>
  </transition>
</template>

<style>
  .new-macro-asset-modal-backdrop {
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

  .new-macro-asset-modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 95%;
    margin-top: 1%;
    margin-left: 5%;
  }

  .new-macro-asset-modal-header,
  .new-macro-asset-modal-footer {
    padding: 15px;
    display: flex;
  }

  .new-macro-asset-modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: white;
    background: #6b81d6;
    justify-content: space-between;
    font-weight: bold;
  }

  .new-macro-asset-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
    font-weight: bold;
  }

  .new-macro-asset-modal-body {
    position: relative;
    padding: 20px 10px;
    display: flex;
    height: 100%;
  }

  .new-macro-asset-modal-body-left {
    width: 25%;
  }

  .macro-cover-loader {
    width: 80%;
    height: 50%;
    border: solid 1px black;
    margin-bottom: 5%;
    margin-left: auto;
    margin-right: auto;
    background-size: contain;
  }

  .macro-cover-upload-btn {
    width: 80%;
    margin-bottom: 5%;
  }

  .macro-rating-title {
    margin-top: 25%;
    font-size: 1.8em;
  }

  #macro-rating { font-size: 0; color: gold; }
  #macro-rating span { font-size: 60px; }
  #macro-rating span::before { content: "☆"; }
  #macro-rating span.active::before {content: "★"; }
  #macro-rating span:hover { cursor: pointer; }

  .new-macro-asset-modal-body-right {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 1%;
  }

  .new-macro-asset-modal-body-right label {
    margin-bottom: 5px;
  }

  .form-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .macro-title-input-row {
    display: flex;
  }

  .macro-title-input {
    width: 100%;
  }

  .macro-genres-input {
    flex: 1;
    padding: 5px;
    border: none;
    outline: none;
    font-size: 16px;
  }

  .macro-genres-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #a6a6a6;
  }

  .macro-genres-list li {
    color: #333;
    margin: 4px 3px;
    list-style: none;
    border-radius: 5px;
    background: #F2F2F2;
    padding: 5px 8px 5px 10px;
    border: 1px solid #e3e1e1;
  }

  .macro-genres-list li svg {
    cursor: pointer;
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

  .macro-action-buttons {
    justify-self: end;
  }

  .macro-create-button {
    margin-left: 20px;
  }
</style>