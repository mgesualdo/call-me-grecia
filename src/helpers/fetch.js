const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET', isFormData = false) => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET') {
    return fetch(url)
  } else {
    console.log({ url })
    try {
      return fetch(url, {
        method,
        headers: {
          'Content-type': isFormData
            ? 'multipart/form-data; boundary=---------------------------974767299852498929531610575'
            : 'application/json',
        },
        body: isFormData ? data : JSON.stringify(data),
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export { fetchSinToken }
