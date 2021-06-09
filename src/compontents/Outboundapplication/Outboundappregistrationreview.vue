<template>
    <div id="Outboundappregistrationreview">
      <span>当前等待审核的申请单总数：{{total}}列</span>
      <el-table :data="storagetable"  border style="width: 100%">
        <el-table-column
          prop="id"
          label="申请单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="出库理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登记时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="归还时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总件数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总金额（元）"
          width="175">
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row.id)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "Outboundappregistrationreview"
    }
</script>

<style scoped>

</style>
