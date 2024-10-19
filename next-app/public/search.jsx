async function getAllMovies() {
  const resp = await fetch("http://localhost:3001/movie");
  return await resp.json();
}

async function searchByTitle(title) {
  const u = new URL("http://localhost:3001/movie");
  u.searchParams.set("term", title);
  const resp = await fetch(u.toString());
  return await resp.json();
}

function createMovie(m) {
  const div = document.createElement("div");
  div.setAttribute("class", "movie");

  // The rubric asks for a embedded movie trialer, so this can replace the poster unless we decide we like the poster better
  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", m.trailerVideoUrl);
  iframe.setAttribute("alt", `${m.title} Poster`);
  iframe.setAttribute("height", "300");

  /* 
  const img = document.createElement("img");
  img.setAttribute("src", m.trailerPictureUrl);
  img.setAttribute("alt", `${m.title} Poster`);
  img.setAttribute("height", "300");
  */

  const h3 = document.createElement("h3");
  h3.textContent = m.title;

  const p = document.createElement("p");
  p.textContent = m.synopsis;

  const a = document.createElement("a");
  // Always going to link to movie 1 since she said we didn't have to deal with links between pages
  a.setAttribute("href", "booking.html?movie=Movie1");
  a.setAttribute("class", "btn");
  a.textContent = "Book Now";

  div.appendChild(iframe);
  //div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(a);

  return div;
}

async function populateSearchResults(movies) {
  const nowShowingGrid = document.querySelector("#now-showing");
  nowShowingGrid.textContent = "";

  const comingSoonGrid = document.querySelector("#coming-soon");
  comingSoonGrid.textContent = "";

  const nowShowing = movies.filter(m => m.currentlyRunning);
  const comingSoon = movies.filter(m => !m.currentlyRunning);

  nowShowingElements = nowShowing.map(m => createMovie(m));
  for (const element of nowShowingElements) {
    nowShowingGrid.appendChild(element);
  }

  comingSoonElements = comingSoon.map(m => createMovie(m));
  for (const element of comingSoonElements) {
    comingSoonGrid.appendChild(element);
  }
}

const searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", async () => {
  const searchInput = document.querySelector("#search-bar");

  let movies;
  if (searchInput.value.trim() === "") {
    movies = await getAllMovies();
  } else {
    movies = await searchByTitle(searchInput.value.trim());
  }
  populateSearchResults(movies);
});

(async () => populateSearchResults(await getAllMovies()))();


// document.getElementById('search-btn').addEventListener('click', function() {
//     const searchTerm = document.getElementById('search-bar').value.toLowerCase();
//     const selectedGenre = document.getElementById('genre-dropdown').value.toLowerCase();
//     const movies = document.querySelectorAll('.movie');
// 
//     movies.forEach(movie => {
//         const title = movie.getAttribute('data-title').toLowerCase();
//         const genre = movie.getAttribute('data-genre').toLowerCase();
// 
//         // Check if the movie matches the search term AND the selected genre
//         const matchesSearch = title.includes(searchTerm);
//         const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;
// 
//         if (matchesSearch && matchesGenre) {
//             movie.style.display = 'block';  // Show the movie if it matches the criteria
//         } else {
//             movie.style.display = 'none';   // Hide the movie if it doesn't match
//         }
//     });
// });
