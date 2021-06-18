<template>

   <div>
     <!--预览前的页面-->
     <div v-show="show1">

       <h1>生产计划单</h1>
       <!--主要功能 -->
       <el-row :gutter="20">
         <el-col :span="9" :offset="15">
           <div>
             <el-button @click="showadd">添加产品</el-button>
             <el-button @click="delApply">删除产品</el-button>
             <el-button @click="preview">预览</el-button>
           </div>
         </el-col>
       </el-row>


       <div >
         <!--顶部 -->
         <div>

           <el-input placeholder="请输入内容" :value="str"  size="small">
             <template slot="prepend">生产理由:</template>
           </el-input>
           <el-input  size="small"  placeholder="请输入内容">
             <template slot="prepend">
               供货时间:
             </template>
           </el-input>
           <el-input placeholder="请输入内容" size="small" v-model="register">
             <template slot="prepend">登记人是:</template>
           </el-input>
           <el-input placeholder="请输入内容" :value="datez" size="small">
             <template slot="prepend">登记时间:</template>
           </el-input>

         </div>

          <el-table :data="applyData">
           <el-table-column label="点选" width="90">
             <template slot-scope="scope">
               <el-checkbox v-model="scope.row.checked"></el-checkbox>
             </template>
           </el-table-column>
           <el-table-column
             prop="productId"
             label="产品名称"
             width="170">
           </el-table-column>
           <el-table-column
             prop="productName"
             label="产品编号"
             width="170">
           </el-table-column>
           <el-table-column
             prop="productNick"
             label="描述"
             width="170">
           </el-table-column>

           <el-table-column label="数量" width="200">
             <template slot-scope="scope">
               <el-input v-model="scope.row.num" placeholder="请输入内容"></el-input>
             </template>
           </el-table-column>

           <el-table-column
             prop="amountUnit"
             label="单位"
             width="180">
           </el-table-column>
           <el-table-column
             prop="listPrice"
             label="单价（元）"
             width="170">
           </el-table-column>
           <el-table-column
             prop=""
             label="小计（元）"
             width="170">
           </el-table-column>

         </el-table>

         <div>
           备注:
           <el-input
             type="textarea"
             :autosize="{ minRows: 4, maxRows: 6}"
             placeholder="请输入内容"
           >
           </el-input>
         </div>
       </div>

       <!-- 打开产品模态框-->
       <el-dialog title="产品" :visible.sync="dialogTableVisible" width="1000px">



         <el-form :inline="true" :model="formInline" class="demo-form-inline">
           <el-form-item label="商品名">
             <el-input v-model="formInline.name" placeholder="商品名"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="onSubmit">查询</el-button>
           </el-form-item>
         </el-form>

         <el-table :data="gridData">
           <el-table-column property="productId" label="产品编号" width="150"></el-table-column>
           <el-table-column property="productName" label="产品名称" width="200"></el-table-column>


           <el-table-column property="type"   label="用途类型" width="200"></el-table-column>

           <el-table-column property="amountUnit" label="单位"></el-table-column>
           <el-table-column property="listPrice" label="单价" ></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini" @click="addpla(scope.row.id)">生产</el-button>
             </template>
           </el-table-column>
         </el-table>
         <!-- 分页-->
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageno"
           :page-sizes="[5, 10, 15, 20]"
           :page-size="pagesize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
         </el-pagination>
       </el-dialog>

     </div>



     <!--预览后的页面-->
     <div v-show="show2">

       <h1>生产计划单</h1>
       <!--主要功能 -->
       <el-row :gutter="20">
         <el-col :span="9" :offset="15">
           <div>
             <el-button @click="addApplyData">提交审核</el-button>
             <el-button @click="outpreview">返回</el-button>
           </div>
         </el-col>
       </el-row>


       <div class="">
         <!--顶部 -->
         <div>

           <el-input placeholder="请输入内容" :value="str" size="small">
             <template slot="prepend">生产理由:</template>
           </el-input>
           <el-input placeholder="请输入内容" size="small">
             <template slot="prepend">供货时间:</template>
           </el-input>
           <el-input placeholder="请输入内容" size="small" v-model="register">
             <template slot="prepend">登记人是:</template>
           </el-input>
           <el-input placeholder="请输入内容" :value="datez" size="small">
             <template slot="prepend">登记时间:</template>
           </el-input>

         </div>

         <el-table :data="applyData">
           <el-table-column label="点选" width="90">
             <template slot-scope="scope">
               <el-checkbox  :value="scope.row.checked"></el-checkbox>
             </template>
           </el-table-column>
           <el-table-column
             prop="productId"
             label="产品名称"
             width="170">
           </el-table-column>
           <el-table-column
             prop="productName"
             label="产品编号"
             width="170">
           </el-table-column>
           <el-table-column
             prop="productNick"
             label="描述"
             width="170">
           </el-table-column>

           <el-table-column label="数量" width="200">
             <template slot-scope="scope">
               <el-input :value="scope.row.num" placeholder="请输入内容"></el-input>
             </template>
           </el-table-column>

           <el-table-column
             prop="amountUnit"
             label="单位"
             width="180">
           </el-table-column>
           <el-table-column
             prop="listPrice"
             label="单价（元）"
             width="170">
           </el-table-column>
           <el-table-column
             prop="listPrice"
             label="小计（元）"
             width="170">
           </el-table-column>

         </el-table>

         <div>
           备注:
           <el-input
             type="textarea"
             :autosize="{ minRows: 4, maxRows: 6}"
             placeholder="请输入内容"
           >
           </el-input>
         </div>
       </div>

       <!-- 打开产品模态框-->
    <!--   <el-dialog title="产品" :visible.sync="dialogTableVisible" width="1000px">
         <el-table :data="gridData">
           <el-table-column property="productId" label="产品编号" width="150"></el-table-column>
           <el-table-column property="productName" label="产品名称" width="200"></el-table-column>


           <el-table-column property="type"   label="用途类型" width="200"></el-table-column>

           <el-table-column property="amountUnit" label="单位"></el-table-column>
           <el-table-column property="listPrice" label="单价" ></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini" @click="addpla(scope.row.id)">生产</el-button>
             </template>
           </el-table-column>
         </el-table>
         &lt;!&ndash;&lt;!&ndash; 分页&ndash;&gt;&ndash;&gt;
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageno"
           :page-sizes="[5, 10, 15, 20]"
           :page-size="pagesize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
         </el-pagination>
       </el-dialog>
