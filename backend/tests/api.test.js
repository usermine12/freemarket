const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)
const User = require('../src/models/user')
const Listing = require('../src/models/listing')

let initialValues = {

}

const initMongo = async () => {
  await User.deleteMany({})
  await Listing.deleteMany({})

  const tester1 = await new User({
    displayName: 'tester1',
    passwordHash: bcrypt.hashSync('password123', 10)
  }).save()

  const tester2 = await new User({
    displayName: 'tester2',
    passwordHash: bcrypt.hashSync('password123', 10),
    firstName: 'Adam',
    lastName: 'tester'
  }).save()

  const listing1 = await new Listing({
    title: 'Listing1',
    description: 'testing api with jest',
    locality: 'TestingLand',
    author: tester1._id
  }).save()

  const listing2 = await new Listing({
    title: 'Listing2',
    description: 'testing api with jest',
    locality: 'TestingLand',
    author: tester2._id
  }).save()

  initialValues = {
    users: [
      tester1,
      tester2
    ],
    listings: [
      listing1,
      listing2
    ]
  }
}

describe('api', () => {
  beforeEach(async () => {
    await initMongo()
  })

  describe('user endpoint', () => {
    test('returns initial users', async () => {
      const response = await api.get('/api/users')

      expect(response.body).toHaveLength(initialValues.users.length)
    })

    test('user can be searched', async () => {
      const response = await api
        .get(`/api/users/search?search=${initialValues.users[0].displayName}`)
        .expect(200)
      
      expect(response.body).toEqual([initialValues.users[0].toJSON()])
    })

    test('users can be searched', async () => {
      const response = await api
        .get('/api/users/search?search=tester')
        .expect(200)
      
      expect(response.body).toEqual(initialValues.users.map(u => u.toJSON()))
    })

    test('users can be posted', async () => {
      const newUser1 = {
        displayName: 'postedUser1',
        password: 'password123'
      }

      const newUser2 = {
        displayName: 'postedUser2',
        password: 'password123',
        firstName: 'Justin',
        lastName: 'Tester'
      }

      await api
        .post('/api/users')
        .send(newUser1)
        .expect(200)
      
      await api
        .post('/api/users')
        .send(newUser2)
        .expect(200)
      
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialValues.users.length + 2)
    })

    test('invalid users can\'t be posted', async () => {
      await api
        .post('/api/users')
        .send({ displayName: 'missing password' })
        .expect(400)

      await api
        .post('/api/users')
        .send({ password: 'missing displayname' })
        .expect(400)

      await api
        .post('/api/users')
        .send({ displayName: 'tester1', password: 'invalidpassword' })
        .expect(500)
      
      await api
        .post('/api/users')
        .send({ displayName: 'tooshortpassword', password: 'short' })
        .expect(400)
    })

    test('users can be deleted', async () => {
      const users = (await api.get('/api/users')).body
      await api
        .delete(`/api/users/${users[1].id}`)
        .expect(204)
      
      const usersAfter = (await api.get('/api/users')).body
      expect(usersAfter).toHaveLength(initialValues.users.length - 1)
    })
  })

  describe('listings endpoint', () => {
    test('returns initial listings', async () => {
      const response = await api.get('/api/listings')

      expect(response.body).toHaveLength(initialValues.listings.length)
    })

    test('listing can be searched', async () => {
      const response = await api
        .get(`/api/listings/search?search=${initialValues.listings[0].title}`)
        .expect(200)
      
      expect(response.body).toEqual([initialValues.listings[0].toJSON()])
    })

    test('listings can be searched', async () => {
      const response = await api
        .get('/api/listings/search?search=Listing')
        .expect(200)
      
      expect(response.body).toEqual(initialValues.listings.map(l => l.toJSON()))
    })

    test('listings can be posted', async () => {
      const newListing = {
        title: 'Posted listing',
        description: 'this listing was posted in test environment',
        locality: 'Turku',
        author: initialValues.users[0]._id
      }

      await api
        .post('/api/listings')
        .send(newListing)
        .expect(200)

      const listingsAfter = (await api.get('/api/listings')).body
      expect(listingsAfter).toHaveLength(initialValues.listings.length + 1)
    })

    test('invalid listings can\'t be posted', async () => {
      const newListing1 = {
        title: 'missing fields',
        locality: 'NYC'
      }

      const newListing2 = {
        title: 'Listing1',
        description: 'not unique title',
        locality: 'Berlin',
        author: initialValues.users[0]._id
      }

      await api
        .post('/api/listings')
        .send(newListing1)
        .expect(400)
      
      await api
        .post('/api/listings')
        .send(newListing2)
        .expect(500)
      
      const listingsAfter = (await api.get('/api/listings')).body
      expect(listingsAfter).toHaveLength(initialValues.listings.length)
    })

    test('tests can be deleted', async () => {
      await api
        .delete(`/api/listings/${initialValues.listings[0]._id}`)
        .expect(204)
      
      const listingsAfter = (await api.get('/api/listings')).body
      expect(listingsAfter).toHaveLength(initialValues.listings.length - 1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})