<template>
  <div>
    <div>
      <h2>生产派工查询</h2>
      <span style="color:orange">
                 当前等待审核的派工总数：{{numberS01}}例
            </span>
      <br/>
      <br/>
      <span style="color:palegreen">
                 当前通过审核的派工总数：{{numberS02}}例
            </span>
      <br/>
      <br/>
      <span style="color:red">
                 当前不通过审核的派工总数：{{numberS03}}例
            </span>
      <br/>
      <br/>
      <el-form :inline="true" :model="fromDispatch" class="demo-form-inline">
        <el-form-item label="派工编号">
          <el-input  placeholder="派工编号" v-model="fromDispatch.manufactureId"></el-input>
        </el-form-item>
        <el-form-item label="产品名">
          <el-input  placeholder="产品名"  v-model="fromDispatch.productName"></el-input>
        </el-form-item>
        <el-form-item label="派工审核状态">
          <el-select v-model="fromDispatch.checkTag"  placeholder="请选择审核状态">
            <el-option label="--请选择--" value="-1"></el-option>
            <el-option label="待审核" value="S001-0"></el-option>
            <el-option label="审核通过" value="S001-1"></el-option>
            <el-option label="审核未通过" value="S001-2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="DispatchList" >
      <el-table-column
        prop="manufactureId"
        label="派工单编号">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称">
      </el-table-column>

      <el-table-column
        prop="amount"
        label="投产数量">
      </el-table-column>

      <el-table-column
        prop="testedAmount"
        label="合格数">
        <template slot-scope="scope">
            {{scope.row.testedAmount | replace2}}
        </template>
      </el-table-column>
      <el-table-column
        prop="checkTag"
        label="审核状态">
        <template slot-scope="scope">
          {{scope.row.checkTag | replace}}
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
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
        name: "Dispatchinquiry",
        data(){
          return{
            DispatchList:[],
            fromDispatch:{
              manufactureId:"",
              productName:"",
              checkTag:"-1",
            },
            total:0,
            pageno:1,
            pagesize:10,
            numberS01:0,
            numberS02:0,
            numberS03:0,
          }
        },
      methods:{

        //获得各种审核状态数量
        getstaraNum(){
          var s01=this.DispatchList.filter((item)=>{
            return item.checkTag=="S001-0";
          })
          var s02=this.DispatchList.filter((item)=>{
            return item.checkTag=="S001-1";
          })
          var s03=this.DispatchList.filter((item)=>{
            return item.checkTag=="S001-2";
          })

          this.numberS01=s01.length;
          this.numberS02=s02.length;
          this.numberS03=s03.length;
        },

          //获取主要数据
          getDispatchList(){

              var params=new URLSearchParams();
              params.append("pageno",this.pageno);
              params.append("pagesize",this.pagesize);

            Object.keys(this.fromDispatch).forEach((item)=> {
              params.append(item,this.fromDispatch[item]);
            })

              this.$axios.post("manufacture/manufactureIPage",params).then((response)=>{
                   this.DispatchList=response.data.records;
                   this.total=response.data.total;
                    this.getstaraNum();
              }).catch()
          },

        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getApplyData();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getApplyData();
        },

        //查询
         query(){
            this.getDispatchList();
         }
      },created() {
        this.getDispatchList();
      },
      filters:{
        replace(val){
          if("S001-0"==val){
            return "待审核"
          }
          if("S001-1"==val){
            return "审核通过"
          }
          if("S001-2"==val){
            return "审核不通"
          }
        },

        replace2(val){
          if(val==0){
            return "生产中"
          }else{
            return val;
          }
        }
      }

    }
</script>

<style scoped>

</style>
