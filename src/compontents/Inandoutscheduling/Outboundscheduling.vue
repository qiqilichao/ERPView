<template>
  <div id="Outboundscheduling">
    <span>当前等待做调度的出库单总数：{{total}}列</span>
    <el-table :data="paydata"  border style="width: 100%">
      <el-table-column
        prop="payId"
        label="出库单编号">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="出库理由">
          <template slot-scope="scope">
               {{scope.row.reason  | replace}}
          </template>
      </el-table-column>
      <el-table-column
        prop="reasonexact"
        label="出库详情理由">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="登记时间">
      </el-table-column>
      <el-table-column
        prop="amountSum"
        label="总件数">
      </el-table-column>
      <el-table-column
        prop="costPriceSum"
        label="总金额（元）">
      </el-table-column>
      <el-table-column label="出库调度">
        <template slot-scope="scope">
          <el-button size="mini" @click="showdispatchAndDispatch(scope.row.id)">出库调度</el-button>
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




    <!--物料详情态框-->
    <el-dialog title="物料详情" :visible.sync="dispatchAndDispatch" width="1300px">
      <el-form :inline="true" :model="frompaydetails" class="demo-form-inline">

        <el-form-item >
          <el-input placeholder="请输入内容"  style="width: 450px"  :value="frompaydetails.payId" >
            <template slot="prepend">出库单编号：</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="frompaydetails.reason | replace">
            <template slot="prepend">出库理由：</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="frompaydetails.reasonexact">
            <template slot="prepend">出库详情理由：</template>
          </el-input>
        </el-form-item>
        <!--物料表数据-->
        <el-table :data="materialData">
          <el-table-column
            prop="id"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="产品编号">
          </el-table-column>

          <el-table-column
            prop="amount"
            label="应出库数">
          </el-table-column>
          <el-table-column
            prop="paidAmount"
            label="已出库数">
          </el-table-column>
          <el-table-column
            prop="amountUnit"
            label="存储地址集合">
          </el-table-column>


          <el-table-column
            label="调度">

            <template slot-scope="scope">
              <el-button v-if="scope.row.amount>0" @click="dispatch(scope.row)">调度</el-button>

              <span v-else-if="scope.row.amount==0">已完成</span>

              <span v-else-if="scope.row.amount==scope.row.paidAmount">已完成</span>


            </template>
          </el-table-column>
        </el-table>
        <el-form-item >
          <el-input  style="width: 450px"  :value="frompaydetails.amountSum">
            <template slot="prepend">应出库总件数</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="frompaydetails.paidAmountSum">
            <template slot="prepend">已出库总件数</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--出库调度单-->
    <el-dialog title="出库调度单" :visible.sync="Outboundscheduling" width="1200px">
      <el-row :gutter="24">
        <el-col :span="10" :offset="14">
          <div>
            <el-button @click="InventorySubmission">确定</el-button>
            <el-button >取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="outboundfrom" class="demo-form-inline">

        <el-form-item >
          <el-input placeholder="请输入内容"  style="width: 450px" :value="OutboundId"   >
            <template slot="prepend">出库单编号：</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="outboundfrom.productId">
            <template slot="prepend">产品编号：</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="outboundfrom.productName">
            <template slot="prepend">产品名称：</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px"  :value="outboundfrom.costPrice" >
            <template slot="prepend">成品单价：</template>
          </el-input>
        </el-form-item>

        <!--物料表数据-->
        <el-table :data="OutboundArry">
          <el-table-column
            prop="id"
            label="序号">
          </el-table-column>
          <el-table-column
            prop=""
            label="库房名称">
            <template slot-scope="scope">
               成品仓库
            </template>
          </el-table-column>
          <el-table-column
            prop="str"
            label="存储都地址">
          </el-table-column>
          <el-table-column
            prop=""
            label="存储地址名称">
           <template slot-scope="scope">
              {{scope.row.firstKindName+"-"+scope.row.secondKindName+"-"+scope.row.thirdKindName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="storageUnitAbbreviation"
            label="存储单元简称">

          </el-table-column>

          <el-table-column
            prop="amount"
            label="当前库存数量">
          </el-table-column>


          <el-table-column
            prop="confirm"
            label="本次出库数量">
            <template slot-scope="scope">
               <el-input  type="text" v-model="scope.row.confirm"  @input="filtervalue(scope.row.confirm)"></el-input>
            </template>
          </el-table-column>


        </el-table>

        <el-form-item >
          <el-input  style="width: 450px"  :value="num1">
            <template slot="prepend">应出库总件数</template>
          </el-input>
        </el-form-item>


        <el-form-item >
          <el-input  style="width: 450px"  :value="num2">
            <template slot="prepend">已出库总件数</template>
          </el-input>
        </el-form-item>

          <el-form-item >
            <el-input  style="width: 450px"  v-model="register" >
              <template slot="prepend">登记人</template>
            </el-input>
          </el-form-item>


          <el-form-item >
            <el-input  style="width: 450px"  :value="shijian">
              <template slot="prepend">登记时间</template>
            </el-input>
        </el-form-item>

      </el-form>



    </el-dialog>


  </div>
</template>

<script>
    export default {
        name: "Outboundscheduling",
      data(){
          return {
            pageno: 1,
            pagesize: 5,
            total:0,
            dispatchAndDispatch:false,
            Outboundscheduling:false,
            paydata:[],
            OutboundArry:[],
            shijian:"",
            OutboundId:"",
            register:"",
            num1:0,
            num2:0,
            materialData:[],
            frompaydetails:{

            },
            outboundfrom:{

            },

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
          this.shijian = date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },

        //打开出库调度单
        showdispatchAndDispatch(id){
          this.dispatchAndDispatch=true;
          var params=new URLSearchParams()
          params.append("id",id);
          this.$axios.post("paydetails/queryBypidList",params).then((response)=>{
            this.materialData=response.data;
            this.frompaydetails=this.paydata.find((item)=>{return item.id==id});
           // console.log(this.frompaydetails)
          }).catch()
        },

        //调度
        dispatch(obj){
             var params=new URLSearchParams();
             params.append("productId",obj.productId);
             this.$axios.post("pay/queryBydfilepid",params).then((response)=>{
                   if(response.data){
                     this.Outboundscheduling=true;
                     this.outboundfrom=obj;
                     this.OutboundId=this.frompaydetails.payId;
                     this.num1=obj.amount;
                     this.num2=obj.paidAmount;
                     this.getDate();
                     this.getOutboundArry(obj.productId);
                   }else{
                     this.$message({
                       showClose: true,
                       message: '物料还没有配置安全库存',
                       type: 'error'
                     });
                   }
             }).catch()
        },


        //库存提交
        InventorySubmission(){
          console.log(this.OutboundArry[0])
          if(this.OutboundArry[0].confirm==null||this.OutboundArry[0]==''){
            this.$message({
              showClose: true,
              message: '出库物料不能为空',
              type: 'error'
            });
            return;
          }
          this.OutboundArry[0].payid=this.OutboundId;
          this.OutboundArry[0].mid=this.outboundfrom.productId;
          this.OutboundArry[0].register=this.register;
          this.OutboundArry[0].registerTime=this.shijian;
         /* var params=new URLSearchParams();
          params.append("scell",this.OutboundArry[0]);*/
          this.$axios.post("paydetails/inventorySubmission",JSON.stringify(this.OutboundArry),
            {headers:{"Content-Type":"application/json"}}).then((response)=>{

              if(response.data){
                this.Outboundscheduling=false;
                this.dispatchAndDispatch=false;
                this.$message({
                  showClose: true,
                  message: '提交成功',
                  type: 'success'
                });
              }

          }).catch()
        },

        //库存表信息
        getOutboundArry(id){
          var params=new URLSearchParams();
          params.append("id",id);
          this.$axios.post("paydetails/queryScaleByid",params).then((response)=>{
                   this.OutboundArry.length=0;
                   this.OutboundArry.push(response.data);
            }).catch()
        },
        //查询出库信息
        getpaydata (){
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("pay/payselect.action", params).then((response) => {
            _this.paydata = response.data.records;
            _this.total = response.data.total;
          }).catch();

        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getmenudata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getmenudata();
        },

        //input框的判断
        filtervalue(val){
              if(val<0){
                 this.OutboundArry[0].confirm=0;
              }
              if(val>this.OutboundArry[0].amount){
                this.OutboundArry[0].confirm=this.OutboundArry[0].amount;
              }
        },

      },
      created(){
        this.getpaydata();
      },
      filters: {
        replace(val) {
          if ("C002-1" == val) {
            return "生产领料"
          }
          if ("C002-2" == val) {
            return "赠送"
          }
          if ("C002-3" == val) {
            return "内部领料"
          }
          if ("C002-4" == val) {
            return "其他领料"
          }
        },
      }
  }
</script>

<style scoped>

</style>
