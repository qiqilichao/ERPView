<template>
  <div>
    <div>
      <h2>生产派工查询</h2>
      <span >
                 当前库存总数：{{scelltotal}}件
            </span>
      <br/>
      <br/>
      <span style="color:red">
                 当前库存上限报警产品种类：{{maxAmount}}种
            </span>
      <br/>
      <br/>
      <span style="color:orange ">
                 当前库存下限报警产品种类：{{minAmount}}种
            </span>
      <br/>
      <br/>
      <el-form :inline="true" :model="fromDispatch" class="demo-form-inline">
        <el-form-item label="产品编号">
          <el-input  placeholder="产品编号" v-model="fromDispatch.productId"></el-input>
        </el-form-item>
        <el-form-item label="产品名">
          <el-input  placeholder="产品名"  v-model="fromDispatch.productName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    <el-table :data="scellArr" >
      <el-table-column
        prop=""
        label="一级产品分类">
        <template slot-scope="scope">
          {{scope.row.firstKindId +"-"+ scope.row.firstKindName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="secondKindId"
        label=二级产品分类>
        <template slot-scope="scope">
          {{scope.row.secondKindId +"-"+ scope.row.secondKindName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="三级产品分类">
        <template slot-scope="scope">
          {{scope.row.thirdKindId +"-"+ scope.row.thirdKindName}}
        </template>
      </el-table-column>

      <el-table-column
        prop="productId"
        label="产品编号">
      </el-table-column>

      <el-table-column
        prop="productName"
        label="产品名">

      </el-table-column>
      <el-table-column
        prop="amount"
        label="库存数量">
      </el-table-column>

      <el-table-column
        prop="maxAmount"
        label="安全库存上限">
      </el-table-column>

      <el-table-column
        prop="minAmount"
        label="安全库存下限">
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
  </div>
</template>

<script>
    export default {
        name: "Dynamicinventory",
      data(){
          return{
            pageno:1,
            pagesize:10,
            total:0,
            scelltotal:0,
            maxAmount:0,
            minAmount:0,
            scellArr:[],
            fromDispatch:{
              productId:"",
              productName:"",
            },
          }
      },
      methods:{
        //获得各种审核状态数量
        getstaraNum(){
          var s01=this.scellArr.filter((item)=>{
            return item.amount>item.maxAmount
          })
          var s02=this.scellArr.filter((item)=>{
            return item.amount<item.minAmount
          })
          this.maxAmount=s01.length;
          this.minAmount=s02.length;
        },
          getScellData(){
              var params=new  URLSearchParams();
                  params.append("pageno",this.pageno);
                  params.append("pagesize",this.pagesize);
                  Object.keys(this.fromDispatch).forEach((item)=> {
                    params.append(item,this.fromDispatch[item]);
                  })
                  this.$axios.post("Scell/pageScell",params).then((response)=>{
                        this.scellArr=response.data.records;
                        this.total=response.data.total;
                        this.scelltotal=response.data.total;
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

        query(){
          this.getScellData();
        }
      },
      created() {
          this.getScellData();
      }
    }
</script>

<style scoped>

</style>
