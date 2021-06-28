<template>
  <div id="Processmaterialtoexamine">
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
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-button type="success" size="mini"
                     @click="toexamine(scope.$index,scope.row.id)">审核</el-button>
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
      <div style="padding-left: 900px">
        <el-radio v-model="radio" label="1">不通过</el-radio>
        <el-radio v-model="radio" label="2">通过</el-radio>
        <el-button type="primary" @click="toexamineok">确认</el-button>
        <el-button type="info" @click="formulate=false">返回</el-button>
      </div>
      <h1>工序物料设计单</h1>
      <el-form :inline="true" :model="process" class="demo-form-inline">
        <el-form-item label="工序单编号：">
          <span>{{process.designId}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 500px" label="设计人：">
<!--          <el-input style="width: 300px" clearable v-model="process.designer1"></el-input>-->
          <span>{{process.designer1}}</span>
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
          prop="moduleSubtotal"
          label="物料成本小计"
          width="190">
        </el-table-column>
        <el-table-column label="设计">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"
                       @click="getprocesslist(scope.$index,scope.row.id)">审核</el-button>
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
          <span>
            {{process.procedureDescribe}}
          </span>
        </el-form-item><br>
        <el-form-item label="审核人：">
                    <el-input clearable v-model="process.changer"></el-input>
<!--          <span>{{process.changer}}</span>-->
        </el-form-item>
        <el-form-item style="padding-left: 400px" label="审核时间：">
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
          <el-input   v-model="process.checkSuggestion" style="width: 1000px" type="textarea"></el-input>
        </el-form-item><br>

      </el-form>
    </el-dialog>

    <el-dialog
      title="工序物料设计单"
      :visible.sync="formulateprocess"
      width="65%"
      :before-close="handleClose">
      <h1>工序物料设计单</h1>

      <div style="padding-left: 900px">
        <el-button type="info" @click="formulateprocess=false">返回</el-button>
      </div>

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
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Processmaterialtoexamine",
      data(){
          return  {
            processlist:[],
            pageno:1,
            pagesize:5,
            total:0,
            prolist:[],
            process:{},
            formulate:false,
            radio:'1',
            disgprocess:[],
            disppdd:{},
            formulateprocess:false
        }
      },
      methods:{
        getdata(){
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);

          this.$axios.post("gx/selrocesslistok",params).then(response =>{
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
            this.getdate()
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        toexamineok(){
          var params = new URLSearchParams();
          Object.keys(this.process).forEach(item =>{
            if (this.process[item]!=null){
              params.append(item,this.process[item])
            }
          })
          params.append("radio",this.radio);

          this.$axios.post("gx/processtoexamineok",params).then(response =>{
            if (response.data){
              this.getdata();
              this.formulate=false;
              this.$message({
                showClose: true,
                message: '审核通过',
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: '审核出现问题',
                type: 'warning'
              });
            }
          }).catch(e => this.$message.error('出现问题了，请联系开发人员！'))
        },
        getprocesslist(index,ids){
          this.disppdd=this.prolist[index]

          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/getprocesslist",params).then(response =>{
            this.disgprocess= response.data;
            this.formulateprocess=true;
            this.getdate()
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
          this.process.changeTime =date1;
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
