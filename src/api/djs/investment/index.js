import axios from '@/assets/js/requestDJS'
import Qs from 'qs'

function collectionApi(params) { // 出借列表
  return axios({
    url: '/InvestCountMsg',
    method: 'get',
    params: params,
    headers: {
      version: '2.0'
    }
  })
}

function projectApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/project/investList', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getProjectDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/project/projectDetail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getProductDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/collection/investDetail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getLoanDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/collection/loanDetail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getBorrowerDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/jxLoanPeopleInfo/detail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getInternetInformation(data) {
  return new Promise((resolve, reject) => {
    axios.post('/auditInfo/internetInformation', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getInvestRecord(data) {
  return new Promise((resolve, reject) => {
    let url = '/project/investRecord?maxLine=20'
    if (data.curPage) url += '&curPage=' + data.curPage
    axios.post(url, Qs.stringify({ projectNo: data.projectNo })).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getPlanRecord(data) {
  return new Promise((resolve, reject) => {
    let url = '/collection/investRecord?maxLine=20'
    if (data.curPage) url += '&curPage=' + data.curPage
    axios.post(url, Qs.stringify({ productId: data.productId, itemId: data.itemId })).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getPlanProjects(data) {
  return new Promise((resolve, reject) => {
    let url = '/collection/projectCompo?maxLine=20'
    if (data.curPage) url += '&curPage=' + data.curPage
    axios
      .post(
        url,
        Qs.stringify({
          itemId: data.itemId,
          productType: 2
        })
      )
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}

function availableRedPacket(data) {
  return new Promise((resolve, reject) => {
    axios.post('/AvailableRedPacket', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function availableCoupon(data) {
  return new Promise((resolve, reject) => {
    axios.post('/AvailableCoupon', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function amountInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('personalAccount/amountInfo', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getRedPackageById(data) {
  return new Promise((resolve, reject) => {
    axios.post('redPacketAndCoupon/getRedPackageById', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getCouponById(data) {
  return new Promise((resolve, reject) => {
    axios.post('redPacketAndCoupon/getCouponById', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function expectedIncome(data) {
  return new Promise((resolve, reject) => {
    axios.post('ExpectedIncome', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function availableRedPacketAndCoupon(data) {
  return new Promise((resolve, reject) => {
    axios.post('redPacketAndCoupon/availableRedPacketAndCoupon', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function invest(data) {
  return new Promise((resolve, reject) => {
    axios.post('userInvest/invest', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function userBasicInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('UserBasicInfo', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function systemMaintenance(data) {
  return new Promise((resolve, reject) => {
    axios.post('collection/systemMaintenance', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getZZProjects(data) {
  return new Promise((resolve, reject) => {
    let url = '/collection/projectCompo?maxLine=20'
    if (data.curPage) url += '&curPage=' + data.curPage
    axios
      .post(
        url,
        Qs.stringify({
          productId: data.productId,
          productType: 1
        })
      )
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
  })
}

function queryAgreementCatalogApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/extendApi/queryAgreementCatalog', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function peopleLoanInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('/collection/peopleLoanInfo', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default {
  collectionApi, // 优质计划
  projectApi, // 散标
  getProjectDetail, // 散标项目详情
  getInvestRecord, // 散标加入记录
  getBorrowerDetail, // 散标借款人信息
  getProductDetail, // 优质计划产品详情
  getPlanRecord, // 优质计划加入记录
  getPlanProjects, // 优质计划项目组成
  getLoanDetail, // 优质计划项目详情
  availableRedPacket, // 用户可用红包
  availableCoupon, // 用户可用加息券
  availableRedPacketAndCoupon, // 用户可用红包加息券数量和金额
  amountInfo, // 账户总览,
  getRedPackageById, // 根据ID获取红包信息
  getCouponById, // 根据ID获取加息券信息
  expectedIncome, // 预期收益计算
  invest, // 出借
  userBasicInfo, // 用户详细信息
  systemMaintenance, // 系统维护
  getZZProjects, // 债转项目组成
  queryAgreementCatalogApi, // 出借详情协议
  peopleLoanInfo, // 贷后情况
  getInternetInformation // 互联网资信报告
}
