<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;font-size: 10px;">
      选择：{{ bookingScheduleList.hospitalName }} / {{ bookingScheduleList.depatmentName }} / {{ workDate }}
    </div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <!-- 部门 -->
        <el-tree
          :data="departmentTree"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%">
          <!-- 排班日期 分页 -->
          <el-tag
            v-for="(item,index) in bookingScheduleList.bookingScheduleRuleListVoList"
            :key="index"
            @click="selectDate(item.workDate, index)"
            :type="index === activeIndex ? '' : 'info'"
            style="height: 60px;margin-right: 5px;margin-right:15px;cursor:pointer;"
          >
            {{ item.workDate }} {{ item.dayOfWeek }}<br/>
            {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>

          <!--           分页-->
          <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev, pager, next"
            @current-change="getPage"
          >
          </el-pagination>
        </el-row>
        <el-row style="margin-top: 20px;">
          <!-- 排班日期对应的排班医生 -->
          <el-table
            v-loading="listLoading"
            :data="scheduleList"
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
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="职称" width="150">
              <template slot-scope="scope">
                {{ scope.row.title }} | {{ scope.row.docname }}
              </template>
            </el-table-column>
            <el-table-column label="号源时间" width="80">
              <template slot-scope="scope">
                {{ scope.row.workTime == 0 ? '上午' : '下午' }}
              </template>
            </el-table-column>
            <el-table-column prop="reservedNumber" label="可预约数" width="80"/>
            <el-table-column prop="availableNumber" label="剩余预约数" width="100"/>
            <el-table-column prop="amount" label="挂号费(元)" width="90"/>
            <el-table-column prop="skill" label="擅长技能"/>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import departmentApi from '@/api/department'
import scheduleApi from '@/api/schedule'

export default {
  name: 'Schedule',
  data() {
    return {
      departmentTree: [],
      defaultProps: {
        children: 'departmentList',
        label: 'depname'
      },
      hoscode: null,
      activeIndex: 0,
      depcode: null,
      depname: null,
      workDate: null,

      bookingScheduleList: [],

      page: 1, // 当前页
      limit: 7, // 每页个数
      total: 0, // 总页码
      query: {
        depcode: null,
        hoscode: null,
        workDate:null
      },
      scheduleList: [] //排班详情
    }
  },
  created() {
    this.hoscode = this.$route.params.hosCode
    this.query.hoscode = this.hoscode
    this.initDepartment(this.$route.params.hosCode)
  },
  methods: {
    initDepartment(hosCode) {
      departmentApi.getDepartmentById(hosCode).then(response => {
        this.departmentTree = response.data
      })
    },
    handleNodeClick(data) {
      if (data.children != null) return
      this.depcode = data.depcode
      this.query.depcode = this.depcode
      this.depname = data.depname
      this.getPage(1)
    },
    getPage(page = 1) {
      this.page = page
      this.workDate = null
      this.activeIndex = 0
      this.getScheduleRule()
    },
    getScheduleRule() {
      scheduleApi.getBookingScheduleList(this.page, this.limit, this.query).then(response => {
        this.bookingScheduleList = response.data
        this.total=response.data.total
      })
    },
    selectDate(workDate, index) {
      this.workDate = workDate
      this.query.workDate = workDate
      this.activeIndex = index
      this.getScheduleInfo()
    },
    getScheduleInfo() {
      scheduleApi.getScheduleList(this.query).then(response =>{
        this.scheduleList = response.data.scheduleList

      })
    }
  }

}
</script>

<style scoped>
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #409EFF !important;
  color: white;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}
</style>
