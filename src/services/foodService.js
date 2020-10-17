import axios from 'axios'

// let BASE_URL = "https://donghoon.tk";

let BASE_URL = 'http://ec2-54-180-87-68.ap-northeast-2.compute.amazonaws.com'

const baseAPI = axios.create({
    baseURL: BASE_URL,
})

const foodService = {
    postFood: async (data) => {
        console.log(data)
        // await baseAPI
        //     .post(`/foods/recommend`, {
        //         data,
        //     })
        //     .then((res) => {
        //         const ret = res.data
        //         console.log(ret)
        //         return ret
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         return 0
        //     })
        await axios({
            method: 'post',
            url: BASE_URL + '/foods/recommend',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: data,
        })
            .then(function (res) {
                console.log('dd')
                console.log(res)
                return res
            })
            .catch((err) => {
                console.log(err)
                return 0
            })
        // await fetch(BASE_URL, {
        //     method: 'post',
        //     headers: {
        //         Accept: 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: data,
        // })
        //     .then((res) => res.json())
        //     .then((res) => console.log(res))
    },
}

export default foodService
