async function post(url, data) {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
}

async function createPost(title) {
    return await post("/api/create-post", { title: title });
}
