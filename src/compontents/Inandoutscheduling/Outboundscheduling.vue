<template>
  <div id="Outboundscheduling">
    <span>当前等待做调度的出库单总数：{{total}}列</span>
    <el-table :data="paydata"  border style="width: 100%">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
    export default {
        name: "Outboundscheduling",
      data(){
          return {
            pageno: 1,
            pagesize: 5,
            total:0,
            paydata:[]

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
        //查询出库信息
        getpaydata (){
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);

          this.$axios.post("pay/payselect.action", params).then((response) => {
            _this.paydata = response.data.records;
            _this.total = response.data.total;
          }).catch();

        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getmenudata();
        },
        handleCurrentChange(val) {  //页码变更

          this.pageno = val;
          this.getmenudata();
        },

      },
      created(){
        this.getpaydata();
      }
    }
</script>

<style scoped>

</style>
