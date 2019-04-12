import request from '@/assets/js/requestDJS'
import qs from 'qs'

//公司简介/动态列表数据
export function getList(data) {
  return request({
    url: 'ZxdtMtbdMsg',
    method: 'post',
    data: qs.stringify(data)
  })
}

//公司简介/动态列表数据
export function getDetail(data) {
  return request({
    url: 'ZxdtMtbdDetailMsg',
    method: 'post',
    data: qs.stringify(data)
  })
}

