/**
 * 搜索模块
 */

import request from '@/utils/request'
export const hotSearch = params => request({
    url: '/search/hot',
    params
})
export const SearchList = params => request({
    url: "/cloudsearch",
    params
})
