
import jsonp from "jsonp"
import {message} from "antd"

const KEY = "KnHVOML3NCoHEjn8SsDESlKnGsexhhr7"
export const getWeather = (city="上海") => {

    return new Promise((resolve, reject) => {
        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=${KEY}`
        jsonp(url,{}, (err, data)=> {
            if (err) {
                message.error("网络异常: " + err.message)
            } else {
                // console.log("zhenque", data);
                if (data.error === 0 ) {
                    let result = data.results[0].weather_data[0]
                    let picURL = result.nightPictureUrl
                    let notice = result.weather + result.temperature
                    resolve({picURL, notice})
                }
            }
        })
    })

}
