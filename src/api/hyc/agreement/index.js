import axios from '@/assets/js/requestHYC'
import qs from 'qs'

// 获取当前三方协议模板ID接口
function getProtocolTemplateIdApi(data) {
  return axios({
    url: 'protocol/getProtocolTemplateId',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取三方协议模版费率数据
function getTrilateralParamsApi(data) {
  return axios({
    url: 'protocol/getTrilateralParams',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询债权转让协议填充数据
function bondProtocolApi(data) {
  return axios({
    url: 'BondProtocol',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

export { getProtocolTemplateIdApi, getTrilateralParamsApi, bondProtocolApi }
