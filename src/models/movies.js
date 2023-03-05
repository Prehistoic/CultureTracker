export default class Movie {

    title;
    director;
    release_date;
    duration;
    volume_id;
    genres;
    cover_url;
    watch_date;
    finished;
    synopsys;
    rating;
    comment;
    is_macro_asset;
    sub_assets;

    constructor(_title, _director, _release_date, _duration, _volume_id, _genres, _cover_url, _watch_date, _finished, _synopsys, _rating, _comment, _is_macro_asset=false, _sub_assets=[]) {
        this.title = _title;
        this.director = _director;
        this.release_date = _release_date;
        this.duration = _duration;
        this.volume_id = _volume_id;
        this.genres = _genres;
        this.cover_url = _cover_url;
        this.watch_date = _watch_date;
        this.finished = _finished;
        this.synopsys = _synopsys;
        this.rating = _rating;
        this.comment = _comment;
        this.is_macro_asset = _is_macro_asset;
        this.sub_assets = _sub_assets;
    }

    static MacroAssetInstance(_title, _genres, _cover_url, _synopsys, _rating, _comment) {
        return new Movie(_title, "", "", 0, 0, _genres, _cover_url, "", false, _synopsys, _rating, _comment, true);
    }
}