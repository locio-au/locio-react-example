# Example: address autocomplete in React

A small Vite page that installs `@locio-au/react` from npm and puts the
autocomplete on screen, so you can try the published package rather than the
source next door.

## Run it

```sh
npm install
cp .env.example .env.local   # then paste your public key in
npm run dev
```

Open the URL Vite prints. Type a street number and name, pick a result, and the
panel underneath shows the fields that came back.

## The key

Use a **public** key (`lc_pub_...`). It carries an origin allow list, so a copy
lifted from your page does nothing anywhere else. A secret key in a browser can
be read by anyone who opens the page, and the client refuses one on sight.

Without a key the page says so and skips the search rather than firing requests
that cannot succeed.

## What to look at

`src/App.tsx` passes `styled={false}` and its own `classNames`, which is the
integration worth copying: the package ships no stylesheet into your page, and
every slot (root, label, input, list, option, status) takes a class of yours.
`src/styles.css` is the whole look: no framework, no font downloads, and
deliberately nothing like the locio or postfinder styling so a screenshot of
the example is never mistaken for the product.

`src/AddressDetails.tsx` shows which field to store. Keep
`address_detail_pid`, not the formatted line, which changes whenever G&#8209;NAF tidies
its punctuation.

## Tests

```sh
npm test
```

Covers the key gate, the labelled input, and the details panel against a fixture.

## Licence

MIT. Take it, change it, ship it.
