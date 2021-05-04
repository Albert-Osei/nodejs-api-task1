const express = require('express');

const app = express();

app.use(express.json())

const PORT = 7005;

const blogPosts = []
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})

app.get('/academy/blogPosts', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: 200,
        data: blogPosts
    })
})

app.post('/academy/blogPosts', (req, res, next) => {

    const { post } = req.body

    const postExist = blogPosts.find((element) => element.post = post);
    if(postExist){
        return res.status(409).json({
            status: 'error',
            message: 'Post already exists',
            code: 409,
            data: null
        })
    }

    blogPosts.push(req.body)

    return res.status(201).json({
        status: 'success',
        message: 'Post inserted successfully',
        code: 201,
        data: blogPosts
    })
})

app.put('/academy/blogPosts/:id', (req, res, next) => {
    const { id } = req.params;
    const { post, url, title, author } = req.body
    const postIndex = blogPosts.findIndex((element) => element.id === id)
    if(postIndex >= 0) {
        blogPosts[postIndex] = {
            ...blogPosts[postIndex],
            post,
            url,
            title,
            author
        }

        return res.status(200).json({
            status: 'success',
            message: 'Post updated successfully',
            code: 200,
            data: blogPosts
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'Post not found',
        code: 400,
        data: null
    })
})

app.delete('/academy/blogPosts/id', (req, res, next) => {
    const { id } = req.params;
    const postIndex = blogPosts.findIndex((element) => element.id === id)
    if (postIndex >= 0) {
        blogPosts.splice(postIndex, 1);
        return res.status(200).json({
            status: 'success',
            message: 'Post deleted successfully',
            code: 200,
            data: books
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'Post not found',
        code: 400,
        data: null
    })
})