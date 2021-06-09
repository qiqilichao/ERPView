<template>
    <div id="Outboundappregistrationquery">
      <span>当前等待审核的申请单总数：{{total}}列</span>
      <el-table :data="storagetable"  border style="width: 100%">
        <el-table-column
          prop="id"
          label="申请单编号"
          width="230">
        </el-table-column>
        <el-table-column
          prop="name"
          label="出库理由"
          width="140">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登记时间"
          width="230">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总件数"
          width="170">
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请单状态"
          width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          label="审核状态"
          width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          label="借领状态"
          width="163">
        </el-table-column>
        <el-table-column
          prop="name"
          label="归还状态"
          >
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "Outboundappregistrationquery",
      data(){
          return {
            storagetable:[],
            total:0
          }
      }
    }
</script>

<style scoped>

</style>
