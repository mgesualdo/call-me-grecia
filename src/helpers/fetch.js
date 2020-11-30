const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET') => {
  console.log(JSON.stringify(data))
  const url = `${baseUrl}/${endpoint}`

  console.log(url)

  if (method === 'GET') {
    return fetch(url)
  } else {
    try {
      return fetch(url, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export { fetchSinToken }
