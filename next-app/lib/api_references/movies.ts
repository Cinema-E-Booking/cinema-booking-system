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

export async function getAllMovies () {
    try {
        const response = await fetch("./api/allMovies");
        const result = await response.json();
        if (result.data && Array.isArray(result.data.movies)) {
            const data = result.data;
            return data;
          }
    } catch (err) {
        console.log(err)
    }

    return null;
}

export async function getMovie (movieId: number) {
    try {
        const response = await fetch('./api/getMovie', {
            method: 'POST',
            body: JSON.stringify({
                movieId: movieId
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        const result = res.result;

        return result;
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function getScreenings(movieId: number) {
    try {
        const response = await fetch('./api/getScreenings', {
            method: 'POST',
            body: JSON.stringify({
              movieId: movieId,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const screenResponse = await response.json();
          const screenData = await screenResponse.response;

          return screenData;
    } catch (err) {
        console.log(err)
    }

    return null;
}

export async function getScreening(screeningId: number) {
    try {
        const response = await fetch('./api/getScreening', {
            method: 'POST',
            body: JSON.stringify({
              screeningId: screeningId,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const screenResponse = await response.json();
          const screenData = screenResponse.response;

          return screenData;
    } catch (err) {
        console.log(err)
    }

    return null;
}
