const textField = document.querySelector("#text-field");
const postContainer = document.querySelector("#post-container");

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
    // div.style.height = /* div.style.lineHeight = */ `${
    //     Math.random() * 400 + 100
    // }px`;

    const title = document.createElement("h2");
    title.textContent = post.title;

    const br = document.createElement("br");

    div.appendChild(title);
    postContainer.appendChild(div);
}

function displayPosts(posts) {
    postContainer.innerHTML = "";
    for (let post of posts) {
        createPostElement(post);
    }
}

async function createPost(title) {
    postUrl("/api/create-post", { title: title }).then(async (res) => {
        const posts = await getPosts();
        displayPosts(posts);
    });
}

submit.addEventListener("click", () => {
    createPost(textField.value);
});

const posts = await getPosts();
displayPosts(posts);
console.log(posts);
