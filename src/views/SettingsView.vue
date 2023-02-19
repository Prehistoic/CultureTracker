<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      saveButtonStatus: "off"
    }
  },
  methods: {
    goToLastPage() {
      this.$router.push(this.$router.options.history.state.back);
    },
    enableSaveButton() {
      this.saveButtonStatus = "on";
    },
    disableSaveButton() {
      this.saveButtonStatus = "off";
    },
    saveButtonIsDisabled() {
      return this.saveButtonStatus == "off";
    },
    downloadDatabase() {

    },
    uploadFileToDatabase() {

    },
    initApiSettings() {
      const fs = window.require('fs');
      const default_settings = {
        "api_keys": [
          {"name":"openlibrary","value":""},
          {"name":"mangadex","value":""},
          {"name":"themoviedb","value":""},
          {"name":"myanimelist","value":""},
          {"name":"igdb","value":""},
          {"name":"lastfm","value":""}
        ]
      };
      fs.writeFileSync("src/assets/settings.json", JSON.stringify(default_settings));
    },
    readApiSettings() {
      const fs = window.require('fs');

      if (!fs.existsSync("src/assets/settings.json")) {
        this.initApiSettings();
      }

      const data = fs.readFileSync("src/assets/settings.json");
      return JSON.parse(data);
    },
    loadApiSettings() {
      var settings = this.readApiSettings();
      settings.api_keys.forEach(api_key => {
        document.getElementById(api_key.name + "ApiKey").value = api_key.value;
      });
    },
    saveApiSettings() {
      var settings = this.readApiSettings();
      settings.api_keys.forEach(api_key => {
        api_key.value = document.getElementById(api_key.name + "ApiKey").value;
      });

      const fs = window.require('fs');
      try { 
        fs.writeFileSync("src/assets/settings.json", JSON.stringify(settings), 'utf-8');
      } catch(e) { 
        alert('Failed to save settings !'); 
      }

      this.disableSaveButton();
    }
  },
  mounted() {
    this.loadApiSettings();
  }
}
</script>

<template>
  <div class="settings-topbar">
    <button type="button" class="back-button btn btn-secondary" @click="goToLastPage()">
      <fa-icon icon="left-long" />
    </button>
    <h1 class="settings-title">SETTINGS</h1>
  </div>

  <div class="settings-container">
    <fieldset class="general-settings-container">
      <legend class="general-settings-title">GENERAL</legend>

      <div class="general-database-settings-title">Database</div>
      <div class="general-database-settings-buttons">
        <button type="button" class="download-button btn btn-primary">
          <fa-icon icon="download" />
          DOWNLOAD
        </button>
        <button type="button" class="upload-button btn btn-primary">
          <fa-icon icon="upload" />
          UPLOAD
        </button>
      </div>
    </fieldset>

    <fieldset class="api-settings-container">
      <legend class="api-settings-title">APIs</legend>

      <div class="form-group row">
        <label for="openlibraryApiKey" class="col-sm-2 col-form-label">OpenLibrary</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="openlibraryApiKey" placeholder="OPENLIBRARY_API_KEY" @change="enableSaveButton()">
        </div>
      </div>
      
      <div class="form-group row">
        <label for="mangadexApiKey" class="col-sm-2 col-form-label">MangaDex</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="mangadexApiKey" placeholder="MANGADEX_API_KEY" @change="enableSaveButton()">
        </div>
      </div>

      <div class="form-group row">
        <label for="themoviedbApiKey" class="col-sm-2 col-form-label">TheMovieDB</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="themoviedbApiKey" placeholder="THEMOVIEDB_API_KEY" @change="enableSaveButton()">
        </div>
      </div>
      
      <div class="form-group row">
        <label for="myanimelistApiKey" class="col-sm-2 col-form-label">MyAnimeList</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="myanimelistApiKey" placeholder="MYANIMELIST_API_KEY" @change="enableSaveButton()">
        </div>
      </div>

      <div class="form-group row">
        <label for="igdbApiKey" class="col-sm-2 col-form-label">IGDB</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="igdbApiKey" placeholder="IGDB_API_KEY" @change="enableSaveButton()">
        </div>
      </div>

      <div class="form-group row">
        <label for="lastfmApiKey" class="col-sm-2 col-form-label">LastFM</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="lastfmApiKey" placeholder="LASTFM_API_KEY" @change="enableSaveButton()">
        </div>
      </div>

      <button type="button" class="api-settings-save-button btn btn-success" @click="saveApiSettings()" :disabled="saveButtonIsDisabled()">
        <fa-icon icon="floppy-disk" />
        SAVE
      </button>
    </fieldset>
  </div>
</template>

<style>
.settings-topbar {
  display: flex;
  justify-items: center;
  width: 100%;
  padding: 20px;
}

.back-button {
  margin-left: 20px;
  width: 5%;
  z-index: 2;
}

.settings-title {
  flex: 1;
  display: flex;
  justify-content: center;
  transform: translateX(-50px);
  z-index: 1;
}

.settings-container {
  display: flex;
  justify-content: space-around;
}

fieldset {
  width: 45%;
  border: 1px groove #ddd !important;
  padding: 0 2em 2em 2em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow:  0px 0px 0px 0px #000;
          box-shadow:  0px 0px 0px 0px #000;
}

legend {
  float: none;
  width: 50%;
}

.general-database-settings-title {
  text-align: start;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 15px;;
}

.general-database-settings-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.general-database-settings-buttons button {
  width: 30%;
}

.api-settings-container .row {
  margin-bottom: 20px;
}

.api-settings-save-button {
  margin-top: 20px;
  width: 30%;
}

svg {
  margin-right: 5px;
}
</style>