-->
     </div>
   </div>


</template>

<script>
    export default {
      name: "plan",

      data() {
        return {
          str: "新发生",
          datez: "",
          pagesize:5,
          pageno:1,
          total:0,
          dialogTableVisible: false,
          gridData: [],
          applyData:[],
          remark:"",
          value1:"",
          register:"",
          show1:true,
          show2:false,
          formInline: {
            name: ""
          },
         // checked:false,


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
          this.datez = date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },

        //添加Apply数据
        addApplyData(){

                var newapplydata=this.applyData.filter((tiem)=>{
                         tiem.registerTime2=new Date();
                         tiem.register2=this.register;
                         tiem.remark=this.remark;

                  return tiem.checked==true;

                });


                 this.$confirm('确定提交这个生产计划吗？', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                 }).then(() => {

                  /* var params=URLSearchParams()
                       params.append("registerTime",this.date)
                       params.append("register",this.register)*/
                   this.$axios.post("apply/addApply",JSON.stringify(newapplydata),
                     {headers:{"Content-Type":"application/json"}}).then((response)=>{

                         if(response.data==true){
                           this.delApply()
                           this.outpreview()
                           this.$message({
                             showClose: true,
                             message: '提交成功',
                             type: 'success'
                           });
                         }else{
                           this.$message({
                             showClose: true,
                             message: '提交失败',
                             type: 'error'
                           });
                         }

                    }).catch()

                 }).catch(() => {
                   this.$message({
                     type: 'info',
                     message: '已取消提交'
                   });
                 });
        },


        //获取Dfile表数据
        getDfile(){
           var params=new URLSearchParams();
               params.append("pageno", this.pageno);
               params.append("pagesize",this.pagesize);
               params.append("productName",this.formInline.name);

           this.$axios.post("/apply/DfilePage",params).then((response)=>{
                 response.data.records.forEach((item)=>{
                     if(item.type=="Y001-1"){
                       item.type="商品"
                     }else{
                       item.type="物料"
                     }
                 })
                 this.gridData=response.data.records;
                 this.total=response.data.total;
           }).catch()


        },

        //打开添加模态框
        showadd() {
          this.dialogTableVisible = true;
          this.formInline.name=" ";
          this.getDfile();
        },

        //生产计划添加商品
        addpla(id){

                  var params=new URLSearchParams()
                   params.append("id",id)
                   this.$axios.post("apply/getByDid",params).then((response)=>{
                       //显示临时的生产商品数据apply/getByDid

                            var obj=this.applyData.find((item)=>{return item.id==response.data.id})
                            if(obj!=null)
                                  return;
                            response.data.num=1;
                           this.applyData.push(response.data)
                    }).catch()

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

        //删除产品
        delApply(){

             var newapplydata=this.applyData.filter((tiem)=>{return tiem.checked==true;});

             if(newapplydata.length==0){
               this.$message({
                 message: '请勾选你要删除的产品',
                 type: 'warning'
                 });
               return;
               }
             this.applyData.forEach((item,index)=>{
               if(item.checked==true){
                 this.applyData.splice(index,newapplydata.length);
               }
             })
        },

        //预览
        preview(){
          var newapplydata=this.applyData.filter((tiem)=>{return tiem.checked==true;});
          if(newapplydata.length==0){
            this.$message({
              message: '你没有点选产品',
              type: 'warning'

            });
            return;
          }
              this.show1=false;
              this.show2=true;
        },
         //推出预览
        outpreview(){
          this.show1=true;
          this.show2=false;
        },

        //模态框的查询
        onSubmit(){
             this.getDfile()
        }

      },
       created() {
        this.getDate()
       }

    }
</script>

<style scoped>

</style>
