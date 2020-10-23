import axios from 'axios';

export async function getFirstAlbumTitle() {
  // const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
  // console.log(axios)
  // return response.data[0].title;
  // return await axios('http://payments.localtest.me/api/1/datastore/query/', {
  //   "resources": [
  //     {
  //         "id": "59e3f29c-3277-5030-97e7-bcfc9a89c58f",
  //         "alias": "t"
  //     }
  //   ],
  // })
  // .then((response) => {
  //   const { data } = response;
  //   console.log(data)
  //   return data;
  // }).catch(error => console.log(error))
  // return await axios.get(
  //   'http://payments.localtest.me/api/1/metastore/schemas/dataset/items'
  //   ).then(response => response.data[0].identifier)
  return await axios({
    method: 'post',
    url: `http://payments.localtest.me/api/1/datastore/query`,
    data: {
      "resources": [
        {
            "id": "59e3f29c-3277-5030-97e7-bcfc9a89c58f",
            "alias": "t"
        }
      ],
      "sort": {
        "asc": [
            {
                "resource": "t",
                "property": "record_number"
            }
        ]
      },
      "keys": true
    }
  })
  .then((response) => {
    const { data } = response;
    return data;
  })
  .catch((error) => console.log(error))
}
