// $
let $ = (selector) => document.querySelector(selector);

// html elements
const titleField = $("#title-field");
const postContainer = $("#post-container");
const createPostForm = $("#create-post-form");
const formFields = $("#form-fields");
const ceaseButton = $("#cease");
const addButton = $("#add");
const fieldPopup = $("#field-popup");

// html templates
const templates = {};
templates.fields = {};
templates.fields.text = $("#text-field");
templates.fields.image = $("#image-field");

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
                    break;
                default:
                    alert(
                        `Unrecognized body element of type ${bodyElement.type}`
                    );
                    break;
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

function createFromTemplate(template) {
    return template.content.cloneNode(true);
}

function createField(type) {
    const field = createFromTemplate(templates.fields[type]);
    formFields.appendChild(field);
}

function updateBackground(element, image) {
    const imageURL = URL.createObjectURL(image);
    element.style.backgroundImage = `url("${imageURL}")`;
}

createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    createPost({
        title: titleField.value,
        body: [
            {
                type: "text",
                content: {
                    text: "bodyField.value",
                },
            },
        ],
    });
});

formFields.addEventListener("input", (event) => {
    switch (event.target.dataset.type) {
        case "image":
            // release the files
            const image = event.target.files[0];
            updateBackground(event.target, image);

        default:
            break;
    }
});

// bodyField.addEventListener("input", () => {
//     autoResize(bodyField);
// });

ceaseButton.addEventListener("click", () => {
    document.body.classList.add("break");
    postUrl("/api/cease");
});

addButton.addEventListener("click", (event) => {
    // stop form submission
    event.preventDefault();
    fieldPopup.showModal();
});

templates.fields.image.addEventListener("input", (event) => {
    console.log(event);
});

Array.from(fieldPopup.children).forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            createField(button.dataset.type);
            fieldPopup.close();
        } catch (error) {
            alert("Can't add that.");
        }
    });
});

const posts = await getPosts();
displayPosts(posts);
