**Things that were done well**
Short, sweet, and clean. :D

**Things to improve**

-   Same thing as last file: careful with sessionStorage.
-   Better to use `const` instead of `let` here. `let` should **only** be used for variables that are subject to change, but since the variables from lines 22-27 are dom elements, the references to those dom elements should stay the way they are.
-   Nooo, you didn't validate `input.value` before sticking it into the query. Not a big deal, just pointing it out 😛
