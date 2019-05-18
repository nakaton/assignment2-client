import axios from 'axios'

export default function ajax(url = '', params = {}, type = 'GET', header = {}) {
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {
            // Prepare query parameters
            let paramsStr = ''
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&'
            })

            // Combine into a full request url
            if (paramsStr !== '') {
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
                url = url + '?' + paramsStr;
            }

            // Send GET request
            promise = axios.get(url, header)

        } else {
            if (type == 'PATCH'){
                promise = axios.patch(url, params, header)
            } else if (type == 'PUT') {
                promise = axios.put(url, params, header)
            } else if (type == 'DELETE') {
                promise = axios.delete(url, header)
            } else {
                promise = axios.post(url, params, header)
            }
        }

        promise.then(response => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            });
    })
}
