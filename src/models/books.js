export default class Book {

    title = "";
    author = "";
    release_date = "";
    page_count = 0;
    volume_id = 0;
    genres = [];
    cover_url = "";
    start_date = "";
    end_date = "";
    finished = false;
    synopsys = "";
    stars = 5;
    comment = "";

    constructor(_title, _author, _release_date, _page_count, _volume_id, _genres, _cover_url, _start_date, _end_date, _finished, _synopsys, _stars, _comment) {
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
        this.stars = _stars;
        this.comment = _comment;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getReleaseDate() {
        return this.release_date;
    }

    getPageCount() {
        return this.page_count;
    }

    getVolumeId() {
        return this.volume_id;
    }

    getGenres() {
        return this.genres;
    }

    getCoverUrl() {
        return this.cover_url;
    }

    getStartDate() {
        return this.start_date;
    }

    getEndDate() {
        return this.end_date;
    }

    getFinished() {
        return this.finished;
    }

    getSynopsys() {
        return this.synopsys;
    }

    getStars() {
        return this.stars;
    }

    getComment() {
        return this.comment;
    }

}