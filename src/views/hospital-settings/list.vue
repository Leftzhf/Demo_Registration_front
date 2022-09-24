<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.hospitalName" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.hospitalCode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="deleteBatch()">批量删除</el-button>
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"/>
      <el-table-column type="index" width="50" label="序号"/>
      <el-table-column prop="hospitalName" label="医院名称"/>
      <el-table-column prop="hospitalCode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template #default="scope">
          {{ scope.row.status === '1' ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template #default="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
          </el-button>
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row)"
          >锁定
          </el-button>
          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id,1)"
          >取消锁定
          </el-button>
          <router-link :to="'/hospitalSettings/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>

        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import hospitalSettingsApi from '@/api/hospital-settings'

export default {
  name: 'List',
  data() {
    return {
      current: 1, // 当前页码
      limit: 3, // 每页显示记录数
      query: {}, // 条件查询对象
      list: [], // 每页数据集合
      total: 0, // 分页总记录数
      multipleSection: []// 多选id列表
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 锁定和取消锁定
    lockHostSet(id, status) {
      hospitalSettingsApi.updateHospitalSettings(id, status)
        .then(response => {
          // 刷新
          this.getList()
        })
    },
    // 分页查询
    getList(page = 1) {
      this.current = page
      hospitalSettingsApi.getHospitalSettingsList(this.current, this.limit, this.query).then(response => {
        console.log(response)
        this.list = response.data.records
        this.total = response.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除指定设置信息
    removeDataById(id) {
      this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行then方法
        // 调用接口
        hospitalSettingsApi.deleteHospitalSettings(id)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(this.current)
          })
      })
    },
    // 批量删除选中信息
    deleteBatch() {
      this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行then方法
        // 调用接口
        var idList = []
        for (var i = 0; i < this.multipleSection.length; i++) {
          idList.push(this.multipleSection[i].id)
        }
        hospitalSettingsApi.deleteBatchHospitalSettings(idList)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(this.current)
          })
      })
    },
    handleSelectionChange(selection) {
      this.multipleSection = selection
    }
  }
}
</script>

<style scoped>

</style>
