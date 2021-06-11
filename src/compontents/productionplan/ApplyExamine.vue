<template>
      <div>
        <div>
            <h2>生产计划审核</h2>
            <span>
                 当前等待审核的计划生产总数：{{total}}例
            </span>
        </div>
        <el-table :data="applyArr">
          <el-table-column
            prop="applyId"
            label="生产计划编号">
          </el-table-column>
          <el-table-column
            prop="designer"
            label="计划制订人">
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
          <el-table-column label="审核">
            <template slot-scope="scope">
              <el-button size="mini" @click="showexamine(scope.row.id)" >审核</el-button>
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



        <!-- 打开审核模态框-->


        <el-dialog title="审核" :visible.sync="dialogTableVisible" width="1000px">
          <!--主要功能 -->

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="计划单号编号：">
              <el-input :value="formInline.applyId"></el-input>
            </el-form-item>
          </el-form>
          <el-row :gutter="24">
            <el-col :span="6" :offset="18">
              <div>
                <el-button >确定</el-button>
                <el-button >取消</el-button>
              </div>
            </el-col>
          </el-row>
          <el-table  :data="gridData" border>
            <el-table-column property="productId" label="产品编号" ></el-table-column>
            <el-table-column property="productName" label="产品名称" ></el-table-column>
            <el-table-column property="productDescribe"   label="描述" ></el-table-column>
            <el-table-column property="applyId" label="出库单编号集合"></el-table-column>
          </el-table>
          <div>
            <el-row :gutter="24">
              <el-col :span="12">
                <div>
                  <el-input placeholder="" size="small" :value="formInline.register" >
                    <template slot="prepend">登记人:</template>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-input placeholder="" size="small" :value="formInline.registerTime">
                    <template slot="prepend">登记时间:</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <div>
                  <el-input placeholder="" size="small"  :value="formInline.checker">
                    <template slot="prepend">审核人:</template>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-input placeholder="" size="small" :value="formInline.checkTime">
                    <template slot="prepend">审核时间:</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>

            <div>
              备注:
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder=""
              >
              </el-input>
            </div>
          </div>
        </el-dialog>


      </div>
</template>

<script>
    export default {
        name: "ApplyExamine",
        data(){
           return {
              total:0,
              aid:"",
              pagesize:8,
              pageno:1,
              dialogTableVisible:false,
              applyArr:[],
              gridData:[],
              formInline:{

             }
           }
        },
      methods:{

        //当前时间获取方法
        getDate(){
          let date = new Date();
          let Y = date.getFullYear();
          let M = this.getStr(date.getMonth() + 1);
          let D = this.getStr(date.getDate());
          let hours = date.getHours();
          let minutes = this.getStr(date.getMinutes());
          let seconds = this.getStr(date.getSeconds());
          var date1 =Y + "-" + M + "-" + D + " " + hours + ":" + minutes + ":" + seconds;
          this.formInline.checkTime = date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
              //初始化审核数据
          getApplyData(){
                 var params=new URLSearchParams()
                     params.append("pageno",this.pageno)
                     params.append("pagesize",this.pagesize)
                 this.$axios.post("apply/applyIPage",params).then((response)=>{

                              this.applyArr=response.data.records;
                              this.total=response.data.total;

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

        //审核模态框
          showexamine(id){
            this.dialogTableVisible=true;
            this.gridData=new Array();
             //var obj=this.gridData.find((item)=>{return item.id==id;})
             var params=new URLSearchParams();
                 params.append("id",id);
            this.$axios.post("apply/getBApplyid",params).then((response)=>{
                      this.formInline=response.data;
                      this.gridData.push( this.formInline)
                      this.getDate()
            }).catch();
          }
        },
      created() {
               this.getApplyData()
            }
    }
</script>

<style scoped>

</style>
