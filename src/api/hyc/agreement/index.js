import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getProtocolTemplateIdApi(data) {
  return axios({
    url: 'protocol/getProtocolTemplateId',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getTrilateralParamsApi(data) {
  return axios({
    url: 'protocol/getTrilateralParams',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getProtocolTemplateIdApi, // 获取当前三方协议模板ID接口
  getTrilateralParamsApi // 获取三方协议模版费率数据
}
