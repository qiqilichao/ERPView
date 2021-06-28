<template>
  <div id="Processmaterialtoexaminequery">
    <el-table :data="processlist" border style="width: 100%">
      <el-table-column
        prop="designId"
        label="设计单编号">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="230">
      </el-table-column>
      <el-table-column label="设计单状态">
        <template slot-scope="scope">
          <span>{{scope.row.designModuleTag | shenhezhuangtai}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
          <template slot-scope="scope">
            <span>{{scope.row.checkTag | shejizhuangtai}}</span>
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
        name: "Processmaterialtoexaminequery",
      data(){
          return {
            processlist:[],
            pageno:1,
            pagesize:5,
            total:0,
          }
      },
      methods:{
          getdata(){
            var params = new URLSearchParams();
            params.append("pageno",this.pageno);
            params.append("poagesize",this.pagesize)

            this.$axios.post("gx/queryProcess",params).then(response =>{
              this.processlist=response.data.records
              this.total=response.data.total
            }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
          },
          handleSizeChange(val) {  //页size变更
            this.pagesize = val;
            this.pageno = 1;
            this.getDfile();
          },
          handleCurrentChange(val) {  //页码变更
            this.pageno = val;
            this.getDfile();
          },
          //  关闭模态框
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {
              });
          }
      },
      created() {
          this.getdata()
      },
      filters:{
          shejizhuangtai(val){
            if (val=='S001-0'){
              return '等待';
            }
            if (val=='S001-1'){
              return '通过';
            }
            if (val=='S001-2'){
              return '不通过';
            }
          },
        shenhezhuangtai(val){
          if (val=='G002-0'){
            return '未设计';
          }
          if (val=='G002-1'){
            return '等待';
          }
          if (val=='G002-2'){
            return '完成';
          }
        }
      }
    }
</script>

<style scoped>

</style>
