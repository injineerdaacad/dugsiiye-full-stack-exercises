import "dotenv/config";
import { MongoClient } from "mongodb";
import type { Movie } from "../models/movie";
import type { User } from "../models/user";
import type { Review } from "../models/review";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB ?? "exercise5_movies";

const movies: Movie[] = [
  { title: "Dune", year: 2021, genre: "sci-fi", rating: 8.0, director: "Denis Villeneuve", description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset." },
  { title: "Blade Runner 2049", year: 2017, genre: "sci-fi", rating: 8.0, director: "Denis Villeneuve", description: "A young blade runner unearths a long-buried secret that leads him to track down former blade runner Rick Deckard." },
  { title: "Interstellar", year: 2014, genre: "sci-fi", rating: 8.7, director: "Christopher Nolan", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { title: "The Matrix", year: 1999, genre: "sci-fi", rating: 8.7, director: "Lana Wachowski", description: "A computer hacker learns about the true nature of his reality." },
  { title: "Arrival", year: 2016, genre: "sci-fi", rating: 7.9, director: "Denis Villeneuve", description: "A linguist works with the military to communicate with alien lifeforms." },
  { title: "The Godfather", year: 1972, genre: "crime", rating: 9.2, director: "Francis Ford Coppola", description: "The aging patriarch of an organized crime dynasty transfers control to his son." },
  { title: "Goodfellas", year: 1990, genre: "crime", rating: 8.7, director: "Martin Scorsese", description: "The story of Henry Hill and his life in the mob." },
  { title: "Parasite", year: 2019, genre: "drama", rating: 8.5, director: "Bong Joon-ho", description: "Greed and class discrimination threaten the newly formed symbiotic relationship between two families." },
  { title: "Whiplash", year: 2014, genre: "drama", rating: 8.5, director: "Damien Chazelle", description: "A young drummer enrolls at a cutthroat music conservatory." },
  { title: "The Grand Budapest Hotel", year: 2014, genre: "comedy", rating: 8.1, director: "Wes Anderson", description: "The adventures of a legendary concierge and his protégé." },
  { title: "Superbad", year: 2007, genre: "comedy", rating: 7.6, director: "Greg Mottola", description: "Two co-dependent high school seniors are forced to deal with separation anxiety." },
  { title: "Get Out", year: 2017, genre: "horror", rating: 7.8, director: "Jordan Peele", description: "A young African-American man visits his white girlfriend's family estate." },
  { title: "Hereditary", year: 2018, genre: "horror", rating: 7.3, director: "Ari Aster", description: "A grieving family is haunted by tragedy and disturbing secrets." },
  { title: "Mad Max: Fury Road", year: 2015, genre: "action", rating: 8.1, director: "George Miller", description: "In a post-apocalyptic wasteland, Max teams up with a rebellious warrior." },
  { title: "John Wick", year: 2014, genre: "action", rating: 7.4, director: "Chad Stahelski", description: "An ex-hitman comes out of retirement to track down the gangsters who took everything from him." },
];

const users: User[] = [
  { name: "Amina Hassan", email: "amina@example.com", age: 28, favorite_genre: "sci-fi" },
  { name: "Mohamed Yusuf", email: "mohamed@example.com", age: 34, favorite_genre: "action" },
  { name: "Fatima Ali", email: "fatima@example.com", age: 22, favorite_genre: "drama" },
  { name: "Omar Ahmed", email: "omar@example.com", age: 45, favorite_genre: "crime" },
  { name: "Zainab Warsame", email: "zainab@example.com", age: 19, favorite_genre: "comedy" },
  { name: "Abdi Farah", email: "abdi@example.com", age: 31, favorite_genre: "horror" },
  { name: "Hodan Mohamud", email: "hodan@example.com", age: 26, favorite_genre: "sci-fi" },
  { name: "Yusuf Ibrahim", email: "yusuf@example.com", age: 52, favorite_genre: "drama" },
];

function seedReviews(): Review[] {
  const comments = [
    "Absolutely loved it, would watch again.",
    "Solid movie but a bit too long.",
    "Not my favorite, felt slow in the middle.",
    "One of the best films I've seen this year.",
    "Great performances all around.",
    "Visually stunning but the plot was thin.",
  ];
  const reviews: Review[] = [];
  for (const movie of movies.slice(0, 10)) {
    const reviewer = users[Math.floor(Math.random() * users.length)];
    reviews.push({
      movie_title: movie.title,
      user_name: reviewer.name,
      rating: Math.round((Math.random() * 4 + 6) * 10) / 10,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(2024, Math.floor(Math.random() * 12), 1).toISOString().slice(0, 10),
    });
  }
  return reviews;
}

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  await db.collection("movies").deleteMany({});
  await db.collection("users").deleteMany({});
  await db.collection("reviews").deleteMany({});

  await db.collection<Movie>("movies").insertMany(movies);
  await db.collection<User>("users").insertMany(users);
  await db.collection<Review>("reviews").insertMany(seedReviews());

  await db.collection("movies").createIndex({ genre: 1 });
  await db.collection("movies").createIndex({ rating: 1 });
  await db.collection("users").createIndex({ age: 1 });
  await db.collection("reviews").createIndex({ movie_title: 1 });

  console.log(`Seeded ${movies.length} movies, ${users.length} users, ${await db.collection("reviews").countDocuments()} reviews.`);
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
