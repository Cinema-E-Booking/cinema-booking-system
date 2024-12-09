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

export async function newMovie (movie: Movie) {
    try {
        const response = await fetch('./api/newMovie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        })

        return true;
    } catch (err) {
        console.log(err);
    }

    return null;
}