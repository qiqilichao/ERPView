<template>
    <div id="ProductRegistration">
      <span>当前等待登记的生产派工单总数:{{total}}</span>
      <el-table :data="proretable"  border style="width: 100%">
        <el-table-column
        prop="id"
        label="生产派工单编号"
        width="200">
      </el-table-column>
        <el-table-column
          prop="name"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="出库单编号集合"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登记时间"
          width="175">
        </el-table-column>
        <el-table-column label="登记">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "ProductRegistration",
        data(){
          return {
            proretable:[],
            total:0
          }
        }
    }
</script>

<style scoped>

</style>
