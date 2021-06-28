<template>
    <div id="ProductRegistration">
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
        <el-table-column label="登记">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="register(scope.$index,scope.row.id)">登记</el-button>
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
<!--          <el-form-item style="padding-left: 800px" label="出库单编号：">-->
<!--            <span></span>-->
<!--          </el-form-item>-->
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
              <el-button v-if="scope.row.procedureFinishTag=='G004-0'" type="danger" size="mini"
                         @click="deji(scope.$index,scope.row.id)">登记</el-button>
              <span style="color: orange"  v-else-if="scope.row.procedureFinishTag=='G004-1' || scope.row.procedureFinishTag=='G004-2'">等待审核</span>
              <span v-else-if="scope.row.procedureFinishTag=='G004-3'">完成</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div v-if="scope.row.procedureFinishTag=='G004-3'">
                <el-button v-if="scope.row.procedureTransferTag=='G005-0'" type="danger" size="mini"
                           @click="jjdj(scope.$index)">交接登记</el-button>
                <span style="color: orange" v-else-if="scope.row.procedureTransferTag=='G005-1'">等待复核</span>
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
            <!--          <el-input clearable v-model="process.changer"></el-input>-->
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
            <!--          <el-input clearable v-model="process.changer"></el-input>-->
            <span>{{product.checker}}</span>
          </el-form-item>
          <el-form-item style="padding-left:700px" label="复核时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="product.checkerTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              >
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
          <el-button type="success" @click="tijiao">提交</el-button>
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
            <el-input style="width: 300px" clearable v-model="desmodule.procedureResponsiblePerson"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 220px" label="设计工时数：">
            <span>{{desmodule.labourHourAmount}}</span>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="已用工时数：">
            <span>{{desmodule.realLabourHourAmount}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 490px" label="本次工时数：">
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
          <el-form-item label="登记人：">
            <el-input style="width: 300px" clearable v-model="desmodule.register"></el-input>
          </el-form-item>
          <el-form-item style="padding-left:200px" label="登记时间：">
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
        <el-input size="small" v-model="realAmount">
          <template slot="prepend">请输入本工序合格品数量:</template>
        </el-input>

      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProductRegistration",
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
            jiaojieformulateprocess:false,
            realAmount:0
          }
        },
      methods:{
        getdata(){
          this.$axios.post("manufacture/page").then(response =>{
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
        deji(index,id){
          var bool= true;
          if (index==0){
            var params = new URLSearchParams();
            params.append("id",id);
            this.$axios.post("manufacture/querypromoduleById",params).then(response =>{
              this.desmodulelist=response.data
              this.desmodule=this.productlist[index];
              this.resdia=true;
            }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
          }else if (this.productlist[index-1].procedureTransferTag!='G005-2'){
            this.$message.error("上一道工序未交接完成，请先交接工序！！")
            bool=false;
          }
          if (bool){
            var params = new URLSearchParams();
            params.append("id",id);
            this.$axios.post("manufacture/querypromoduleById",params).then(response =>{
              this.desmodulelist=response.data
              this.desmodule=this.productlist[index];
              this.resdia=true;
            }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
          }
        },
        tijiao(){
          this.desmodulelist[0].proceduring=(this.desmodule);
          this.$axios.post("manufacture/dengji",JSON.stringify(this.desmodulelist),{headers:{"Content-Type":"application/json"}}).then(response =>{
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
        jjdj(index){
          this.desmodule=this.productlist[index];
          this.jiaojieformulateprocess=true;
        },
        jjqr(){
          if (this.realAmount==this.desmodule.demandAmount ){
            var params = new URLSearchParams();
            params.append("id",this.desmodule.id)
            params.append("realAmount",this.realAmount)
            this.$axios.post("manufacture/tojiaojie",params).then(response =>{
              if (response.data){
                this.$message({
                  message: '本工序交接登记完成，需要复核！',
                  type: 'warning'
                });
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
          }else{
            this.$message.error('合格数量不对！！');
          }
        },
        // aa(val){
        //   this.desmodule.realAmount=this.realAmount
        // },
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
        //获取当前时间
        getdate(){
          let date = new Date();
          let Y = date.getFullYear();
          let M = this.getStr(date.getMonth() + 1);
          let D = this.getStr(date.getDate());
          let hours = date.getHours();
          let minutes = this.getStr(date.getMinutes());
          let seconds = this.getStr(date.getSeconds());
          var date1 =Y + "-" + M + "-" + D + " " + hours + ":" + minutes + ":" + seconds;
          // this.desmodule.registerTime =date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
      },
      created() {
          this.getdata()
      }
    }
</script>

<style scoped>

</style>
