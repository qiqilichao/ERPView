<template>
       <div>



         <el-table :data="dispatchArr">
           <el-table-column
             prop="manufactureId"
             label="生产派工">
           </el-table-column>
           <el-table-column
             prop="productId"
             label="产品编号">
           </el-table-column>
           <el-table-column
             prop="productName"
             label="产品名称">
           </el-table-column>

           <el-table-column
             prop="amount"
             label="数量">
           </el-table-column>

           <el-table-column
             prop=""
             label="出库单号集合">
           </el-table-column>

           <el-table-column
             prop="registerTime"
             label="登记时间">
           </el-table-column>

           <el-table-column
             label="审核">
             <template slot-scope="scope">
                    <el-button @click="clickShowWorking(scope.row.id)">审核</el-button>
             </template>

           </el-table-column>
         </el-table>



         <!--预览模态框-->
         <el-dialog title="生产派工单" :visible.sync="dDispat" width="1500px">

           <div>
             <el-row :gutter="24">
               <el-col :span="8" :offset="18">
                 <div>
                   <template>
                     <el-radio v-model="radio" label="S001-2">未通过</el-radio>
                     <el-radio v-model="radio" label="S001-1">通过</el-radio>
                   </template>
                   <el-button @click="Submitforreview">提交</el-button>
                   <el-button @click="outdDispat">返回</el-button>
                 </div>
               </el-col>
             </el-row>
           </div>

           <el-form :inline="true" :model="formDispat" class="demo-form-inline">

             <el-form-item >
               <el-input placeholder="请输入内容"  style="width: 650px"  :value="formDispat.manufactureId"  >
                 <template slot="prepend">派工单编号</template>
               </el-input>
             </el-form-item>
             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.productId">
                 <template slot="prepend">产品单编号</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.amount">
                 <template slot="prepend">数量</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.productName">
                 <template slot="prepend">产品名称</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.designer">
                 <template slot="prepend">工单制订人</template>
               </el-input>
             </el-form-item>

             <!--物料表数据-->
             <el-table :data="designproceduredetailsArr">
               <el-table-column
                 prop="id"
                 label="序号">
               </el-table-column>
               <el-table-column
                 prop="procedureName"
                 label="工序名称">
               </el-table-column>
               <el-table-column
                 prop="procedureId"
                 label="工序编号">
               </el-table-column>

               <el-table-column
                 prop="procedureDescribe"
                 label="描述">
               </el-table-column>
               <el-table-column
                 prop="labourHourAmount"
                 label="工时数（小时）">
               </el-table-column>
               <el-table-column
                 prop="subtotal"
                 label="工时成本小计（￥）">
               </el-table-column>

               <el-table-column
                 prop="moduleSubtotal"
                 label="物料成本小计（￥）">
               </el-table-column>

               <el-table-column
                 label="审核物料">
                 <template slot-scope="scope">
                   <el-button @click="showmaterial(scope.row)">审核物料</el-button>
                 </template>

               </el-table-column>

             </el-table>


             <el-form-item  >
               <el-input  style="width: 650px" v-model="formDispat.moduleCostPriceSum">
                 <template slot="prepend">工时总成本</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.labourCostPriceSum">
                 <template slot="prepend">物料总成本</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.register">
                 <template slot="prepend">登记人</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" v-model="formDispat.registerTime">
                 <template slot="prepend">登记时间</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px"  v-model="checker">
                 <template slot="prepend">审核人</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" :value="checkTime">
                 <template slot="prepend">审核时间</template>
               </el-input>
             </el-form-item>

             <el-form-item >
               <el-input  style="width: 650px" >
                 <template slot="prepend">描述</template>
               </el-input>
             </el-form-item>

             <el-form-item label="备注" >
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 4, maxRows: 25}"
                 placeholder=""
                 style="width: 900px;"
               >
               </el-input>
             </el-form-item>
           </el-form>
         </el-dialog>



         <!--物料详情态框-->
         <el-dialog title="物料详情" :visible.sync="materiala" width="1000px">
           <el-form :inline="true"  class="demo-form-inline">

             <el-form-item >
               <el-input placeholder="请输入内容"  style="width: 450px" :value="designsheet" >
                 <template slot="prepend">派工单编号</template>
               </el-input>
             </el-form-item>
             <el-form-item >
               <el-input  style="width: 450px"  :value="workingprocedurename">
                 <template slot="prepend">工序名称编号</template>
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
                 label="物料名称">
               </el-table-column>
               <el-table-column
                 prop="productId"
                 label="物料编号">
               </el-table-column>

               <el-table-column
                 prop="productDescribe"
                 label="描述">
               </el-table-column>
               <el-table-column
                 prop="amount"
                 label="本工序数">
               </el-table-column>
               <el-table-column
                 prop="amountUnit"
                 label="单位">
               </el-table-column>

               <el-table-column
                 prop="costPrice"
                 label="单价">
               </el-table-column>

               <el-table-column
                 prop="subtotal"
                 label="小计（￥）">
               </el-table-column>

             </el-table>

           </el-form>

         </el-dialog>


       </div>
