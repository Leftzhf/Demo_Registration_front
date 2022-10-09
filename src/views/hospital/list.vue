<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="initHospitalList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80">
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="param.Hostype" label="等级" width="90" />
      <el-table-column prop="param.fullAddress" label="详情地址" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '未上线' : '已上线' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作" width="230" align="center">
        <template v-slot="scope">
          <router-link :to="'/hospitalSettings/hospital/list/show/'+scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>
          <router-link :to="'/hospitalSettings/hospital/schedule/'+scope.row.hoscode">
            <el-button type="primary" size="mini">排班</el-button>
          </router-link>

          <el-button v-if="scope.row.status == 1" type="primary" size="mini" @click="updateStatus(scope.row.id, 0)">下线</el-button>
          <el-button v-if="scope.row.status == 0" type="danger" size="mini" @click="updateStatus(scope.row.id, 1)">上线</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page.sync="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="initHospitalList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import hospitalApi from '@/api/hospital'
import dictionaryApi from '@/api/dictionary'
export default {
  name: 'List',
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 医院列表数据集合
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {
        provinceCode: '',
        cityCode: '',
        hosname: ''
      }, // 查询表单对象
      provinceList: [], // 所有省集合
      cityList: [] // 所有市集合
    }
  },
  created() {
    // 初始化页面数据
    this.initHospitalList()
    // 初始化查询字典
    this.initProvince()
  },
  methods: {
    updateStatus(id, status) {
      hospitalApi.updateHospitalStatus(id, status).then(response => {
        this.initHospitalList()
      })
    },
    initProvince() {
      dictionaryApi.getDictChildByDictCode('Province').then(response => {
        this.provinceList = response.data
      })
    },
    provinceChanged() {
      // 初始化值
      this.cityList = []
      this.searchObj.cityCode = ''
      dictionaryApi.getDictionaryList(this.searchObj.provinceCode).then(response => {
        this.cityList = response.data
      })
    },
    changeSize() {
      this.initHospitalList(1)
    },
    resetData() {
      this.searchObj.provinceCode = ''
      this.searchObj.cityCode = ''
      this.searchObj.hosname = ''
      this.initHospitalList()
    },
    initHospitalList(page = 1) {
      this.page = page
      hospitalApi.getHospitalLists(this.page, this.limit, this.searchObj).then(response => {
        this.total = response.data.totalElements
        this.list = response.data.content
        this.listLoading = false
      })
    }
  }
}

</script>

<style scoped>

</style>
