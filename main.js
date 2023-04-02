const fetchUrl = "https://jsonplaceholder.typicode.com";

let heroes_div = document.querySelector(".heroes");


let posts = [];
let comments = [];
let postID;

//get Post

async function getPosts() {
    const response = await fetch(`${fetchUrl}/posts`)
    return await response.json();
}

async function getComments(postID) {
    const response = await fetch(`${fetchUrl}/posts/${postID}/comments`)
    return await response.json();
}

async function getID (postID) {
    const response = await fetch(`${fetchUrl}/posts/${postID}`)
    return await response.json();
}

//display card-grid

async function displayCard() {
    posts = await getPosts();

    console.log(posts);
    welcomeText();
    createCard();
}
displayCard();


//display card
async function viewCard(e) {
    let parentDiv = document.querySelector("#col2");
    let commentDiv = document.querySelector("#col1");

    const id = +e.target.dataset.id;
    comments = await getComments(id);
   const viewPost = posts.find(item => item.id === id);
   console.log(viewPost);
   console.log(comments);


showCardHead();
    showCardFooter();
    parentDiv.style.display = 'none';
    commentDiv.style.display = 'block';
    heroes_div.style.display = 'none';

}



//delete post

function deleteButton(e) {
   // const id = +e.target.dataset.id;
e.target.parentElement.parentElement.remove();

    //console.log(postID);
}


//show welcome text
const welcomeText = () => {

    const p_heroes = document.createElement("p");
    p_heroes.textContent = `Welcome to my blog`;

    heroes_div.appendChild(p_heroes);
}


//create Card layout






const showCardHead = () => {
    posts.forEach(item => {
        const parentDivCard = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.classList.add("heroes");
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.classList.add("card-body");
        p.textContent = item.body;

        const span = document.createElement("span");
        span.classList.add("comment");
        span.textContent = `Comments`;

        parentDivCard.appendChild(h3);
        parentDivCard.appendChild(p);
        parentDivCard.appendChild(span);
    })
}


const showCardFooter = () => {
    let commentDiv = document.querySelector("#col1");

    comments.forEach(item => {
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("display-comments");

        const childDiv = document.createElement("div");
        childDiv.classList.add("showComment");

        const nameUser = document.createElement("p");
        nameUser.textContent = item.name;

        const emailUser = document.createElement("i");
        emailUser.textContent = item.email;

        const body = document.createElement("p");
        body.textContent = item.body;

        childDiv.appendChild(nameUser);
        childDiv.appendChild(emailUser);
        childDiv.appendChild(body);

        parentDiv.appendChild(childDiv);
        commentDiv.appendChild(parentDiv);
    })
}


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
        view_btn.addEventListener("click", viewCard);



        const delete_btn = document.createElement("button");
        delete_btn.classList.add("delete-btn");
        delete_btn.setAttribute("data-id", item.id);
        delete_btn.textContent = `Delete`;
        delete_btn.addEventListener("click", deleteButton);

        btn_div.appendChild(view_btn);
        btn_div.appendChild(delete_btn);

        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(btn_div);
        parentDiv.appendChild(card);


    })
}



