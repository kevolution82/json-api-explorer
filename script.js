window.addEventListener("load", function () {
    const fetchButton = document.getElementById("fetchButton");
    const postList = document.getElementById("postList");
    const postForm = document.getElementById("postForm");
    const formError = document.getElementById("formError");
    const formSuccess = document.getElementById("formSuccess");
    const errorDiv = document.getElementById("error");

// When user clicks "Fetch Posts"
    fetchButton.addEventListener("click", async function () {
        postList.innerHTML = "Loading...";
        errorDiv.innerText = "";

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await response.json();

            postList.innerHTML = "";
            posts.forEach(function (post) {
                const div = document.createElement("div");
                div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                postList.appendChild(div);
            });
        } catch (error) {
            errorDiv.innerText = "Could not load posts. Try again later, mortal.";
            postList.innerHTML = "";
        }
    });



// When user submits the form to  create a post
    postForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        formError.innerText = "";
        formSuccess.innerText = "Sending...";

        const title = document.getElementById("titleInput").value;
        const body = document.getElementById("bodyInput").value;

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, body })
            });

            const result = await response.json();
            formSuccess.innerText = `Post submitted. ID: ${result.id}`;
        } catch (error) {
            formError.innerText = "Something went wrong. Could not send post. Are you sure you did this correctly?";
            formSuccess.innerText = "";
        }
    });
});
