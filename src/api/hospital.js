import request from '@/utils/request'

export default {
  getHospitalLists(page, limit, query) {
    return request({
      url: `/admin/hospital/get/${page}/${limit}`,
      method: 'post',
      data: query
    })
  },
  updateHospitalStatus(id, status) {
    return request({
      url: `/admin/hospital/update/hospital/${id}/status/${status}`,
      method: 'post'
    })
  },
  getHospitalInfo(id) {
    return request({
      url: `/admin/hospital/get/${id}`,
      method: 'get'
    })
  }
}
