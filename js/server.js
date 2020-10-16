function getImages() {
    let promice = axios.get('https://raw.githubusercontent.com/Mikhail-F/Cats_JSON/main/cats.json')
    return promice.then((response) => {
        return response.data

    })
}