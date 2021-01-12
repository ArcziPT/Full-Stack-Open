const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((acc, v) => acc + v)

const favouriteBlog = (blogs) => blogs.reduce((fBlog, cBlog) => fBlog.likes > cBlog.likes ? fBlog : cBlog)

module.exports = {totalLikes, favouriteBlog}