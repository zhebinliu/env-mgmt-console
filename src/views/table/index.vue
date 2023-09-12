<template>
  <div class="app-container">
    <el-button @click="featureToggle">{{ buttonStatus }}</el-button>
    <el-table
      v-show="showTable"
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
          {{ scope.row.dependencies }}
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
      <el-table-column label="Package Id" align="center">
        <template slot-scope="scope">
          {{ scope.row.versionId }}
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!showTable">
      <div class="editor-container">
        <json-editor ref="jsonEditor" v-model="jsonContent" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectConfig from '@/data/sfdx-project.json'
import JsonEditor from '@/components/JsonEditor'
import * as fs from 'fs'

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
  components: { JsonEditor },
  data() {
    return {
      list: null,
      packages: [],
      listLoading: false,
      showTable: true,
      jsonContent: ProjectConfig,
      buttonStatus: 'JSON Editor'
    }
  },
  created() {
    // this.fetchDomain()
    this.readFile()
    this.jsonContent = ProjectConfig
  },
  methods: {
    readFile() {
      // console.log(ProjectConfig.packageDirectories)
      const packages = ProjectConfig.packageDirectories
      for (var pkg of packages) {
        var temp = {}
        temp.package = pkg.package
        temp.versionNumber = pkg.versionNumber
        temp.path = pkg.path
        if (pkg.dependencies) {
          var dep = ''
          for (var d of pkg.dependencies) {
            dep += d.package + ';'
          }
          temp.dependencies = dep
        } else {
          temp.dependencies = 'None'
        }
        console.log(pkg.package)
        console.log(ProjectConfig.packageAliases[pkg.package])
        if (ProjectConfig.packageAliases[pkg.package]) {
          temp.versionId = ProjectConfig.packageAliases[pkg.package]
        } else if (pkg.type && pkg.type === 'data') {
          temp.versionId = 'Data Pack'
        } else {
          temp.versionId = 'Source Package'
        }
        this.packages.push(temp)
      }
    },
    featureToggle() {
      this.showTable = !this.showTable
      if (this.buttonStatus === 'Package List') {
        this.buttonStatus = 'JSON Editor'
      } else {
        this.buttonStatus = 'Package List'
      }
    },
    fetchDomain() {
      const releaseConfigPath = '@/data/releaseconfigs'
      // var domain = ''
      fs.readdirsync(releaseConfigPath).foreach(file => {
        console.log('file=>' + file)
      })
      return 'Checked'
    }
  }
}
</script>
