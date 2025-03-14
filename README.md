# Blog - Bit2Byte

This is a simple Next.js blog application that fetches and displays a collection of blog posts. Each blog has a title, description, and optional image, with a "Read More" link leading to the full post.

## Features

* Displays a list of blogs from markdown files.
* Shows blog title, description, and image.
* Responsive design with a grid layout.
* Option to view individual blog posts by clicking "Read More".
* Fallback image for blogs without an image.
* dark mode for better accessibility.

## Future Improvements

* Add pagination for large numbers of blogs.
* Implement a blog search feature.
* Enhance SEO with dynamic meta tags per blog post.
* Implement a blog category or tag system.
* Add sorting and filtering options for blogs.
* Add social sharing buttons on each blog post.
* lazy loading techniques.(skeletons)

```sh
docker compose run --build --rm blogsite npm install

docker compose up --build --remove-orphans
```
