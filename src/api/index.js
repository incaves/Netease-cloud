/**
 * 统一导出
 */
import { recommendMusic, newMusic } from './Home'
import { hotSearch, SearchList } from './Search'
import { getSongById, getLyricById } from './Play'
export const recommendMusicApi = recommendMusic
export const newMusicApi = newMusic

export const hotSearchApi = hotSearch

export const SearchListApi = SearchList

export const getSongByIdAPI = getSongById

export const getLyricByIdAPI = getLyricById

