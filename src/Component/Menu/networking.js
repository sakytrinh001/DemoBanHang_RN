export function postWithCheckingToken(api, headers, body) {
    return fetch(api, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: body
    })
    .then(response => response.json().then(data => {
      return {...data, httpCode: response.status}
    }))
      .catch(err =>{
       
      })
  }