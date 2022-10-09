import request from '@/utils/request'

export default {
  getDepartmentById(hostCode) {
    return request({
      url: `/admin/hospital/get/department/${hostCode}`,
      method: 'get'
    })
  }
}
