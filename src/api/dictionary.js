import request from '@/utils/request'

export default {
  // 根据id查询子节点
  getDictionaryList(id) {
    return request({
      url: `/admin/dictionary/getChildById/${id}`,
      method: 'get'
    })
  },
  // 根据dictCode查询子节点
  getDictChildByDictCode(dictCode) {
    return request({
      url: `/admin/dictionary/getChildByDictCode/${dictCode}`,
      method: 'get'
    })
  }
}
