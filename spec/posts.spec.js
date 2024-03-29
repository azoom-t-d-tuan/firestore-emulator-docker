const { setup, teardown } = require('./helpers')

describe('Post rules', () => {
  let db
  let postsRef
  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup()
    // Allow rules in place for this collection
    postsRef = db.collection('posts')
  })

  afterAll(async () => {
    await teardown()
  })

  test('succeeds when reading/writing an authorized collection', async () => {
    await expect(postsRef.add({})).toAllow()
    await expect(postsRef.get()).toAllow()
  })

  test('Data saved successfully', async () => {
    postsRef.doc('test').set({
      name: 'Beijing', state: null, country: 'China',
      capital: true, population: 21500000
    })
    var docRef = await postsRef.doc('test').get()
    const data = docRef.data()
    expect(data.name).toBe('Beijing')
  })
})
