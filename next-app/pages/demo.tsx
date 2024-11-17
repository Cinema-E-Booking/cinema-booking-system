import Head from "next/head"

export default function demo() {

    interface Movie {
        title: string,
        category: string,
        rating: string,
        synopsis: string,
        trailer_url: string,
        image_url: string,
        duration: string,
    }
    
    const movie1: Movie = {
        title: "Inception",
        category: "Now Showing",
        rating: "pg-13",
        synopsis: "A skilled thief is given a chance to have his criminal history erased if he can successfully perform inception: planting an idea in someone's mind.",
        trailer_url: "YoHD9XEInc0?si=wtXEOBUGkgK1CDyo",
        image_url: "https://upload.wikimedia.org/wikipedia/en/1/18/Inception_OST.jpg",
        duration: "148 minutes",
    };
    
    const movie2: Movie = {
        title: "The Shawshank Redemption",
        category: "Now Showing",
        rating: "r",
        synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        trailer_url: "PLl99DlL6b4?si=BS73pGTUpjwb-Glw",
        image_url: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
        duration: "142 minutes",
    };
    
    const movie3: Movie = {
        title: "The Dark Knight",
        category: "Coming Soon",
        rating: "pg-13",
        synopsis: "Batman faces a new foe, the Joker, who wants to create chaos in Gotham City while testing Batman's moral limits.",
        trailer_url: "EXeTwQWrcwY?si=yWiAYf1VsfMwpypL",
        image_url: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        duration: "152 minutes",
    };

    const createMovie = async (movieData: Movie) => {
        const response = await fetch('./api/newMovie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        })
    }

    const createData = async () => {

        createMovie(movie1);
        createMovie(movie2);
        createMovie(movie3);

        return null;
    }

    return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Load Demo Data </title>
    </Head>
    <div className="container">
        <button onClick={createData}>Click To Load Demo Data</button>
    </div>
    </>
    )
}