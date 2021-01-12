const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((acc, v) => acc + v)

module.exports = {totalLikes}