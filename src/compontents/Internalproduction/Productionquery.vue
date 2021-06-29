<template>
    <div id="Productionquery">
<!--      <h1>生产查询</h1>-->
      <el-form :inline="true" :model="Search" class="demo-form-inline">
        <el-form-item label="派工单编号：">
          <el-input v-model="Search.manufactureId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：">
          <el-input v-model="Search.productName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <el-date-picker
              v-model="datelist"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="getdata" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="manulist" border style="width: 100%">
        <el-table-column
          prop="manufactureId"
          label="派工单编号"
          width="230">
        </el-table-column>
        <el-table-column
          prop="productId"
          label="产品编号"
          width="230">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="170">
        </el-table-column>
        <el-table-column
          label="合格品数量"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.manufactureProcedureTag!='S002-2'">
              生产中
            </span>
            <span v-else-if="scope.row.manufactureProcedureTag=='S002-2'">
             {{scope.row.testedAmount}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="派工单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.manufactureProcedureTag!='S002-2'">
              执行
          </span>
            <span v-else-if="scope.row.manufactureProcedureTag=='S002-2'">
             完成
          </span>
          </template>
        </el-table-column>
        <el-table-column
          label="生产状态">
          <template slot-scope="scope">
             <span v-if="scope.row.manufactureProcedureTag!='S002-2'">
              执行
             </span>
            <span v-else-if="scope.row.manufactureProcedureTag=='S002-2'">
             完成
            </span>
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
        name: "Productionquery",
      data(){
          return{
            Search:{},
            manulist:[],
            pageno:1,
            pagesize:5,
            total:0,
            datelist:[]
          }
      },
      methods:{
        getdata(){
          var param = new URLSearchParams();
          param.append("pageno",this.pageno);
          param.append("pagesize",this.pagesize)
          Object.keys(this.Search).forEach(item =>{
            param.append(item,this.Search[item])
          })
          if(this.datelist!=''){
            param.append("date1",this.datelist[0])
            param.append("date2",this.datelist[1])
          }
          this.$axios.post("manufacture/queryALl").then(response =>{
            this.manulist=response.data.records
            this.total=response.data.total
          }).catch(e => alert("错误"))
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
      },
      created() {
          this.getdata()
      }
    }
</script>

<style scoped>

</style>
