const fetchUrl = "https://jsonplaceholder.typicode.com";

let posts = [];

//get Post

async function getPosts() {
    const response = await fetch(`${fetchUrl}/posts`)
    return await response.json();
}

//display card

async function displayCard (){
    posts = await getPosts();

    console.log(posts);
    createCard();
}
displayCard();


// create Card im Dom

const createCard = () => {
    let parentDiv = document.querySelector("#col2");

    posts.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h4");
        title.classList.add("card-title");
        title.textContent = item.title;

        const body = document.createElement("p");
        body.classList.add("card-textContent");
        body.textContent = item.body;


        const btn_div = document.createElement("div");
        btn_div.classList.add("card-btn");

        const view_btn = document.createElement("button");
        view_btn.classList.add("view-btn");
        view_btn.textContent = `View`;
        view_btn.setAttribute("data-id", item.id);

        const edit_btn = document.createElement("button");
        edit_btn.classList.add("edit-btn");
        edit_btn.setAttribute("data-id", item.id);
        edit_btn.textContent = `Edit`;

        const delete_btn = document.createElement("button");
        delete_btn.classList.add("delete-btn");
        delete_btn.setAttribute("data-id", item.id);
        delete_btn.textContent = `Delete`;

        btn_div.appendChild(view_btn);
        btn_div.appendChild(edit_btn);
        btn_div.appendChild(delete_btn);

        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(btn_div);
        parentDiv.appendChild(card);


    })
}