<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="packages"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="55">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Package Name">
        <template slot-scope="scope">
          {{ scope.row.package }}
        </template>
      </el-table-column>
      <el-table-column label="Current Version" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.versionNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Dependency" align="center">
        <template slot-scope="scope">
          {{ scope.row.dep }}
        </template>
      </el-table-column>
      <el-table-column label="Domain" align="center">
        <template slot-scope="scope">
          {{ scope.row.domain }}
        </template>
      </el-table-column>
      <el-table-column label="Path" align="center">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import ProjectConfig from '@/data/sfdx-project.json'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      packages: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
    this.readFile()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    readFile() {
      console.log(ProjectConfig.packageDirectories)
      this.packages = ProjectConfig.packageDirectories
    }
  }
}
</script>
