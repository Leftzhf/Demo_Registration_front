import request from '@/utils/request'

export default {
  // 查询医院设置信息-分页
  getHospitalSettingsList(current, limit, query) {
    return request({
      url: `/admin/hospital/settings/getWithPage/${current}/${limit}`,
      method: 'post',
      data: query// 使用json形式传递参数
    })
  },
  // 根据id查询医院设置信息
  getHospitalSettingsListByid(id) {
    return request({
      url: `/admin/hospital/settings/get/${id}`,
      method: 'get'
    })
  },
  // 根据id删除医院设置信息
  deleteHospitalSettings(id) {
    return request({
      url: `/admin/hospital/settings/delete/${id}`,
      method: 'delete'
    })
  },
  // 批量删除医院设置信息
  deleteBatchHospitalSettings(idList) {
    return request({
      url: `/admin/hospital/settings/batchDelete`,
      method: 'delete',
      data: idList
    })
  },
  // 新增医院设置信息
  addHospitalSettings(hospitalSettings) {
    return request({
      url: `/admin/hospital/settings/add`,
      method: 'post',
      data: hospitalSettings
    })
  },
  updateHospitalSettings(hospitalSettings) {
    return request({
      url: `/admin/hospital/settings/update`,
      method: 'put',
      data: hospitalSettings
    })
  }
}
