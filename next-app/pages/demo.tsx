import Head from "next/head"
import { newMovie } from "../lib/api_references/movies"

export default function demo() {

    interface Movie {
        title: string,
        category: string,
        rating: string,
        synopsis: string,
        trailer_url: string,
        image_url: string,
        duration: string,
        director: string,
        producer: string,
        actors: string[],
    };
    
    const movie1: Movie = {
        title: "Inception",
        category: "Now Showing",
        rating: "pg-13",
        synopsis: "A skilled thief is given a chance to have his criminal history erased if he can successfully perform inception: planting an idea in someone's mind.",
        trailer_url: "YoHD9XEInc0?si=wtXEOBUGkgK1CDyo",
        image_url: "https://upload.wikimedia.org/wikipedia/en/1/18/Inception_OST.jpg",
        duration: "148 minutes",
        director: "Christopher Nolan",
        producer: "Christopher Nolan / Emma Thomas",
        actors: ["Many famous actors ", "More famous actors "]
    };
    
    const movie2: Movie = {
        title: "The Shawshank Redemption",
        category: "Now Showing",
        rating: "r",
        synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        trailer_url: "PLl99DlL6b4?si=BS73pGTUpjwb-Glw",
        image_url: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
        duration: "142 minutes",
        director: "Frank Darabont",
        producer: "Frank Darabont",
        actors: ["Many famous actors ", "Other actors "]
    };
    
    const movie3: Movie = {
        title: "The Dark Knight",
        category: "Coming Soon",
        rating: "pg-13",
        synopsis: "Batman faces a new foe, the Joker, who wants to create chaos in Gotham City while testing Batman's moral limits.",
        trailer_url: "EXeTwQWrcwY?si=yWiAYf1VsfMwpypL",
        image_url: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        duration: "152 minutes",
        director: "Christopher Nolan",
        producer: "Christopher Nolan / Emma Thomas / Charles Roven",
        actors: ["Christian Bale ", "Cool Guy #2 "]
    };

    const movie4: Movie = {
        title: "Mad Max: Fury Road",
        category: "Now Showing",
        rating: "r",
        synopsis: "In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrannical warlord and his army of psychopaths.",
        trailer_url: "hEJnMQG9ev8?si=ffBRCHceZjLuCqBl",
        image_url: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg",
        duration: "120 minutes",
        director: "George Miller",
        producer: "George Miller / Doug Mitchell / P.J. Voeten",
        actors: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"]
    };

    const movie5: Movie = {
        title: "Crazy Rich Asians",
        category: "Coming Soon",
        rating: "pg-13",
        synopsis: "A woman discovers that her boyfriend is from one of the wealthiest families in Singapore and must navigate the challenges of his high-society world.",
        trailer_url: "ZQ-YX-5bAs0?si=yiOa_F-qij13JL6E",
        image_url: "https://upload.wikimedia.org/wikipedia/en/b/ba/Crazy_Rich_Asians_poster.png",
        duration: "121 minutes",
        director: "Jon M. Chu",
        producer: "Nina Jacobson / John Penotti / Brad Simpson",
        actors: ["Constance Wu", "Henry Golding", "Michelle Yeoh"]
    };

    const movie6: Movie = {
        title: "A Quiet Place",
        category: "Now Showing",
        rating: "pg-13",
        synopsis: "In a world where monsters hunt by sound, a family must live in silence to survive while trying to find a way to fight back.",
        trailer_url: "WR7cc5t7tv8?si=jR_5H7LVY83BxH7j",
        image_url: "https://upload.wikimedia.org/wikipedia/en/a/a0/A_Quiet_Place_film_poster.png",
        duration: "90 minutes",
        director: "John Krasinski",
        producer: "Michael Bay / Andrew Form / Brad Fuller",
        actors: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"]
    };

    const createMovie = async (movieData: Movie) => {
        const response = await newMovie(movieData);

        if (response) {

        } else {
            console.log('Something went wrong')
        }
    }

    interface Seat {
        id: number;
        row: number;
        number: number;
    }

    interface Showroom {
        name: string,
        seats: {
            row: number;
            number: number;
        }[]
    };

    const showRoom1: Showroom = {
        name: 'Auditorium 1',
        seats: [
            {row: 1, number: 6},
            {row: 2, number: 6},
            {row: 3, number: 6},
            {row: 4, number: 6},
            {row: 5, number: 6},
            {row: 6, number: 6},
        ]       
    }

    const showRoom2: Showroom = {
        name: 'Auditorium 2',
        seats: [
            {row: 1, number: 6},
            {row: 2, number: 6},
            {row: 3, number: 6},
            {row: 4, number: 6},
            {row: 5, number: 6},
            {row: 6, number: 6},
        ]       
    }

    const showRoom3: Showroom = {
        name: 'Auditorium 3',
        seats: [
            {row: 1, number: 6},
            {row: 2, number: 6},
            {row: 3, number: 6},
            {row: 4, number: 6},
            {row: 5, number: 6},
            {row: 6, number: 6},
        ]       
    }

    const createShowRoom = async (showroomData: Showroom) => {
        const response = await fetch('./api/newShowroom', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(showroomData),
        })
    }

    const createData = async () => {

        createMovie(movie1);
        createMovie(movie2);
        createMovie(movie3);
        createMovie(movie4);
        createMovie(movie5);
        createMovie(movie6);

        createShowRoom(showRoom1);
        createShowRoom(showRoom2);
        createShowRoom(showRoom3);

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