**Things that were done well**

-   Once again, very clean.
-   Nice use of sessionStorage, but keep in mind that sessionStorage only applies to the current tab. If you close the tab, you lose the session. This means that the login isn't truly persistent. To fix this, you'd usually use cookies instead, and in some cases, maybe even localStorage; since they both work even after the current tab is closed.

**Things to improve**

-   line 5: Better to make a separate function for this even if you're going to only call it once. More clean. Also, with a function name, person looking at the code can already just understand what it's purpose is without having to analyze it too much.
-   line 24: Clear what you're doing here, but in general, more clean to have each `fetch` request in its own function. Then you have one event listener, and you call the correct `fetch` request based on the condition but **within** the listener, like:

    ```js
    submitBtn.addEventListener('click', () => {
        const userAction = name == null ? loginUser : registerUser;
        userAction();
    });

    const loginUser = () => {
        fetch('/login-user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                validateData(data);
            });
    };

    const registerUser = () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                validateData(data);
            });
    };
    ```

    Also, good idea to use `submit` event for forms instead of click. Just don't forget `e.preventDefault()` in that case. :)
