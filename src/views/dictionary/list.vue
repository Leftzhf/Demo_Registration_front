<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <a href="http://localhost:8202/admin/dictionary/exportDictionary" target="_blank">
          <el-button type="text"><i class="fa fa-plus"/> 导出</el-button>
        </a>
        <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
      </div>
    </div>
    <el-table
      :data="dictionary"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

      <el-table-column label="名称" width="230" align="left">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码" width="220">
        <template v-slot="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template v-slot="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">

        <el-form-item label="文件">

          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/dictionary/importDictionary'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dictionaryApi from '@/api/dictionary'

export default {
  name: 'List',
  data() {
    return {
      // 控制弹出显示
      dialogImportVisible: false,
      // 查询的字典数据
      dictionary: []
    }
  },
  created() {
    this.getDictionaryList(1)
  },
  methods: {

    importData() {
      this.dialogImportVisible = true
    },
    onUploadSuccess() {
      // 关闭单框
      this.dialogImportVisible = false
      // 刷新页面
      this.getDictionaryList(1)
    },
    exportData() {
      // 调用导出接口
      window.location.href = 'http://localhost:8202/admin/cmn/dict/exportData'
    },
    getDictionaryList(id) {
      dictionaryApi.getDictionaryList(id).then(response => {
        this.dictionary = response.data
      })
    },
    getChildrens(tree, treeNode, resolve) {
      dictionaryApi.getDictionaryList(tree.id).then(response => {
        resolve(response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
