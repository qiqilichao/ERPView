<template>
  <div id="Processmaterialtoexaminechange">
    <el-table :data="processlist" border style="width: 100%">
      <el-table-column
        prop="designId"
        label="工序设计单编号"
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
        width="230">
      </el-table-column>
      <el-table-column
        prop="designer1"
        label="设计人"
        width="170">
      </el-table-column>
      <el-table-column
        prop="registerTime1"
        label="登记时间"
        width="230">
      </el-table-column>
      <el-table-column
        prop="costPriceSum"
        label="工时总成本"
      >
      </el-table-column>
      <el-table-column label="变更">
        <template slot-scope="scope">
          <el-button type="success" size="mini"
                     @click="toexamine(scope.$index,scope.row.id)">变更</el-button>
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

    <el-dialog
      title="工序物料设计单"
      :visible.sync="formulate"
      width="80%"
      :before-close="handleClose">
      <div style="padding-left: 1000px">
        <el-button type="success" @click="updprocessdespro">重新提交</el-button>
        <el-button type="info" @click="formulate=false">返回</el-button>
      </div>
      <h1>工序物料设计单</h1>
      <el-form :inline="true" :model="process" class="demo-form-inline">
        <el-form-item label="工序单编号：">
          <span>{{process.designId}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 500px" label="设计人：">
          <el-input style="width: 300px" clearable v-model="process.designer1"></el-input>
        </el-form-item><br>
        <el-form-item style="padding-left: 10px" label="产品名称：">
          <span>{{process.productName}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 550px" label="产品编号：">
          <span>{{process.productId}}</span>
        </el-form-item>
      </el-form>

      <el-table :data="prolist" border style="width: 100%">
        <el-table-column
          prop="detailsNumber"
          label="序号"
          width="70px">
        </el-table-column>
        <el-table-column
          prop="procedureName"
          label="工序名称"
          width="185">
        </el-table-column>
        <el-table-column
          prop="procedureId"
          label="工序编号"
          width="185">
        </el-table-column>
        <el-table-column
          prop="procedureDescribe"
          label="描述"
          width="185">
        </el-table-column>
        <el-table-column
          prop="labourHourAmount"
          label="工时数（小时）"
          width="185">
        </el-table-column>
        <el-table-column
          prop="costPrice"
          label="工时成本小计（元）"
          width="190">
        </el-table-column>
        <el-table-column
          prop="costPrice"
          label="物料工时小计"
          width="190">
        </el-table-column>
        <el-table-column label="变更">
          <template slot-scope="scope">
            <el-button v-if="scope.row.designModuleChangeTag=='D003-0'" type="danger" size="mini"
                       @click="getprocesslist(scope.$index,scope.row.id)">变更</el-button>
            <el-button v-else-if="scope.row.designModuleChangeTag=='D003-1'" type="danger" size="mini"
                       @click="getprocesslist(scope.$index,scope.row.id)">重新变更</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form :inline="true" :model="process" class="demo-form-inline">
        <el-form-item label="工时总成本：">
          <span>{{process.costPriceSum}}</span>
        </el-form-item>
        <el-form-item label="物料总成本：" style="padding-left: 590px">
          <span>{{process.moduleCostPriceSum}}</span>
        </el-form-item>
        <br>
        <el-form-item label="设计要求：">
<!--          <el-input   v-model="process.procedureDescribe" style="width: 1000px" type="textarea"></el-input>-->
          <span>{{process.procedureDescribe}}</span>
        </el-form-item><br>
        <el-form-item label="审核人：">
          <!--          <el-input clearable v-model="process.changer"></el-input>-->
          <span>{{process.changer}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 600px" label="审核时间：">
          <div class="block" >
            <el-date-picker style="width: 400px"
                            v-model="process.changeTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            default-time="12:00:00"
                            :disabled="true">
            </el-date-picker>
          </div>
        </el-form-item><br/>
        <el-form-item label="审核意见：">
<!--          <el-input   v-model="process.checkSuggestion" style="width: 1000px" type="textarea"></el-input>-->
          <span>{{process.checkSuggestion}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="工序物料设计单"
      :visible.sync="formulateprocess"
      width="65%"
      :before-close="handleClose">
      <div v-show="show1">
        <span style="color: red">变更前需要清除本工序物料设计，变更后需要对其它工序进行物料设计，你确认进行变更吗？</span>
        <div style="padding-left: 900px">
          <el-button type="warning" @click="delpressdespro">确认</el-button>
          <el-button type="info" @click="formulateprocess=false">返回</el-button>
        </div>

        <h1>工序物料设计单</h1>

        <el-form :inline="true" :model="disppdd" class="demo-form-inline">
          <el-form-item label="工序单编号：">
            <span>{{process.designId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="工序名称：">
            <!--          <el-input style="width: 300px" clearable v-model="process.designer1"></el-input>-->
            <span>{{disppdd.procedureName}}</span>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="登记人：">
            <span>{{disppdd.register}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 550px" label="登记时间：">
            <span>{{disppdd.registerTime}}</span>
          </el-form-item>
        </el-form>

        <el-table :data="disgprocess"  border style="width: 100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="物料编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="productDescribe"
            label="描述"
            width="100">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="本工序数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amountUnit"
            label="单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="costPrice"
            label="单价（元）">
          </el-table-column>
          <el-table-column prop="subtotal" label="小计（元）">
          </el-table-column>
        </el-table>
      </div>
      <div v-show="show2">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="showUp">预览</el-button>
          <el-button type="info" @click="showdo">返回</el-button>
        </div>

        <h1>工序物料设计单</h1>
        <span>制造：{{process.productName}}产品，供选择的物料清单如下：</span>
        <el-table :data="upddisgprocess"  border style="width: 100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="物料编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="productDescribe"
            label="描述"
            width="100">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="设计数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="residualAmount"
            label="可用数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amountUnit"
            label="单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="costPrice"
            label="单价（元）">
          </el-table-column>
          <el-table-column label="本工序数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount1"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="show3">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="insprodesmodule">提交</el-button>
          <el-button type="info" @click="showdo2">返回</el-button>
        </div>

        <h1>工序物料设计单</h1>
        <el-form :inline="true" :model="disppdd" class="demo-form-inline">
          <el-form-item label="工序单编号：">
            <span>{{process.designId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="工序名称：">
            <!--          <el-input style="width: 300px" clearable v-model="process.designer1"></el-input>-->
            <span>{{disppdd.procedureName}}</span>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="登记人：">
            <span>{{disppdd.register}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 550px" label="登记时间：">
            <span>{{disppdd.registerTime}}</span>
          </el-form-item>
        </el-form>
        <el-table :data="upddisgprocess"  border style="width: 100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="物料编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="productDescribe"
            label="描述"
            width="100">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="本工序数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amountUnit"
            label="单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="costPrice"
            label="单价（元）">
          </el-table-column>
          <el-table-column
            prop="subtotal1"
            label="小计（元）"
          >

          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Processmaterialtoexaminechange",
      data(){
        return {
          processlist:[],
          pageno:1,
          pagesize:5,
          total:0,
          formulate:false,
          process:{},
          prolist:[],
          formulateprocess:false,
          disppdd:{},
          disgprocess:[],
          show1:true,
          show2:false,
          show3:false,
          upddisgprocess:[]
        }
      },
      methods:{
        getdata(){
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("poagesize",this.pagesize)

          this.$axios.post("gx/queryProcesstoexmainOk",params).then(response =>{
            this.processlist=response.data.records
            this.total=response.data.total
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        toexamine(index,ids){
          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/seldisproById",params).then(response =>{
            this.prolist= response.data;
            this.process=this.processlist[index];
            this.formulate=true;
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        updprocessdespro(){
          var params = new URLSearchParams();
          params.append("id",this.process.id);

          this.$axios.post("gx/updprocessdespro",params).then(response =>{
            this.formulate=false;
            if (response.data) {
              this.$message({
                showClose: true,
                message: '更改成功，情趣审核',
                type: 'success'
              });
              this.getdata();
            }
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        //变更（工序物料）
        getprocesslist(index,ids){
          this.disppdd=this.prolist[index]

          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/getprocesslist",params).then(response =>{
            this.disgprocess= response.data;
            this.formulateprocess=true;
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        delpressdespro(){
          var params = new URLSearchParams();
          params.append("proid",this.disppdd.id);
          this.$axios.post("gx/selnewprocessById",params).then(response =>{
            this.upddisgprocess=response.data
            this.upddisgprocess.forEach(item =>{
              item.parintid=this.disppdd.id;
            })
            this.disppdd.registerTime=this.getdate()
            this.show1=false;
            this.show2=true
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        insprodesmodule(){
          if (this.upddisgprocess.length==0) {
            var aa={};
            this.upddisgprocess.push(aa)
          }
          this.upddisgprocess[0].register=this.disppdd.register;

          this.$axios.post("gx/insnewpressdespro",JSON.stringify(this.upddisgprocess),{headers:{"Content-Type":"application/json"}}).then(response =>{
            if (response.data){
              this.$message({
                showClose: true,
                message: '设计成功',
                type: 'success'
              });
              this.show1=true;
              this.show2=false;
              this.show3=false;
              this.formulateprocess=false;
              this.prolistsx(this.process.id);
            }else{
              this.$message({
                showClose: true,
                message: '设计失败',
                type: 'warning'
              });
            }
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        prolistsx(ids){
          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/seldisproById",params).then(response =>{
            this.prolist= response.data;
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
        },
        showUp(){
          this.show2=false;
          this.show3=true;
          this.upddisgprocess.forEach(item =>{
            item.subtotal1=item.amount1 * item.costPrice
          })
        },
        showdo(){
          this.show1=true;
          this.show2=false
        },
        showdo2(){
          this.show2=true;
          this.show3=false
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
          return date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        }
      },
      created() {
          this.getdata()
      }
    }
</script>

<style scoped>

</style>