</template>

<script>
    export default {
        name: "Dispatchaudit",
        data(){
           return{
             pageno:1,
             pagesize:10,
             radio:"S001-2",
             dDispat:false,
             materiala:false,
             designsheet:"",
             checker:"",
             checkTime:"",
             workingprocedurename:"",
             dispatchArr:[],
             designproceduredetailsArr:[],
             materialData:[],
             formDispat:{

             },
           }
        },
       methods: {

         //当前时间获取方法
         getDate(){
           let date = new Date();
           let Y = date.getFullYear();
           let M = this.getStr(date.getMonth() + 1);
           let D = this.getStr(date.getDate());
           let hours = date.getHours();
           let minutes = this.getStr(date.getMinutes());
           let seconds = this.getStr(date.getSeconds());
           var date1 =Y + "/" + M + "/" + D + " " + hours + ":" + minutes + ":" + seconds;
           this.checkTime = date1;
         },
         getStr(point) {
           return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
         },

         //获取审核表
         getDispatchArr() {
           var params = new URLSearchParams();
           params.append("pageno", this.pageno);
           params.append("pagesize", this.pagesize);
           this.$axios.post("manufacture/pageManufacture", params).then((response) => {
             this.dispatchArr = response.data.records;
           }).catch()
         },
         //点击单开模态框
         clickShowWorking(id) {
           this.dDispat = true;

           this.formDispat = this.dispatchArr.find((item) => {
             return item.id == id
           })
           this.getDate();
           var params = new URLSearchParams();
           params.append("pid", this.formDispat.productId)
           this.$axios.post("manufacture/details", params).then((response) => {
             this.designproceduredetailsArr = response.data
           }).catch()

         },
         //物料详情
         showmaterial(obj) {
           this.materiala = true;
           this.workingprocedurename = obj.procedureName;
           this.designsheet = this.formDispat.manufactureId;
           var params = new URLSearchParams();
           params.append("id",obj.id);
           params.append("procedureName",obj.procedureName)

           this.$axios.post("dpm/queryByidandname",params).then((response) => {
             this.materialData = response.data;
           }).catch()
         },
         //确认审核
         Submitforreview(){
           var params=new URLSearchParams()
           params.append("checkTag",this.radio);
           params.append("checker",this.checker);
           params.append("id",this.formDispat.id);
           params.append("productId",this.formDispat.productId);
           params.append("productName",this.formDispat.productName);
           //params.append("amount",this.)
           params.append("manufactureId",this.formDispat.manufactureId);
           this.$axios.post("manufacture/SubmitforReview",params).then((response)=>{
               if(response.data){
                  this.dDispat=false;
                   this.materiala=false;
                    this.getDispatchArr();
                 this.$message({
                   showClose: true,
                   message: '审核成功',
                   type: 'success'
                 });
               }else{
                 this.$message({
                   showClose: true,
                   message: '审核失败',
                   type: 'success'
                 });
               }
           }).catch()
         },
         //退出模态框
         outdDispat(){
           this.dDispat=false;
          }
       },
         created() {
          this.getDispatchArr();
      }
    }
</script>

<style scoped>

</style>
