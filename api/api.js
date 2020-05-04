// src/api/api.js
import axios from 'axios'

// 允许跨域携带cookie
axios.defaults.withCredentials = true;

export const index_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/first/index_mobile',
        data:msg
    })
}

export const top_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/first/feature_second_mobile',
        data:msg
    })
}

export const top_sure = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data:msg
    })
}

export const address_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/first/city',
        data:msg
    })
}

export const trend_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/price/trends',
        data:msg
    })
}

export const dynamic_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/dynamic',
        data:msg
    })
}

export const dd = (msg) => {
    return axios.request({
        method: 'post',
        url: 'http://xxxxx.xxx/api/disassemble',
        data: {
            funName
        }
    })
    
}

export const ip = () => {
    return axios.request({
        method: 'get',
        url: '/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=ip地址&co=&resource_id=6006&t=1512612231044&ie=utf8&oe=gbk&format=json&tn=baidu'
    })
}

export const dynamic = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/dynamic',
        data: msg
    })
}

export const search_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/search',
        data: msg
    })
}

export const search_search = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/search_info',
        data: msg
    })
}

export const help_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/help_me',
        data: msg
    })
}

export const help_put = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}


export const msg = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/send',
        data: msg
    })
}

export const login = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/login_sure',
        data: msg
    })
}

export const verification = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sure',
        data: msg
    })
}

export const trend_put = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}

export const analysis_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/analysis',
        data: msg
    })
}

export const content_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/detail',
        data: msg
    })
}

export const sou_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/quick_search',
        data: msg
    })
}

export const analysis_put = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}


export const morehus_put = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}

export const morehus_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/apartments',
        data: msg
    })
}

export const album_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/imgs',
        data: msg
    })
}


export const comment_put = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/comment',
        data: msg
    })
}

export const encyclopediaarticle_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/article/detail',
        data: msg
    })
}

export const count_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/mortgage/initial_data',
        data: msg
    })
}

export const periphery_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/peripheral_plan',
        data: msg
    })
}

export const encyclopediaarticle_agree = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/article/like',
        data: msg
    })
}


export const comments_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/comment_info',
        data: msg
    })
}


export const comment_del = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/comment_delete',
        data: msg
    })
}


export const collection = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/user/collect',
        data: msg
    })
}


export const PK = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/compare_mobile',
        data: msg
    })
}


export const leave = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}



export const yuyue = (msg) => {
    return axios.request({
        method: 'post',
        url: '/front/flow/sign',
        data: msg
    })
}


export const foot_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/my_foot',
        data: msg
    })
}


export const collect_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/my_collects',
        data: msg
    })
}



export const hu_detail = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/apartment',
        data: msg
    })
}


export const question_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/question_info',
        data: msg
    })
}


export const countdetail_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/mortgage/calculate',
        data: msg
    })
}


export const realInformations_start = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/article/info',
        data: msg
    })
}


export const realInformations_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/article/page',
        data: msg
    })
}


export const encyclopedia_data = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/article/page',
        data: msg
    })
}


export const sou = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/project_names',
        data: msg
    })
}


export const addbuild = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/project_names',
        data: msg
    })
}

export const addbuilds = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/pk_recommand',
        data: msg
    })
}

export const mapSearch = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/map/area',
        data: msg
    })
}

export const mapProject = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/map/detail',
        data: msg
    })
}

export const commentBack = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/project/comment_reply',
        data: msg
    })
}


export const jiameng = (msg) => {
    return axios.request({
        method: 'post',
        url: '/api/map/cooperate',
        data: msg
    })
}


