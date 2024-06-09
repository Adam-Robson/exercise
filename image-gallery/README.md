# MDN Image Gallery

This project is an activity that is included in the JavaScript Guide from [MDN](https://developer.mozilla.org/en-US/). Learning fun!

## Implementation of Image gallery

Directives:

1. Declare a const array listing the filenames of each image, such as
    'pic1.jpg'.

2. Declare a const object listing the alternative text for each image.

3. Loop through the array of filenames, and for each one, insert an `<img>`
    element inside the thumb-bar `<div>` that embeds that image in the page
    along with its alternative text.

4. Add a click event listener to each `<img>` inside the thumb-bar `<div>` so
    that, when they are clicked, the corresponding image and alternative text
    are displayed in the displayed-img `<img>` element.

5. Add a click event listener to the `<button>` so that when it is clicked, a
   darken effect is applied to the full-size image. When it is clicked again,
   the darken effect is removed again.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run main.js
```

This project was created using `bun init` in bun v1.1.12. [Bun](https://bun.sh)
  is a fast all-in-one JavaScript runtime.
  