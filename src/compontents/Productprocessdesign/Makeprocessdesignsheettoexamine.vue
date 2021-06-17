<template>
    <div id="Makeprocessdesignsheettoexamine">
      <el-table :data="productlist" border style="width: 100%">
        <el-table-column
          prop="designId"
          label="设计单编号"
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
          width="163">
        </el-table-column>
        <el-table-column
          prop="designer1"
          label="设计人"
          width="160">
        </el-table-column>
        <el-table-column
          prop="registerTime1"
          label="登记时间"
          width="230">
        </el-table-column>
        <el-table-column
          prop="costPriceSum"
          label="工时总成本"
          width="160">
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="uptoexamine(scope.$index,scope.row.id)">审核</el-button>
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

      <el-dialog title="生产工序设计单审核"
                 :visible.sync="toexamine"
                 width="83%"
                 :before-close="handleClose">
        <div style="padding-left: 1000px">
          <el-radio v-model="radio" label="1">不通过</el-radio>
          <el-radio v-model="radio" label="2">通过</el-radio>
          <el-button type="primary" @click="toexamineok">确认</el-button>
          <el-button type="success">返回</el-button>
        </div>
        <h1>生产工序设计单</h1>
        <el-form :inline="true" :model="prolist" class="demo-form-inline">
          <el-form-item label="设计单编号：">
            <span>{{prolist.designId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="设计人：">
            <el-input style="width: 300px" clearable v-model="prolist.designer1"></el-input>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="产品名称：">
            <span>{{prolist.productName}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 550px" label="产品编号：">
            <span>{{prolist.productId}}</span>
          </el-form-item>
        </el-form>

        <el-table :data="working"  border style="width: 100%">
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
            label="工时数"
            width="185">
          </el-table-column>
          <el-table-column
            prop="amountUnit"
            label="工时单位"
            width="185">
          </el-table-column>
          <el-table-column
            prop="costPrice"
            label="单位工时成本"
            width="190">
          </el-table-column>
          <el-table-column
            prop="subtotal"
            label="工时成本小计（元）"
            width="190">
          </el-table-column>
        </el-table>

        <el-form :inline="true" :model="prolist" class="demo-form-inline">
          <el-form-item label="工时总成本：">
            <span>{{prolist.costPriceSum}}</span>
          </el-form-item><br>
          <el-form-item label="审核人：">
            <el-input clearable v-model="prolist.checker"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="审核时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="prolist.checkTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              :disabled="true">
              </el-date-picker>
            </div>
         </el-form-item>
          <el-form-item label="设计要求：">
            <el-input   v-model="prolist.procedureDescribe" style="width: 1000px" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Makeprocessdesignsheettoexamine",
      data(){
          return {
            productlist:[],
            toexamine:false,
            working:[],
            radio:'1',
            prolist:{},
            pageno:1,
            pagesize:5,
            total:0,

        }
      },
      methods:{
        //  获取到需要做审核操作的记录
        getdata(){
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);


          this.$axios.post("gx/seloexmaldepro",params).then(response =>{
            this.productlist = response.data.records
            this.total=response.data.total
          }).catch(e => alert("出问题了"))
        },
        //打开修改对话框
        uptoexamine(index,ids){
          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/seldisproById",params).then(response =>{
            this.working= response.data;
            this.prolist=this.productlist[index];
            // this.prolist.checkTime=new Date()
            this.getdate()
            this.toexamine = true;
          }).catch(e => alert("出问题了"))
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
          this.prolist.checkTime =date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
        //提交审核
        toexamineok(){
          var param = new URLSearchParams();
          Object.keys(this.prolist).forEach(item =>{
            if (this.prolist[item]!=null){
              param.append(item,this.prolist[item])
            }

          })
          param.append("radios",this.radio)

          this.$axios.post("gx/toexamine",param).then(response =>{
              if (response.data){
                this.$message({
                  showClose: true,
                  message: '审核成功！！',
                  type: 'success'
                });
                this.toexamine=false;
                this.getdata();
              }else{
                this.$message({
                  showClose: true,
                  message: '审核异常！！',
                  type: 'danger'
                });
              }
          }).catch(e => alert("出问题了"))
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
      },
      created() {
        this.getdata();
        // this.getKind()
      }
    }
</script>

<style scoped>

</style>
