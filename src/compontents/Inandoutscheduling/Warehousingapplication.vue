<template>
    <div id="Warehousingapplication">
          <h1>入库申请登记</h1>
      <el-row>
        <el-button type="success" round @click="addcp">添加</el-button>
        <el-button type="info" round @click="ylcp">预览</el-button>
      </el-row>
      <br/>
      <!--入库申请-->
      <el-row>
        <el-col :span="18" :offset="4">
          <el-form :model="Gather" ref="Gather" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="10">
                <el-form-item label="入库人：" prop="storer">
                  <el-input v-model="Gather.storer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="入库理由：" prop="reason" >
                  <el-select v-model="Gather.reason" placeholder="请选择">
                    <el-option label="生产入库" value="生产入库"></el-option>
                    <el-option label="库存初始" value="库存初始"></el-option>
                    <el-option label="赠送" value="赠送"></el-option>
                    <el-option label="内部归还" value="内部归还"></el-option>
                    <el-option label="其他归还" value="其他归还"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="10">
                  <el-form-item label="总件数：" prop="amountSum">
                    <el-input v-model="Gather.amountSum"></el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="4">
                  <el-form-item label="总金额：" prop="costPriceSum">
                    <el-input v-model="Gather.costPriceSum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="登记人：" prop="register">
                    <el-input v-model="Gather.register"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="4">
                  <el-form-item label="登记时间：">
                    <span>{{Gather.registerTime}}</span>
                  </el-form-item>
                </el-col>

            </el-row>
          </el-form>
        </el-col>
      </el-row>

      <!--产品查询-->
        <el-form :inline="true" label-width="80px" :modal="cpdata" class="wuliaod">
          <el-table class="cptab" :data="cpdata" stripe>
            <el-table-column  type="selection">
              <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.checked">
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
            <el-table-column prop="productId" label="产品编号" width="180"></el-table-column>
            <el-table-column prop="productDescribe" label="描述" width="180"></el-table-column>
            <el-table-column  label="数量" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.amount" @input="aa(scope.row.id)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
            <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
          </el-table>
        </el-form>
      <!-- 制定产品添加模态框-->
      <el-dialog title="产品添加" :visible="cpbtnsaveshow">
        <el-button type="warning" @click="shejiopeneditwinfan" size="small">返回</el-button>
        <el-form :inline="true" label-width="80px">
          <el-table class="wuliaotab" :data="cpsaveform" stripe>
            <el-table-column prop="productId" label="产品编号" width="100"></el-table-column>
            <el-table-column prop="productName" label="产品名称" width="100"></el-table-column>
            <el-table-column prop="type" label="用途类型" width="100"></el-table-column>
            <el-table-column prop="productDescribe" label="产品描述" width="100"></el-table-column>
            <el-table-column prop="amountUnit" label="单位" width="100"></el-table-column>
            <el-table-column prop="costPrice" label="计划成本单价" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="warning" size="small" @click="cptianjia(scope.$index,scope.row.id)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-dialog>
      <!-- 制定产品预览模态框-->
      <el-dialog title="产品预览" :visible="cpshow">
        <el-button type="primary" round @click="tijiaocp">提交</el-button>
        <el-button type="primary" round @click="yulanfan">返回</el-button>

        <el-form :inline="true" label-width="80px":modal="Gather">
          <el-row>
            <el-col :span="12"> 入库人: {{Gather.storer}}</el-col>
            <el-col :span="12"> 入库理由：{{Gather.reason}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12"> 总件数: {{Gather.amountSum}}</el-col>
            <el-col :span="12"> 总金额：{{Gather.costPriceSum}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记人：">
                {{Gather.register}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间">
                <span>{{Gather.registerTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-table class="cptab" :data="cpdata" stripe>
            <el-table-column  type="selection">
              <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.checked">
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
            <el-table-column prop="productId" label="产品编号" width="180"></el-table-column>
            <el-table-column prop="productDescribe" label="描述" width="180"></el-table-column>
            <el-table-column  label="数量" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.amount" @input="aa(scope.row.id)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
            <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
          </el-table>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Warehousingapplication",
      data(){
          return{
            Gather:{
              storer:'',
              reason:'',
              amountSum:'',
              costPriceSum:'',
              register:'',
              registerTime:'',
            },
            cpdata:[],
            cpbtnsaveshow:false,
            cpsaveform:[],
            cpshow:false,
            cpzuc:{},
            cpyldata:[]
          }
      },
      methods:{
        currentTime(){
          setInterval(this.formatDate, 500);
        },
        formatDate() {
          let date = new Date();
          let year = date.getFullYear(); // 年
          let month = date.getMonth() + 1; // 月
          let day = date.getDate(); // 日
          //let week = date.getDay(); // 星期
          //let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
          let hour = date.getHours(); // 时
          hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
          let minute = date.getMinutes(); // 分
          minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
          let second = date.getSeconds(); // 秒
          second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
          this.Gather.registerTime =`${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },
        addcp(){
          var _this = this;
          this.cpbtnsaveshow = true;
          this.$axios.post("dfile/cpapproved.action").then(function (response) {
            _this.cpsaveform = response.data.records;
          }).catch();
        },
        ylcp(){
          var _this = this;
          var hh=0;
          var ss=0;
          this.cpdata.forEach((item)=>{
            hh+=parseInt(item.amount);
            ss=ss+ item.subtotal;
          })
          this.Gather.amountSum=hh;
          this.Gather.costPriceSum=ss;

          var yu= this.cpdata.length;
          if(yu>0){
            this.cpbtnsaveshow = false;
            _this.cpshow=true;
          }else {
            alert("产品不能为空，请添加产品！！！");
            this.cpbtnsaveshow = true;
            this.$axios.post("dfile/cpapproved.action").then(function (response) {
              _this.cpsaveform=response.data.records;
            }).catch()
          }
        },
        tijiaocp(){

        },
        yulanfan(){
          this.cpshow=false;
        },
        //退出产品添加页面返回产品添加
        shejiopeneditwinfan(){
          this.cpbtnsaveshow=false;
        },
        cptianjia(index,ids){
          if (this.cpdata.length>0){
            var a=this.cpdata.find(item =>{
              return item.id==ids
            })
            if (a==null){
              this.cpdata.push(this.cpsaveform[index]);

            }
          }else {
            this.cpdata.push(this.cpsaveform[index]);
          }
        },
        aa(ids){
          var row = this.cpdata.find((item)=>{return item.id == ids;});
          if (Number(row.amount)!=NaN && Number(row.costPrice) ){
            row.subtotal = Number(row.amount) * Number(row.costPrice);
          }
        }
      },
    mounted() {
      this.currentTime();
    },
    // 销毁定时器
    beforeDestroy() {
      if (this.formatDate) {
        clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
      }
    }
    }
</script>

<style scoped>

</style>
