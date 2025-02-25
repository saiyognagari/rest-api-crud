const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");



const port = 8080;

const path = require("path");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "saiyognagari",
        content : "hard work is the only way to succeed in life"
    },
    {
        id : uuidv4(),
        username : "shradhakhapra",
        content : "a good tutor can change life for good"
    },
    {
        id : uuidv4(),
        username : "apoorvanagari",
        content : "honesty is the best policy"
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
})

app.post("/posts",(req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username,content });
    // console.log(posts);
    // res.send("Post method working");
    res.redirect("/posts")
})

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})
