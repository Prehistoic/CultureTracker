export default class Anime {

    title;
    director;
    release_date;
    season_id;
    episode_count;
    genres;
    cover_url;
    start_date;
    end_date;
    finished;
    synopsys;
    rating;
    comment;
    is_macro_asset;
    sub_assets;

    constructor(_title, _director, _release_date, _season_id, _episode_count, _genres, _cover_url, _start_date, _end_date, _finished, _synopsys, _rating, _comment, _is_macro_asset=false, _sub_assets=[]) {
        this.title = _title;
        this.director = _director;
        this.release_date = _release_date;
        this.season_id = _season_id;
        this.episode_count = _episode_count;
        this.genres = _genres;
        this.cover_url = _cover_url;
        this.start_date = _start_date;
        this.end_date = _end_date;
        this.finished = _finished;
        this.synopsys = _synopsys;
        this.rating = _rating;
        this.comment = _comment;
        this.is_macro_asset = _is_macro_asset;
        this.sub_assets = _sub_assets;
    }

    static MacroAssetInstance(_title, _genres, _cover_url, _synopsys, _rating, _comment) {
        return new Anime(_title, "", "", 0, 0, _genres, _cover_url, "", "", false, _synopsys, _rating, _comment, true);
    }
}