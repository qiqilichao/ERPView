<template>
  <div>
    <div>
      <h2>制定生产派工</h2>
      <span>
          当前等待审核的计划生产明细总数：{{total}}例
      </span>
    </div>
    <el-row :gutter="20">
      <el-col :span="15" :offset="5">
        <div>

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="产品名">
              <el-input v-model="formInline.productName" placeholder="产品名"></el-input>
            </el-form-item>
            <el-form-item label="产品编号">
              <el-input v-model="formInline.productId" placeholder="产品编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="queryApply">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showforuse">生成派工单</el-button>
            </el-form-item>
          </el-form>


        </div>
      </el-col>
    </el-row>



   <el-table :data="formulateArr">
      <el-table-column label="点选" width="90">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
    <el-table-column
      prop="applyId"
      label="生产计划编号">
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
      prop=""
      label="描述">
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
      prop="checkTime"
      label="审核时间">

    </el-table-column>
  </el-table>



    <!--生产派工单模态框-->
    <el-dialog  :visible.sync="dialogTableVisible" width="1000px">

      <el-row :gutter="24">
        <el-col :span="8" :offset="18">
          <div>
            <el-button @click="preview">预览</el-button>
            <el-button >返回</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="formulate" class="demo-form-inline">

        <el-form-item >
          <el-input placeholder="请输入内容"  style="width: 450px"  v-model="workorder">
            <template slot="prepend">工单制定人</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px" >
            <template slot="prepend">出库单号集合</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="register">
            <template slot="prepend">登记人</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" :value="currentdatetiem">
            <template slot="prepend">登记时间</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="formulate.productId">
            <template slot="prepend">产品编号</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="formulate.productName">
            <template slot="prepend">产品名称</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" >
            <template slot="prepend">描述</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="num">
            <template slot="prepend">数量</template>
          </el-input>
        </el-form-item>


        <el-form-item label="备注" v-model="formulate.remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder=""
            style="width: 900px;"
          >
          </el-input>
        </el-form-item>



      </el-form>

    </el-dialog>

    <!--预览模态框-->
    <el-dialog title="生产派工单" :visible.sync="dVisible" width="1600px">

      <el-row :gutter="24">
        <el-col :span="8" :offset="18">
          <div>
            <el-button @click="addManufacture">提交</el-button>
            <el-button >返回</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="formulate" class="demo-form-inline">

        <el-form-item >
          <el-input placeholder="请输入内容"  style="width: 450px"  v-model="workorder" >
            <template slot="prepend">工单制定人</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input  style="width: 450px" >
            <template slot="prepend">出库单号集合</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="formulate.productId">
            <template slot="prepend">产品编号</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="formulate.productName">
            <template slot="prepend">产品名称</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" >
            <template slot="prepend">描述</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 450px" v-model="num">
            <template slot="prepend">数量</template>
          </el-input>
        </el-form-item>

        <!--物料表数据-->
        <el-table :data="manufactureData">
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
            prop="costPrice"
            label="单位工时成本（￥）">
          </el-table-column>

          <el-table-column
            prop="subtotal"
            label="工时成本小计（￥）">
          </el-table-column>


          <el-table-column
            label="查看物料">
            <template slot-scope="scope">
                 <el-button @click="showmaterial(scope.row)">查看物料</el-button>
            </template>

          </el-table-column>

        </el-table>



        <el-form-item >
          <el-input  style="width: 750px" v-model="register">
            <template slot="prepend">登记人</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input  style="width: 750px" :value="currentdatetiem">
            <template slot="prepend">登记时间</template>
          </el-input>
        </el-form-item>

        <el-form-item label="备注" v-model="formulate.remark">
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
    <el-dialog title="物料详情" :visible.sync="material" width="1000px">
      <el-form :inline="true" :model="formulate" class="demo-form-inline">

        <el-form-item >
          <el-input placeholder="请输入内容"  style="width: 450px" :value="designsheet" >
            <template slot="prepend">设计单编号</template>
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
        name: "Formulate",
       data(){
          return{
            total:0,
            dialogTableVisible:false,
            dVisible:false,
            material:false,
            workorder:"",
            register:"",
            currentdatetiem:"",
            //设计单编号
            designsheet:"",
           //工序名
            workingprocedurename:"",
            //物料详情
            materialData:[],
            formulateArr:[],
            manufactureData:[],
            formulate:{

            },
            num:0,
            //工时
            gongshi:0,
            //物料
            wuliao:0,
            formInline:{
              productId:"",
              productName:"",
            },
          }
       },
       methods:{
            getformulateData(){
              var params=new URLSearchParams()
              //循环获取json对象中的key和value
              // Object.keys(this.editform)   获取当前json对象的key的数组
              //{id:1,name:"张三"}    ["id","name"]
              Object.keys(this.formInline).forEach((item)=> {
                params.append(item,this.formInline[item]);
              })

              this.$axios.post("apply/formulateList",params).then((response)=>{
                    this.formulateArr=response.data;
                    this.total=response.data.length;
               }).catch()
            },
            //查询
            queryApply(){
               this.getformulateData();
            },
           //打开模态框
           showforuse(){
                var arr= this.formulateArr.filter((item)=>{return item.checked==true;})
                  if(arr.length==0){
                    this.$message({
                      showClose: true,
                      message: '您没有选中派单',
                      type: 'error'
                    });
                    return;
                  }
                   var index=0;
                   this.num=0;
                  this.getDate();
                    //是否是批量派单
                    if(arr.length>1){
                        //循环判断所有选中的产品编号是否相同
                        for(var i=0;i<arr.length;i++){
                            if(arr[0].productId==arr[i].productId){
                               index++;
                            }else{
                               index--;
                            }
                        }
                    }

                    if(index==arr.length){
                       arr.forEach((item)=>{this.num+= item.amount})
                       this.formulate=arr[0];
                       this.dialogTableVisible=true;
                    }else if(index==0){
                       arr.forEach((item)=>{this.num+= item.amount})
                       this.formulate=arr[0];
                       this.dialogTableVisible=true;
                    }else{
                      this.$message({
                        showClose: true,
                        message: '选择多个产品是产品编号必须一致',
                        type: 'error'
                      });
                      return;
                    }
           },

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
           this.currentdatetiem = date1;
         },
         getStr(point) {
           return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
         },

         //预览后的模态框
         showPreview(){
             this.dVisible=true;
             var params=new URLSearchParams()
             //console.log(this.formulate.productId)
             params.append("productId",this.formulate.productId)
             this.$axios.post("dpd/queryBypid",params).then((response)=>{
                   this.manufactureData=response.data;
                   this.manufactureData.forEach((item)=>{
                   this.gongshi+=item.labourHourAmount;
                 })
             }).catch()
         },

        //查询当前产品有没有完成工序物料设计是否完成
         preview(){
                var params=new URLSearchParams()
                    //console.log(this.formulate.productId)
                    params.append("productId",this.formulate.productId)
               this.$axios.post("dfile/quertyBypid",params).then((response)=>{
                         if(response.data==true){
                            this.showPreview()
                         }else{
                           this.$message({
                             showClose: true,
                             message: '当前产品没有完成物料或工序物料设计',
                             type: 'error'
                           });
                         }
               }).catch()
         },
         //添加生产总表
         addManufacture(){

           var arr= this.formulateArr.filter((item)=>{return item.checked==true;})
            var applyIdGroup="";
                  arr.forEach((item)=>{
                      applyIdGroup+="|"+item.applyId+"|  "
                  })
           var params= new URLSearchParams();
           params.append("productId",this.formulate.productId);
           params.append("productName",this.formulate.productName);
           params.append("register",this.register);
           params.append("amount",this.num);
           params.append("registerTime",this.currentdatetiem);
           params.append("designer",this.workorder);
           params.append("applyIdGroup",applyIdGroup);
            // params.append("designProcedureDetailsList",JSON.stringify(this.manufactureData));
           //console.log(applyIdGroup)
           this.$axios.post("manufacture/savemanufacture",params).then((response)=>{
                if(response.data){
                  this.dialogTableVisible=false;
                  this.dVisible=false;
                  this.getformulateData();
                }
           }).catch()

         },

         //物料详情
         showmaterial(obj){
              this.material=true;
              this.workingprocedurename=obj.procedureName;
              this.designsheet=obj.designId;
              var params=new URLSearchParams();
                  params.append("id",obj.id);
              this.$axios.post("dpm/queryByidList",params).then((response)=>{
               this.materialData=response.data;
              }).catch()
         }

       },
      created() {
          this.getformulateData()
      }

    }
</script>

<style scoped>

</style>
