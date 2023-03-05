export default class Game {

    title;
    studio;
    release_date;
    genres;
    cover_url;
    start_date;
    end_date;
    time_played;
    finished;
    synopsys;
    rating;
    comment;
    is_macro_asset;
    sub_assets;

    constructor(_title, _studio, _release_date, _genres, _cover_url, _start_date, _end_date, _time_played, _finished, _synopsys, _rating, _comment, _is_macro_asset=false, _sub_assets=[]) {
        this.title = _title;
        this.studio = _studio;
        this.release_date = _release_date;
        this.genres = _genres;
        this.cover_url = _cover_url;
        this.start_date = _start_date;
        this.end_date = _end_date;
        this.time_played = _time_played;
        this.finished = _finished;
        this.synopsys = _synopsys;
        this.rating = _rating;
        this.comment = _comment;
        this.is_macro_asset = _is_macro_asset;
        this.sub_assets = _sub_assets;
    }

    static MacroAssetInstance(_title, _genres, _cover_url, _synopsys, _rating, _comment) {
        return new Game(_title, "", "", _genres, _cover_url, "", "", 0, false, _synopsys, _rating, _comment, true);
    }
}