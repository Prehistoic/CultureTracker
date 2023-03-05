export default class Comic {

    title;
    author;
    release_date;
    page_count;
    volume_id;
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

    constructor(_title, _author, _release_date, _page_count, _volume_id, _genres, _cover_url, _start_date, _end_date, _finished, _synopsys, _rating, _comment, _is_macro_asset=false, _sub_assets=[]) {
        this.title = _title;
        this.author = _author;
        this.release_date = _release_date;
        this.page_count = _page_count;
        this.volume_id = _volume_id;
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
        return new Comic(_title, "", "", 0, 0, _genres, _cover_url, "", "", false, _synopsys, _rating, _comment, true);
    }
}