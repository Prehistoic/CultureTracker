export default class Openlibrary {

    max_results = 20

    async searchByTitle(title) {
        try {
            const url = "https://openlibrary.org/search.json?q=" + encodeURIComponent(title);
            const response = await fetch(url);
            const data = await response.json();

            var results = [];
            const books = data["docs"].slice(0, this.max_results)
            books.forEach(book => {
                const result = {
                    "title": "title" in book ? book["title"] : "Unknown",
                    "author": "author_name" in book ? book["author_name"][0] : "Unknown",
                    "page_count": "number_of_pages_median" in book ? book["number_of_pages_median"] : "Unknown",
                    "release_date": "first_publish_year" in book ? book["first_publish_year"] : "Unknown",
                    "cover_url": "cover_i" in book ? "https://covers.openlibrary.org/b/id/" + book["cover_i"].toString() + "-L.jpg" : "Unknown"
                };
                results.push(result);
            });
            return results;

        } catch {
            console.log("Failed to request Openlibrary Search API")
        }
    }
}