const titleField = document.querySelector("#title-field");
const bodyField = document.querySelector("#body-field");
const postContainer = document.querySelector("#post-container");
const createPostForm = document.querySelector("#create-post-form");
const ceaseButton = document.querySelector("#cease");

async function getUrl(url) {
    return await fetch(url, {
        method: "GET",
    });
}

async function postUrl(url, data) {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
}

async function getPosts() {
    const postsFile = await getUrl("/api/get-posts");
    const posts = await postsFile.json();
    return posts;
}

function createPostElement(post) {
    console.log(post.title);

    const div = document.createElement("div");
    div.classList.add("box");

    const title = document.createElement("h2");
    title.textContent = post.title;

    div.appendChild(title);

    if (post.body) {
        const postBody = document.createElement("div");
        for (let bodyElement of post.body) {
            switch (bodyElement.type) {
                case "text":
                    const text = document.createElement("p");
                    text.textContent = bodyElement.content.text;
                    postBody.appendChild(text);
            }
        }
        div.appendChild(postBody);
    }

    postContainer.appendChild(div);
}

function displayPosts(posts) {
    postContainer.innerHTML = "";
    for (let post of posts) {
        createPostElement(post);
    }
}

async function createPost(postData) {
    postUrl("/api/create-post", postData).then(async (res) => {
        const posts = await getPosts();
        displayPosts(posts);
    });
}

function autoResize(el) {
    el.style.height = "auto"; // reset
    el.style.height = el.scrollHeight + "px";
}

createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    createPost({
        title: titleField.value,
        body: [
            {
                type: "text",
                content: {
                    text: bodyField.value,
                },
            },
        ],
    });
});

bodyField.addEventListener("input", () => {
    autoResize(bodyField);
});

ceaseButton.addEventListener("click", () => {
    document.body.classList.add("break");
    postUrl("/api/cease");
});

const posts = await getPosts();
displayPosts(posts);
console.log(posts);
