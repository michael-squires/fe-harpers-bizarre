console.log('hello')

const string = "2018-05-27T04:32:28.000Z"

const date = string.slice(0, 10)
const time = string.slice(11, 19)
console.log('date', date)
console.log('time', time)