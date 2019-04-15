import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function info(data) {
  return axios({
    url: '/draw/info',
    method: 'post',
    data: qs.stringify(data)
  })
}

function record(data) {
  return axios({
    url: '/draw/winningRecordQuery',
    method: 'post',
    data: qs.stringify(data)
  })
}

function draw(data) {
  return axios({
    url: '/draw/todo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export { info, draw, record }
