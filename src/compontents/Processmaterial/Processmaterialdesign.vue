<template>
  <div id="Processmaterialdesign">


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
        <el-table-column label="制定">
          <template slot-scope="scope">
            <el-button type="success" size="mini"
                       @click="toexamine(scope.$index,scope.row.id)">制定</el-button>
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
        <el-button type="success" @click="processSubmit">提交</el-button>
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
        <el-table-column label="设计">
          <template slot-scope="scope">
            <el-button v-if="scope.row.designModuleTag=='D002-0'" type="danger" size="mini"
                       @click="getprocesslist(scope.row.id)">设计</el-button>
            <el-button v-else-if="scope.row.designModuleTag=='D002-1'" type="danger" size="mini"
                       @click="newgetprocesslist(scope.row.id)">重新设计</el-button>
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
          <el-input   v-model="process.procedureDescribe" style="width: 1000px" type="textarea"></el-input>
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
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog
      title="工序物料设计单"
      :visible.sync="formulateprocess"
      width="65%"
      :before-close="handleClose">
      <h1>工序物料设计单</h1>
      <span>制造：{{process.productName}}产品，供选择的物料清单如下：</span>

      <div v-show="show1">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="showUp">预览</el-button>
          <el-button type="info" @click="formulateprocess=false">返回</el-button>
        </div>
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
      <div v-show="show2">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="goinspro">提交</el-button>
          <el-button type="info" @click="showdwon">返回</el-button>
        </div>
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
              <span>{{scope.row.amount1}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog
      title="工序物料设计单"
      :visible.sync="newformulateprocess"
      width="65%"
      :before-close="handleClose">
      <h1>工序物料设计单</h1>
      <span>制造：{{process.productName}}产品，供选择的物料清单如下：</span>

      <div v-show="newshow1">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="newshowUp">预览</el-button>
          <el-button type="info" @click="newformulateprocess=false">返回</el-button>
        </div>
        <el-table :data="newdisgprocess"  border style="width: 100%">
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
      <div v-show="newshow2">
        <div style="padding-left: 900px">
          <el-button  type="primary" @click="newgoinspro">提交</el-button>
          <el-button type="info" @click="newshowdwon">返回</el-button>
        </div>
        <el-table :data="newdisgprocess"  border style="width: 100%">
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
              <span>{{scope.row.amount1}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Processmaterialdesign",
      data(){
          return {
            //要进行物料设计的数据
            processlist:[],
            pageno:1,
            pagesize:5,
            total:0,
            //制定对话框(设计)
            formulate:false,
            //制定对话框(新设计)
            // newformulate:false,
            // //该数据的所有工序（设计）
            prolist:[],
            // //该数据的所有工序（新设计）
            // newprolist:[],
            //选中指定的数据（设计）
            process:{},
            // //选中指定的数据（新设计）
            // newprocess:{},
            //获取的物料（设计）
            disgprocess:[],
            //获取的物料（新设计）
            newdisgprocess:[],
            //  物料弹出框（设计）
            formulateprocess:false,
            //  物料弹出框（新设计）
            newformulateprocess:false,
            //（设计）
            show1:true,
            show2:false,
            //（新设计）
            newshow1:true,
            newshow2:false
          }
      },
      methods:{
        getdata(){
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);

          this.$axios.post("gx/selrocesslist",params).then(response =>{
            this.processlist=response.data.records;
            this.total=response.data.total
          }).catch((e =>{
            this.$message.error('出现问题了，请联系开发人员！')
          }))
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
        //设计
        getprocesslist(ids){
          var params = new URLSearchParams();
          params.append("proid",this.process.productId);
          this.$axios.post("gx/selprocessById",params).then(response =>{
            this.disgprocess=response.data
            if (this.disgprocess.length!=0){
              this.disgprocess.forEach(item =>{
                item.parintid=ids;
              })
              this.formulateprocess=true
            }else{
              this.$message({
                showClose: true,
                message: '尚未进行产品物料组成，请先去设计！！',
                type: 'warning'
              });
            }
          }).catch(e => alert("出问题了"))
        },
        //重新设计
        newgetprocesslist(ids){
          var params = new URLSearchParams();
          params.append("proid",ids);
          this.$axios.post("gx/selnewprocessById",params).then(response =>{
            this.newdisgprocess=response.data
            if (this.newdisgprocess.length!=0){
              this.newdisgprocess.forEach(item =>{
                item.parintid=ids;
              })
              this.newformulateprocess=true
            }else{
              this.$message({
                showClose: true,
                message: '尚未进行产品物料组成，请先去设计！！',
                type: 'warning'
              });
            }
          }).catch(e => alert("出问题了"))
        },
        //提交（设计）
        goinspro(){
          this.disgprocess.forEach(item =>{
            item.subtotal1=item.amount1 * item.costPrice
            // item.residualAmount=Number(item.amount)-Number(item.amount1);
          })
          this.$axios.post("gx/insprocess",JSON.stringify(this.disgprocess),{headers:{"Content-Type":"application/json"}}).then(response =>{
            if (response.data){
              this.$message({
                showClose: true,
                message: '设计成功',
                type: 'success'
              });
              this.showdwon();
              this.getfourprocess(this.process.id);
              this.formulateprocess=false;
            }else{
              this.$message({
                showClose: true,
                message: '设计失败',
                type: 'warning'
              });
            }
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        //提交（新设计）
        newgoinspro(){
          this.newdisgprocess.forEach(item =>{
            item.subtotal1=item.amount1 * item.costPrice
          })
          this.$axios.post("gx/insprocess",JSON.stringify(this.newdisgprocess),{headers:{"Content-Type":"application/json"}}).then(response =>{
            if (response.data){
              this.$message({
                showClose: true,
                message: '设计成功',
                type: 'success'
              });
              this.newshowdwon();
              this.getfourprocess(this.process.id);
              this.newformulateprocess=false;
            }else{
              this.$message({
                showClose: true,
                message: '设计失败',
                type: 'warning'
              });
            }
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        //设计物料成功之后刷新工序表格
        getfourprocess(ids){
          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/seldisproById",params).then(response =>{
            this.prolist= response.data;
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        //提交
        processSubmit(){
          var params = new URLSearchParams();
          // Object.keys(this.process).forEach(item =>{
          //   params.append(item,this.process[item])
          // })
          params.append("id",this.process.id)
          this.$axios.post("gx/processSubmit",params).then(response =>{
            if (response.data) {
              this.$message({
                showClose: true,
                message: '设计成功，请去审核',
                type: 'success'
              });
              this.formulate=false;
              this.getdata()
            }else {
              this.$message.error('提交失败')
            }
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
        //预览
        showUp() {
          this.show1 = false;
          this.show2 = true;
        },
        //返回
        showdwon() {
          this.show1 = true;
          this.show2 = false
        },
        //预览
        newshowUp() {
          this.newshow1 = false;
          this.newshow2 = true;
        },
        //返回
        newshowdwon() {
          this.newshow1 = true;
          this.newshow2 = false
        },
      },
      created() {
        this.getdata()
      }
    }
</script>

<style scoped>

</style>
