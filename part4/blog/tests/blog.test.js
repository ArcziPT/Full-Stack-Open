const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initial_blogs = [
    {
        title: 'MyBook',
        author: 'Johny John',
        url: 'https://mybook.com',
        likes: 100
    },
    {
        title: 'MyBook 2',
        author: 'Johny John',
        url: 'https://mybook.com',
        likes: 200
    },
    {
        title: 'MyBook 3',
        author: 'Johny John',
        url: 'https://mybook.com',
        likes: 999
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});

    await Promise.all(initial_blogs.map(b => {
        const blog = new Blog(b)
        return blog.save()
    }));
})

test('correct number of results', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(3)
})

test('has id property', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    response.body.forEach(b => expect(b.id).toBeDefined())
})

test('blog added to database', async () => {
    const blog = {
        title: 'new title',
        author: 'new author',
        url: 'https://newbook.com',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(201)

    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(4)
})

test('when likes not specified, defaults to 0', async () => {
    const blog = {
        title: 'new title',
        author: 'new author',
        url: 'https://newbook.com'
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(201)

    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('COntent-Type', /application\/json/)

    expect(response.body.filter(b => b.title == blog.title)[0].likes).toEqual(0)
})

test('when request misses url or title return error code 400', async () => {
    const blog = {
        likes: 100,
        author: 'new author',
        url: 'https://newbook.com'
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})