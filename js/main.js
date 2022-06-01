document.querySelector('#btn').addEventListener('click', makeRequest)
document.querySelector('#btnR').addEventListener('click', () => {
    location.reload()

})
let result;

async function makeRequest() {
    const res = await fetch(`/api`)
    const data = await res.json()
    console.log(data.result)
    document.querySelector('.result').textContent = data.result

    if (data.result == 'Heads') {
        document.querySelector('.flip-card-inner').style.transform = 'rotateX(1260deg)';
document.querySelector('#btn').style.display = 'none'

    } else if (data.result == 'Tails') {
        document.querySelector('.flip-card-inner').style.transform = 'rotateX(1080deg)';
        document.querySelector('#btn').style.display = 'none'

    }

}