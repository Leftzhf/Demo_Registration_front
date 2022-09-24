import request from '@/utils/request'

export default {
  getDictionary(id) {
    return request({
      url: `/admin/dictionary/get/${id}`,
      method: 'get'
    })
  }
}
