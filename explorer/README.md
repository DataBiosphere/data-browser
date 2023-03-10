This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Image Optimization

For optimizing images at build time we're using [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images). This is necessary since
we are exporting the application into html files, so NextJs built-in image optimizations won't work.  
To work alongside this library we also need to install the optimization packages we want. For this project we're using:  
- [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg) - Optimizes JPEG images
- [imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng) - Optimizes PNG images
- [imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo) - Optimizes SVG images

Static image optimizations will be handle by the `<StaticImage>` component, which should receive a `StaticImageData` as `src`. To do that, just import a image (placed under the `images` folder) using ES Modules, othersiwe the image src would be just a string and expected to be served by a third source, like a S3 bucket.

```
    import Image from "images/myImage.png"
```



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
