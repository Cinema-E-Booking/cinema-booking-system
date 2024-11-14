import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MoviePage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [trailer_url, setTrailer] = useState('');
    const [image_url, setImage] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();
    const data = router.query;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/getMovie?id=${data.id}`);
                const result = await response.json();
                if (response.ok) {
                    setTitle(result.result.title);
                    setRating(result.result.rating);
                    setDuration(result.result.duration);
                    setSynopsis(result.result.synopsis);
                    setImage(result.result.image_url);
                    setTrailer('https://www.youtube.com/embed/' + result.result.trailer_url);
                    setCategory(result.result.category);
                } else {
                    setError('Movie not found');
                }
            } catch (error) {
                setError("An error occurred while fetching movie.");
            }
        };
    
        if(data) {
            fetchMovie();
        }
    }, [data.id]);

    if (error) {
        return <div>{error}</div>;
    }

    useEffect(() => {
        console.log('movie page title check:', title);
    }, [title]);
    //{image_url && <img src={image_url} alt={title} />}

    return (
        <div className="movie-page">
            {title ? (
                <>
                    <h1>{title}</h1>
                    <p><button>Book Movie</button></p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Synopsis:</strong> {synopsis}</p>
                    <p><strong>{category}</strong></p>
                    {trailer_url && (
                        <div>
                            <h2>Trailer</h2>
                            <iframe
                                width="560"
                                height="315"
                                src={trailer_url}
                                title={`${title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default MoviePage;