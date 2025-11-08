const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Show all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("index", { posts });
});

// New post form
router.get("/new", (req, res) => res.render("new"));

// Create post
router.post("/", async (req, res) => {
  await Post.create({ title: req.body.title, content: req.body.content });
  res.redirect("/posts");
});

// Edit post form
router.get("/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

// Update post
router.put("/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/posts");
});

// Delete post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
});

// ✅ View a single post (Read More)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("show", { post });
  } catch (err) {
    res.status(500).send("Error fetching post");
  }
});


module.exports = router;
