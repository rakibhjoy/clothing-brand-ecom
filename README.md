# Rogue & Raw

Rogue & Raw is a React and Vite streetwear storefront. It includes a browsable catalog, product variants, saved items, a shopping bag and demo checkout.

```sh
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` to check the project. `npm run preview` serves the production build locally.

Accounts, saved items, bag contents and demo orders live in the browser. Local accounts require HTTPS or localhost for password verification. Accounts from the older demo need to be recreated. Production checkout requires server-side order storage, authentication and payment or fulfillment integrations. A static host must serve `index.html` for storefront paths such as `/catalog` and `/product/wr-tee-01`.
