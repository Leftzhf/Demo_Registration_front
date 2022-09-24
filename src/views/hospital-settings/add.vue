<template>
  <div class="app-container">
    添加医院设置信息
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSettings.hospitalName"/>
      </el-form-item>

      <el-form-item label="医院编号">
        <el-input v-model="hospitalSettings.hospitalCode"/>
      </el-form-item>

      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSettings.apiUrl"/>
      </el-form-item>

      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSettings.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSettings.contactsPhone"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospitalSettingsApi from '@/api/hospital-settings'

export default {
  name: 'Add',
  data() {
    return {
      hospitalSettings: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getListById(this.$route.params.id)
    } else {
      this.hospitalSettings = {}
    }
  },
  methods: {
    save() {
      hospitalSettingsApi.addHospitalSettings(this.hospitalSettings).then(response => {
        // 保存成功提示
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        // 跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: '/hospitalSettings/list' })
      })
    },
    update(hospitalSettings) {
      hospitalSettingsApi.updateHospitalSettings(hospitalSettings).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$router.push({ path: '/hospitalSettings/list' })
      })
    },
    saveOrUpdate() {
      // 如果有id则更新，否则是添加
      if (this.hospitalSettings.id) {
        this.update(this.hospitalSettings)
      } else {
        this.save()
      }
    },
    getListById(id) {
      hospitalSettingsApi.getHospitalSettingsListByid(id).then(response => {
        this.hospitalSettings = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
