<template>
        <div>
          <div>
            <h2>生产计划查询</h2>
            <span style="color:orange">
                 当前等待审核的计划生产总数：{{numberS01}}例
            </span>
            <br/>
            <br/>
            <span style="color:palegreen">
                 当前通过审核的计划生产总数：{{numberS02}}例
            </span>
            <br/>
            <br/>
            <span style="color:red">
                 当前不通过审核的计划生产总数：{{numberS03}}例
            </span>
            <br/>
            <br/>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="产品名">
                <el-input v-model="formInline.productName" placeholder="产品名"></el-input>
              </el-form-item>
              <el-form-item label="登记时间区间">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="开始日期"
                    v-model="formInline.registerTime1"
                    style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="结束日期"
                    v-model="formInline.registerTime2"
                    style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-select v-model="formInline.checktag" placeholder="请选择审核状态">
                  <el-option label="--请选择--" value="-1"></el-option>
                  <el-option label="待审核" value="S001-0"></el-option>
                  <el-option label="审核通过" value="s001-1"></el-option>
                  <el-option label="审核未通过" value="s001-2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryApply">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="applyArr">
            <el-table-column
              prop="applyId"
              label="生产计划编号">
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品">
            </el-table-column>
            <el-table-column
              prop="register"
              label="登记人">
            </el-table-column>

            <el-table-column
              prop="registerTime"
              label="登记时间">
            </el-table-column>

            <el-table-column
              prop="remark"
              label="备注">
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
        name: "QueryApply",
        data(){

          return{
            applyArr:[],
            pageno:1,
            total:0,
            numberS01:0,
            numberS02:0,
            numberS03:0,
            formInline:{
              productName:"",
              region:"",
              registerTime1:"",
              registerTime2:"",
              checktag:"-1"
            },
            pagesize:8,
          }
        },
      methods:{


          //获得各种审核状态数量
          getstaraNum(){
                  var s01=this.applyArr.filter((item)=>{
                       return item.checkTag=="S001-0";
                  })
                  var s02=this.applyArr.filter((item)=>{
                       return item.checkTag=="s001-1";
                  })
                  var s03=this.applyArr.filter((item)=>{
                       return item.checkTag=="s001-2";
                  })

                  this.numberS01=s01.length;
                  this.numberS02=s02.length;
                  console.log(s02)
                  this.numberS03=s03.length;
          },


        //初始化审核数据
        getApplyData(){
          var params=new URLSearchParams()
          params.append("pageno",this.pageno)
          params.append("pagesize",this.pagesize)
          params.append("productName",this.formInline.productName)
          if(this.formInline.registerTime1!=null){
            params.append("registerTime",this.formInline.registerTime1)
          }
          if(this.formInline.registerTime2!=null){
            params.append("registerTime2",this.formInline.registerTime2)
          }
          params.append("checkTag",this.formInline.checktag)
          this.$axios.post("apply/applyAllIPage",params).then((response)=>{
            this.applyArr=response.data.records;
            this.total=response.data.total;
            this.getstaraNum();

          }).catch();
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

        //条件查询
        queryApply(){
            this.getApplyData();
        }
      },
      created() {
          this.getApplyData()
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
        }
      }
    }
</script>

<style scoped>

</style>
