<template>
  <div id="Makeprocessdesignsheettoexaminequrey">
    <el-dialog
      title="添加工序"
      :visible.sync="sc"
      width="50%"
      :before-close="handleClose">
      <span>工序项目总数：{{prolist.length}}列</span>
      <el-table :data="prolist" border style="width: 100%">
        <el-table-column
          prop="typeId"
          label="工序编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="工序名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="describe1"
          label="工序描述"
          width="180">
        </el-table-column>
        <el-table-column label="添加">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="insprolist(scope.$index,scope.row.typeName)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-dialog
      title="aa调度单"
      :visible.sync="upddiod"
      width="83%"
      :before-close="handleClose">

      <div style="padding-left: 1000px">
        <el-button type="primary" @click="Submits">重新提交</el-button>
        <el-button type="info" @click="returns">返回</el-button>
      </div>
      <div>
        <h1>生产工序设计单</h1>
        <el-form :inline="true" :model="updstu" class="demo-form-inline">
          <el-form-item label="设计单编号：">
            <span>{{updstu.designId}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="设计人：">
            <el-input style="width: 300px" clearable v-model="updstu.designer1"></el-input>
          </el-form-item><br>
          <el-form-item style="padding-left: 10px" label="产品名称：">
            <span>{{updstu.productName}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 550px" label="产品编号：">
            <span>{{updstu.productId}}</span>
          </el-form-item>
        </el-form>

        <el-table :data="outapp"  border style="width: 100%">
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
            label="操作"
            width="190">
            <template slot-scope="scope">
              <el-button type="danger" size="mini"
                      @click="deldisprolist(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <h1>新工序</h1>
        <div style="padding-left: 1000px">
          <el-button type="success" @click="upprolist">添加新工序</el-button>
          <el-button type="danger" @click="delprolist">删除新工序</el-button>
        </div>
        <el-table :data="outapps"  border style="width: 100%">
          <el-table-column
            label="点选"
            width="70px">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked">
              </el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="工序名称"
            width="185">
          </el-table-column>
          <el-table-column
            prop="typeId"
            label="工序编号"
            width="185">
          </el-table-column>
          <el-table-column
            prop="describe1"
            label="描述"
            width="185">
          </el-table-column>
          <el-table-column
            label="工时数"
            width="185">
            <template slot-scope="scope">
              <el-input v-model="scope.row.labourHourAmount" @input="aa(scope.row.id)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="工时单位"
            width="185">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amountUnit" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单位工时成本"
            width="190">
            <template slot-scope="scope">
              <el-input v-model="scope.row.costPrice" @input="aa(scope.row.id)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="subtotal"
            label="工时成功小计（元）"
            width="190">
            <!--          <template slot-scope="scope">-->
            <!--            <span>{{scope.row.subtotal}}</span>-->
            <!--          </template>-->
          </el-table-column>
        </el-table>

        <el-form :inline="true" :model="updstu" class="demo-form-inline">
          <el-form-item label="工时总成本：">
            <span>{{updstu.costPriceSum}}</span>
          </el-form-item><br>
          <el-form-item label="设计要求：">
            <el-input   v-model="updstu.procedureDescribe" style="width: 1000px" type="textarea"></el-input>
          </el-form-item><br>
          <el-form-item label="审核人：">
            <el-input clearable v-model="updstu.changer"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 500px" label="审核时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="updstu.changeTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              :disabled="true">
              </el-date-picker>
            </div>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>

    <el-form :inline="true" :model="Search" class="demo-form-inline">
      <el-form-item label="一级分类：">
        <el-select v-model="Search.firstKindId" clearable @change="firest" placeholder="请选择">
          <el-option
            v-for="item in firestoption"
            :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类：">
        <el-select v-model="Search.secondKindId" clearable @change="second" placeholder="请选择">
          <el-option
            v-for="item in secondoption"
            :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类：">
        <el-select v-model="Search.thirdKindId" clearable placeholder="请选择">
          <el-option
            v-for="item in thirdoption"
            :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item><br>
      <el-form-item>
        <div class="block">
          <el-date-picker
            v-model="datelist"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="getdata" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column label="变更">
        <template slot-scope="scope">
          <el-button type="warning" size="mini"
                     @click="updprolist(scope.$index,scope.row.id)">变更</el-button>
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
  </div>
</template>

<script>
    export default {
        name: "Makeprocessdesignsheettoexaminechange",
      data(){
          return {
            Search:{},
            firestoption:[],
            secondoption:[],
            thirdoption:[],
            pageno:1,
            pagesize:5,
            total:0,
            datelist:'',
            productlist:[],
            prolist:[],
            sc:false,
            upddiod:false,
            updstu:{},
            outapp:[],
            outapps:[]
          }
      },
      methods:{
        //获取数据的方法
        getdata(){
          this.$axios.post("gx/seloexmaldeprook").then(response =>{
            this.productlist=response.data.records
            this.total=response.data.total
          }).catch(e => alert("出问题了"))
        },
        //这是打开更改模态框的方法
        updprolist(index,ids){
          var params = new URLSearchParams();
          params.append("id",ids);
          this.$axios.post("gx/seldisproById",params).then(response =>{
            this.outapp= response.data;
            this.updstu=this.productlist[index];
            this.getdate()
            this.upddiod=true;
          }).catch(e => alert("出问题了"))
        },
        //这是打开工序对话框的方法
        upprolist() {
          this.$axios.post("gx/queryprolist").then(response => {
            this.prolist = response.data;
            this.sc = true;
          }).catch(e => alert("错误"))
        },
        //添加新工序的方法
        insprolist(index, ids) {
          var a = this.outapp.find(item => {
            return item.procedureName == ids
          })
          if (a!=null){
            this.$message({
              showClose: true,
              message: '已存在工序，不可重复添加',
              type: 'warning'
            })
          }else{
            var a = this.outapps.find(item => {
              return item.typeName == ids
            })
            if (a!=null){
              this.$message({
                showClose: true,
                message: '已存在工序，不可重复添加',
                type: 'warning'
              })
            }else {
              this.outapps.push(this.prolist[index]);
            }
          }
        },
        //删除新工序的方法
        delprolist() {
          var newoutapp = this.outapps.filter(item => item.checked == true)
          if (newoutapp.length != 0) {
            this.outapps.forEach((item, index) => {
              if (item.checked) {
                this.outapps.splice(index, newoutapp.length)
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请选择一条工序删除',
              type: 'warning'
            });
          }
        },
        //这是删除的方法
        deldisprolist(index,ids){
          // this.outapp.splice(index,1);
          var params = new URLSearchParams();
          params.append("proid",ids);
          params.append("id",this.updstu.id)
          this.$axios.post("gx/delprolist",params).then(response =>{
            if (response.data){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }else {
              this.$message({
                message: '删除失败',
                type: 'danger'
              });
            }
            this.outapp.splice(index,1);
          }).catch(e => alert("出问题了"))
        },
        //重新提交的方法
        Submits(){
          //计算工序总成本
          var price =0;
          this.outapp.forEach(item =>{
            price+=item.subtotal;
          })
          this.outapps.forEach(item =>{
            price+=item.subtotal;
          })
          this.updstu.costPriceSum=price
          if (this.outapps.length==0) {
            var aa={};
            this.outapps.push(aa)
          }
            this.outapps[0].updstu=this.updstu;

          this.$axios.post("gx/upddispro",JSON.stringify(this.outapps),{headers:{"Content-Type":"application/json"}}).then(response =>{
            this.$message({
              message: '提交成功，请去审核',
              type: 'success'
            });
            this.upddiod=false;
            this.getdata()
          }).catch(e =>{
            this.$message.error('出现问题了，请联系开发人员！');
          })
        },
        //返回
        returns(){
          this.upddiod=false;
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
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        //根据一级选中的值找到二级
        firest(val){
          // console.log(this.Search.firstKindId)
          if (val==''){
            this.secondoption=[];
            this.thirdoption=[];
            this.Search.secondKindId='';
            this.Search.thirdKindId='';
          }
          this.firestoption.forEach(item =>{
            if(item.kindId ==val){
              this.secondoption =item.configFileKinds
            }
          })
        },
        //根据二级选中的值找到三级
        second(val){
          if (val==''){
            this.thirdoption=[];
            this.Search.thirdKindId='';
          }
          this.secondoption.forEach(item =>{
            if(item.kindId ==val){
              this.thirdoption =item.configFileKinds
            }
            return;
          })
        },
        //加载一三级分类
        getKind(){
          this.$axios.post("conf/queryAll").then(response =>{
            this.firestoption=response.data
          }).catch()
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
          this.updstu.changeTime =date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
        //计算方法
        aa(ids) {
          var row = this.outapps.find((item) => {
            return item.id == ids;
          });
          if (Number(row.labourHourAmount) != NaN && Number(row.costPrice)) {
            row.subtotal = Number(row.labourHourAmount) * Number(row.costPrice);
          }
        }
      },
      created() {
          this.getKind()
          this.getdata()
      }
    }
</script>

<style scoped>

</style>
