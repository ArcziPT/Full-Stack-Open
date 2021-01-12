const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((acc, v) => acc + v)

const favouriteBlog = (blogs) => blogs.reduce((fBlog, cBlog) => fBlog.likes > cBlog.likes ? fBlog : cBlog)

const mostBlogs = (blogs) => {
    const authors = {}
    const a = blogs.reduce((author, blog) => {
        if(blog.author in authors){
            authors[blog.author] += 1
            if(authors[blog.author] > authors[author])
                return blog.author
            return author
        }
        else{
            authors[blog.author] = 1
            return author
        }
    }, blogs[0].author)

    console.log(a)

    return {author: a, blogs: authors[a]}
}

module.exports = {totalLikes, favouriteBlog, mostBlogs}