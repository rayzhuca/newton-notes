# Newton Notes

This is a project submitted for HackDavis 2024. Here is our [Devpost](https://devpost.com/software/newton-notes).

## About

Designed for students who have trouble paying attention in class, Newton Notes can transcribe your professor voice to text and generate key points and clear Cornell notes. 

The project allows notes to be saved and shared publically. All notes can be accessed in the gallery for others to download and view.

## Screenshots

<img width="1283" alt="Screenshot 2024-04-28 at 8 00 49 PM" src="https://github.com/rayzhuca/newton-notes/assets/46636772/dce9c407-9518-48a7-bc3d-c5a071df9dc8">

<img width="1278" alt="Screenshot 2024-04-28 at 8 02 42 PM" src="https://github.com/rayzhuca/newton-notes/assets/46636772/f1e1d16f-de02-42f2-914b-05dd5f88ce0a">

<img width="1280" alt="Screenshot 2024-04-28 at 8 02 49 PM" src="https://github.com/rayzhuca/newton-notes/assets/46636772/5ca34ddf-e299-4b20-9ea2-dc8df175daa6">

<img width="1281" alt="Screenshot 2024-04-28 at 8 01 10 PM" src="https://github.com/rayzhuca/newton-notes/assets/46636772/56b33791-3350-4aa3-88c0-cab6f201fae4">

<img width="1278" alt="Screenshot 2024-04-28 at 8 01 16 PM" src="https://github.com/rayzhuca/newton-notes/assets/46636772/472d7186-7362-4c54-8cf5-610167987c1b">


## Tech stack

For the backend, we used Next.js and Mongodb. In the frontend, we used React and shadcn/ui. 
To generate our notes, OpenAI ChatGPT4 was used. Finally, we hosted our website during the contest at 
[newton-notes.tech](https://newton-notes.tech) and [newton-notes.vercel.app](https://newton-notes.vercel.app/) (the link may be broken).

## Running 
Fill in the relevant environment variables in ``.env``.

```
DATABASE_URL=...
NEXTAUTH_JWT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
NEXTAUTH_URL_INTERNAL=...
OPENAI_API_KEY=...
```

Then, install the npm packages via ``npm i`` and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
