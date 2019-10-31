const firebase = require('@firebase/testing')

setTimeout(async function() {
  const app = firebase.initializeAdminApp({ projectId: "project-test" })
  const firestore = app.firestore()
  try {
    const citiesRef = firestore.collection('cities')

    let setSf = citiesRef.doc('SF').set({
      name: 'San Francisco', state: 'CA', country: 'USA',
      capital: false, population: 860000
    })
    let setLa = citiesRef.doc('LA').set({
      name: 'Los Angeles', state: 'CA', country: 'USA',
      capital: false, population: 3900000
    })
    let setDc = citiesRef.doc('DC').set({
      name: 'Washington, D.C.', state: null, country: 'USA',
      capital: true, population: 680000
    })
    let setTok = citiesRef.doc('TOK').set({
      name: 'Tokyo', state: null, country: 'Japan',
      capital: true, population: 9000000
    })
    let setBj = citiesRef.doc('BJ').set({
      name: 'Beijing', state: null, country: 'China',
      capital: true, population: 21500000
    })
  } catch (error) {
    console.error(error)
  }

  let citiesRef = firestore.collection('cities')
  const cities = await citiesRef.where('capital', '==', true).where('population', '>', 3900000).get()

  if (cities.empty) {
    console.log('No matching documents.')
    return
  }

  cities.forEach(doc => {
    console.log(doc.id, '=>', doc.data())
  })

  Promise.all(firebase.apps().map(app => app.delete()))
}, 0)
