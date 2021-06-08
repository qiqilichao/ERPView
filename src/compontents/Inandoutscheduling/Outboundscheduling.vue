<template>
  <div id="Outboundscheduling">
    <span>当前等待做调度的出库单总数：{{total}}列</span>
    <el-table :data="storagetable"  border style="width: 100%">
      <el-table-column
        prop="id"
        label="出库单编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="出库理由"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="出库详情理由"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="登记时间"
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
      <el-table-column label="出库调度">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row.id)">出库调度</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
    export default {
        name: "Outboundscheduling",
      data(){
          return {
            total:0,
            storagetable:[]

          }
      },
      methods:{
        handleEdit(ids){
          this.upddialog = true;
        },
        //  关闭模态框
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      }
    }
</script>

<style scoped>

</style>
