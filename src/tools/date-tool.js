
export const timeFormat = (time) => {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? "0" + month : month
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day

    let hour = date.getHours()
    hour = hour < 10 ? `0${hour}`: hour
    let min = date.getMinutes()
    min = min < 10 ? `0${min}`: min
    let sec = date.getSeconds()
    sec = sec < 10 ? `0${sec}`: sec

    return `${year}年${month}月${day}日 ${hour}:${min}:${sec}`

}
