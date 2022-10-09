import request from '@/utils/request'

export default {
  getBookingScheduleList(page, limit, query) {
    return request({
      url: `/admin/hospital/schedule/booking/pages/${page}/${limit}`,
      method: 'get',
      params: query
    })
  } ,
  getScheduleList(query) {
    return request({
      url: `/admin/hospital/schedule/lists`,
      method: 'get',
      params: query
    })
  } ,
}
