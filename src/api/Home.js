/**
 * 首页
 */
import request from '@/utils/request'

// 推荐歌单
export const recommendMusic = params => request({
    url: '/personalized',
    params // 接受获取几首歌曲 {limit:20}
})
// 最新音乐
export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})
