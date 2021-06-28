<template>
    <div id="ProductRegistrationreview">
      <span>当前等待登记的生产派工单总数:{{total}}</span>
      <el-table :data="proretable"  border style="width: 100%">
        <el-table-column
          prop="manufactureId"
          label="生产派工单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          label="出库单编号集合"
          width="180">
        </el-table-column>
        <el-table-column
          prop="registerTime"
          label="登记时间"
          width="175">
        </el-table-column>
        <el-table-column label="复核">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="register(scope.$index,scope.row.id)">复核</el-button>
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

      <el-dialog title="生产派工单" :visible.sync="productdia" width="85%" :before-close="handleClose">
        <div style="padding-left: 1200px">
          <el-button type="info" @click="productdia=false">返回</el-button>
        </div>
        <h1>生产派工单</h1>
        <el-form :inline="true" :model="product" class="demo-form-inline">
          <el-form-item label="派工单编号：">
            <span>{{product.manufactureId}}</span>
          </el-form-item>
          <br>
          <el-form-item  label="产品编号：">
            <span>{{product.productId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 820px" label="产品名称：">
            <span>{{product.productName}}</span>
          </el-form-item>
          <br>
          <el-form-item label="描述：">
            <span>{{product.productDescribe}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 950px" label="数量：">
            <span>{{product.amount}}</span>
          </el-form-item>
        </el-form>

        <el-table :data="productlist" border style="width: 100%">
          <el-table-column
            prop="procedureName"
            label="工序名称"
            width="155">
          </el-table-column>
          <el-table-column
            prop="labourHourAmount"
            label="设计工时数"
            width="155">
          </el-table-column>
          <el-table-column
            prop="realLabourHourAmount"
            label="实际工时数"
            width="155">
          </el-table-column>
          <el-table-column
            prop="subtotal"
            label="设计工时成本（元）"
            width="155">
          </el-table-column>
          <el-table-column
            prop="realSubtotal"
            label="实际工时成本（元）"
            width="185">
          </el-table-column>
          <el-table-column
            prop="moduleSubtotal"
            label="设计物料成本（元）"
            width="190">
          </el-table-column>
          <el-table-column
            prop="realModuleSubtotal"
            label="实际物料成本"
            width="190">
          </el-table-column>
          <el-table-column label="工序登记">
            <template slot-scope="scope">
              <el-button v-if="scope.row.procedureFinishTag=='G004-1' || scope.row.procedureFinishTag=='G004-2'" type="danger" size="mini"
                         @click="fuhe(scope.$index,scope.row.parentId,scope.row.procedureId)">复核</el-button>
              <span v-else-if="scope.row.procedureFinishTag=='G004-3'">完成</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div v-if="scope.row.procedureFinishTag=='G004-3'">
                <el-button type="danger" size="mini" @click="jjfh(scope.$index)"
                           v-if="scope.row.procedureTransferTag=='G005-1'">交接复核</el-button>
                <span v-else-if="scope.row.procedureTransferTag=='G005-2'">完成</span>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-form :inline="true" :model="product" class="demo-form-inline">
          <el-form-item label="设计工时总成本：">
            <span>{{product.labourCostPriceSum}}</span>
          </el-form-item>
          <el-form-item label="设计物料总成本：" style="padding-left: 790px">
            <span>{{product.moduleCostPriceSum}}</span>
          </el-form-item>
          <br>
          <el-form-item label="实际工时总成本：">
            <span>{{product.realLabourCostPriceSum}}</span>
          </el-form-item>
          <el-form-item label="实际物料总成本：" style="padding-left: 790px">
            <span>{{product.realModuleCostPriceSum}}</span>
          </el-form-item>
          <br/>
          <el-form-item label="登记人：">
            <span>{{product.register}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 700px" label="登记时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="product.registerTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              :disabled="true">
              </el-date-picker>
            </div>
          </el-form-item><br/>
          <el-form-item label="复核人：">
            <span>{{product.checker}}</span>
          </el-form-item>
          <el-form-item style="padding-left:700px" label="复核时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="product.checkTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              :disabled="true">
              </el-date-picker>
            </div>
          </el-form-item><br>
          <el-form-item label="备注：">
            <!--          <el-input   v-model="process.checkSuggestion" style="width: 1000px" type="textarea"></el-input>-->
            <span>{{product.remark}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="生产登记单" :visible.sync="resdia" width="70%" :before-close="handleClose">
        <div style="padding-left: 850px">
          <el-button type="success" @click="fhtg">复核通过</el-button>
          <el-button type="info" @click="resdia=false">返回</el-button>
        </div>
        <h1>生产登记单</h1>
        <el-form :inline="true" :model="desmodule" class="demo-form-inline">
          <el-form-item label="派工单编号：">
            <span>{{product.manufactureId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="工序名称：">
            <!--            <el-input style="width: 300px" clearable v-model="desmodule.designer1"></el-input>-->
            <span>{{desmodule.procedureName}}</span>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="负责人：">
<!--            <span>{{desmodule.procedureResponsiblePerson}}</span>-->
            <el-input style="width: 300px" clearable v-model="desmodule.procedureResponsiblePerson"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 220px" label="设计工时数：">
            <span>{{desmodule.labourHourAmount}}</span>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="已用工时数：">
            <span>{{desmodule.realLabourHourAmount}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 490px" label="本次工时数：">
<!--            <span>{{desmodule.labourHourAmount1}}</span>-->
            <el-input style="width: 300px" clearable v-model="desmodule.labourHourAmount1"></el-input>
          </el-form-item>
        </el-form>

        <el-table :data="desmodulelist" border style="width: 100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="70px">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="185">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="物料编号"
            width="185">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="设计数量"
            width="185">
          </el-table-column>
          <el-table-column
            prop="renewAmount"
            label="补充数量"
            width="185">
          </el-table-column>
          <el-table-column
            prop="realAmount"
            label="已使用数量"
            width="190">
          </el-table-column>
          <el-table-column
            label="本次数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shuliang" ></el-input>
            </template>
          </el-table-column>
        </el-table>

        <el-form :inline="true" :model="desmodule" class="demo-form-inline">
          <el-form-item label="复核人：">
            <el-input style="width: 300px" clearable v-model="desmodule.register"></el-input>
          </el-form-item>
          <el-form-item style="padding-left:200px" label="复核时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="desmodule.registerTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        :visible.sync="jiaojieformulateprocess"
        width="20%"
        :before-close="handleClose">
        <div style="padding-left: 150px">
          <el-button type="success" size="mini" @click="jjqr">确认</el-button>
          <el-button type="info" size="mini" @click="jiaojieformulateprocess=false">返回</el-button>
        </div>
        <br>
        <el-input size="small" v-model="desmodule.demandAmount" readonly>
          <template slot="prepend">本工序投产数量:</template>
        </el-input>
        <el-input size="small" v-model="desmodule.realAmount">
          <template slot="prepend">请输入本工序合格品数量:</template>
        </el-input>

      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "ProductRegistrationreview",
      data(){
        return {
          proretable:[],
          pageno:1,
          pagesize:5,
          total:0,
          productdia:false,
          product:{},
          productlist:[],
          resdia:false,
          desmodule: {},
          desmodulelist:[],
          jiaojieformulateprocess:false
        }
      },
      methods:{
        getdata(){
          this.$axios.post("manufacture/toexpage").then(response =>{
            this.proretable=response.data.records
            this.total=response.data.total
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        register(index,id){
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("manufacture/queryManuById",params).then(response =>{
            this.productlist=response.data
            this.product=this.proretable[index];
            this.productdia=true
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        fuhe(index,ids,proid){
          var params = new URLSearchParams();
          params.append("id",ids);
          params.append("proid",proid)
          this.$axios.post("manufacture/seltoexaproding",params).then(response =>{
            this.desmodulelist=response.data
            this.desmodule=this.productlist[index];
            this.desmodule.procedureResponsiblePerson=this.desmodulelist[0].proceduring2.procedureResponsiblePerson
            this.desmodule.labourHourAmount1=this.desmodulelist[0].proceduring2.labourHourAmount1
            this.resdia=true;
            console.log(response.data)
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        fhtg(){
          this.desmodulelist[0].proceduring=(this.desmodule);
          this.$axios.post("manufacture/toexmateok",JSON.stringify(this.desmodulelist),{headers:{"Content-Type":"application/json"}}).then(response =>{
            if (response.data){
              this.$message({
                message: '提交成功，请去审核',
                type: 'success'
              });
              this.getdata();
              this.resdia=false;
              this.productdia=false
            }
          }).catch(e =>{
            this.$message.error('出现问题了，请联系开发人员！');
          })
        },
        jjfh(index){
          this.desmodule=this.productlist[index];
          this.jiaojieformulateprocess=true;
        },
        jjqr(){
          var params = new URLSearchParams();
          params.append("id",this.desmodule.id)
          this.$axios.post("manufacture/jiaojieok",params).then(response =>{
            if (response.data){
              // this.$message({
              //   message: '本工序交接登记完成，需要复核！',
              //   type: 'warning'
              // });
              this.getdata();
              this.resdia=false;
              this.productdia=false;
              this.jiaojieformulateprocess=false
            }else{
              this.$message.error('错误');
            }
          }).catch(e =>{
            this.$message.error('出现问题了，请联系开发人员！');
          })
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
         },
      },
      created() {
        this.getdata()
      }
    }
</script>

<style scoped>

</style>
