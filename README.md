# Pokedex App

This Pokedex App allows users to interact with a database of Pokémon to search by name, filter by type, or both, and view detailed information about each Pokémon.

## Instructions on How to Run the App`

Instructions on how to run the app:

1. clone the repository ( [url](https://github.com/AndreiManea/Pokedex.git) )
2. run "npm install" to install all dependecies required.
3. run "npm run dev" to be able to start the app locally.

## Features

- Search by name
- Filter results by type
- Search by name and type
- Pokemon details page containing different information
- Persisted pokemon details page

## Q&A

### What part of building the project was the most difficult? Why?

The most difficult part for me seemed to be the correct data managing when searching because there had to be multiple individual calls to be done for all matching possibilities based on the user input, which was challenging to optimize for performance and user experience.

### If you had to filter the list of Pokémon by its type without the implemented functionality, how would you have done it?

I assume this refers not to the case if I didn't implement the type filtering functionality itself, but rather to a direct approach to filter by type, even initially when there is not input and it would have to do a search for all the pokemons.

I'd say in that case, best approach would be to have your own backend ( maybe with Next.js) that could do the heavy API calling for you and crunch the data better so you don't have massive awaiting time on the client side.

This backend could aggregate and filter the data, serving it to the frontend in a more efficient manner.
