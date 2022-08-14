**Things that were done well**

-   First things first, nice and clean. Always good to see. Clean code is what people look for the most in the industry. (Imagine debugging 4000 lines of messy code. I hope you never go through that. lol)
-   line 41: Really good! You need to always validate fields coming in from user. Bravo.
-   line 50: I can tell you guys are getting the hang of working with promises. Well done.
-   Good that when you weren't serving static files, you always used `res.json`! This is better than doing `res.send`, since `res.send` can also send plain text strings. This means if your front end tries parsing the json, it might not work. By doing `res.json`, you're converting anything you're sending into json before sending it. That way, the front end will be able to do a regular fetch request without worry, meaning:
    ```js
    fetch(some_url)
        .then((res) => res.json()) // This line will only always work if server always returns JSON
        .then(/* do something else here */);
    ```

**Things to improve**

-   Not a big deal, since this is a small project, but good idea to keep sensitive data like db connection information in a `.env` folder and include that information in your files through environment variables. If you haven't learnt this yet, something to look into. ;)
-   line 16: Have to doublecheck, but as far as I know, the `.listen` function doesn't give you access to the req and res objects. Doesn't hurt to define those params there, but not useful either.
-   line 20: Very small thing. It's not really the "initialPath". It's more like "pathToStaticAssets". Not a big deal now, but in production environment, proper naming is important.
-   line 54: Hmmm, you're taking care of the error where the user already exists, but you aren't handling other potential errors. At least add a console log after your if statement, like:
    ```js
    if (err.detail.includes('Already Exists')) {
        res.json('Email Already Exists');
    }
    console.log('Error in register function :>>', err);
    ```
    You'll learn this later, but the point is, most servers keep a record of logs along with times and dates. By console logging all errors (even if you aren't going to handle them in the client side), you'll get a chance to see the history of what went wrong.
