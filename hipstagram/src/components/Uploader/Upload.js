// export const FIND_COMMENTS = gql`
//   query findImage {
//     ImageFind(query: "[{}]") {
//       _id
//       url
//       text
//       owner {
//         login
//         nick
//       }
//     }
//   }`;

// Куда лить: <br/><input type='file' id='file' />
// <a href='#' id='url'></a>

// file.onchange = async () => {
//   url.innerHTML = url.href = "/" + await (await fetch('/upload', {
//     method: "POST",
//     headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
//     body: file.files[0]
//   })).text()
// }


// <form action="/upload" method="post" enctype="multipart/form-data" id='form'>
//   <input type="file" name="photo" id='photo' />
// </form>


// photo.onchange = async () => {
//   fetch('/upload', {
//     method: "POST",
//     headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
//     body: new FormData(form)
//   })
// }

// axios.post('/upload', {
//   method: "POST",
//   headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
//   body: file.files[0]
// })

axios.post('/upload', {
    method: "POST",
    headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
    body: new FormData(form)
  })
  