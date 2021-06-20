<template>
  <div id="Makeprocessdesignsheet">
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
                       @click="insprolist(scope.$index,scope.row.id)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-dialog
      title="aa调度单"
      :visible.sync="upddiod"
      width="83%"
      :before-close="handleClose">
      <div v-show="show1">
        <el-button type="success" @click="upprolist">添加工序</el-button>
        <el-button type="danger" @click="delprolist">删除工序</el-button>
        <el-button type="primary" @click="showUp">预览</el-button>
      <h1>生产工序设计单</h1>
      <el-form :inline="true" :model="updstu" class="demo-form-inline">
        <el-form-item label="产品名称：">
          <!--        <el-input v-model="updstu.id" style="width: 400px"></el-input>-->
          <span style="width: 400px">{{updstu.productName}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 450px" label="产品编号：">
          <span>{{updstu.productId}}</span>
        </el-form-item><br>
        <el-form-item label="设计人：">
          <el-input v-model="updstu.designe1" style="width: 386px" placeholder="请输入设计人"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="outapp"  border style="width: 100%">
        <el-table-column
          label="点选"
          width="70px">
          <template slot-scope="scope">
            <el-checkbox  v-model="scope.row.checked">
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
      <br/>
      <el-form :inline="true" :model="updstu" class="demo-form-inline">
        <el-form-item label="登记人：">
          <el-input v-model="updstu.register1" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item style="padding-left: 120px" label="登记时间：">
          <div class="block" >
            <!--            <span class="demonstration">设置默认时间</span>-->
            <el-date-picker style="width: 400px"
                            v-model="updstu.registerTime1"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            default-time="12:00:00"
                            :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item><br>
        <el-form-item label="设计要求：">
          <el-input   v-model="updstu.procedureDescribe" style="width: 1000px" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      </div>
      <div v-show="show2">
        <el-button type="primary" @click="goinsprolist">提交</el-button>
        <el-button type="info" @click="showdwon">返回</el-button>
        <h1>生产工序设计单</h1>
        <el-form :inline="true" :model="updstu" class="demo-form-inline">
          <el-form-item label="产品名称：">
            <span style="width: 400px">{{updstu.productName}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 450px" label="产品编号：">
            <span>{{updstu.productId}}</span>
          </el-form-item><br>
          <el-form-item label="设计人："  style="width: 386px">
            <span>{{updstu.designer1}}</span>
          </el-form-item>
        </el-form>
        <el-table :data="outapp"  border style="width: 100%">
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
        <br/>
        <el-form :inline="true" :model="updstu" class="demo-form-inline">
          <el-form-item label="登记人：">
            <span>{{updstu.register1}}</span>
          </el-form-item>
          <el-form-item style="padding-left: 520px" label="登记时间：">
            <div class="block" >
              <el-date-picker style="width: 400px"
                              v-model="updstu.registerTime1"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              default-time="12:00:00"
                              :picker-options="pickerOptions1"
                              :disabled="true">
              </el-date-picker>
            </div>
          </el-form-item><br>
          <el-form-item label="设计要求：">
<!--            <el-input   v-model="updstu.sss" style="width: 1000px" type="textarea"></el-input>-->
            <span style="width: 1000px">
              {{updstu.procedureDescribe}}
            </span>
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
      prop="id"
      label="产品编号"
      width="230">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="140">
      </el-table-column>
      <el-table-column
        label="档次级别"
        width="230">
        <template slot-scope="scope">
            {{scope.row.productClass | jibie}}
        </template>
      </el-table-column>
      <el-table-column
        label="I级分类"
        width="170">
        <template slot-scope="scope">
          {{scope.row.firstKindName}}
        </template>
      </el-table-column>
      <el-table-column
        label="II级分类"
        width="160">
        <template slot-scope="scope">
          {{scope.row.secondKindName}}
        </template>
      </el-table-column>
      <el-table-column
        label="III级分类"
        width="160">
        <template slot-scope="scope" >
          {{scope.row.thirdKindName}}
        </template>
      </el-table-column>
      <el-table-column
        label="产品经理">
        <template slot-scope="scope">
          {{scope.row.responsiblePerson}}
        </template>
      </el-table-column>
      <el-table-column label="指定设计单">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="upupddiod(scope.$index)">指定设计单</el-button>
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
        name: "Makeprocessdesignsheet",
      data(){
          return {
            updstu: {},
            outapp: [],
            productlist: [],
            upddiod:false,
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            sc: false,
            prolist:[],
            show1:true,
            show2:false,
            pageno:1,
            pagesize:5,
            total:0,
            Search:{
              // firstKindId:'',
              // secondKindId:'',
              // thirdKindId:''
            },
            firestoption:[],
            secondoption:[],
            thirdoption:[],
            datelist:''
          }
      },
      methods: {
        //获取数据
        getdata(){
          var param = new URLSearchParams();
          param.append("pageno",this.pageno);
          param.append("pagesize",this.pagesize);
          Object.keys(this.Search).forEach(item =>{
            param.append(item,this.Search[item])
          })
          if(this.datelist!=''){
            param.append("date1",this.datelist[0])
            param.append("date2",this.datelist[1])
          }

          this.$axios.post("gx/selDesignsheet",param).then(response =>{
            this.productlist=response.data.records;
            this.total=response.data.total;
          }).catch()
        },
        //加载一三级分类
        getKind(){
          this.$axios.post("conf/queryAll").then(response =>{
            this.firestoption=response.data
          }).catch()
        },
        //打开指定设计单的模态框
        upupddiod(index){
          this.updstu=this.productlist[index];
          this.upddiod=true;
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
        //这是打开工序对话框的方法
        upprolist() {
          this.$axios.post("gx/queryprolist").then(response => {
            this.prolist = response.data;
            this.sc = true;
          }).catch(e => alert("错误"))
        },
        //添加工序的方法
        insprolist(index, ids) {

          if (this.outapp.length > 0) {
            var a = this.outapp.find(item => {
              return item.id == ids
            })
            if (a == null) {
              this.outapp.push(this.prolist[index]);
            }
          } else {
            this.outapp.push(this.prolist[index]);
          }
        },
        //删除工序的方法
        delprolist() {
          var newoutapp = this.outapp.filter(item => item.checked == true)
          if (newoutapp.length != 0) {
            this.outapp.forEach((item, index) => {
              if (item.checked) {
                this.outapp.splice(index, newoutapp.length)
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
        //计算方法
        aa(ids) {
          var row = this.outapp.find((item) => {
            return item.id == ids;
          });
          if (Number(row.labourHourAmount) != NaN && Number(row.costPrice)) {
            row.subtotal = Number(row.labourHourAmount) * Number(row.costPrice);
          }
        },
        //预览
        showUp() {
          this.show1 = false;
          this.show2 = true;
          // this.prolist.forEach(item =>{
          //   item.subtotal = Number(item.labourHourAmount) * Number(item.costPrice);
          // })
        },
        //返回
        showdwon() {
          this.show1 = true;
          this.show2 = false
        },
        //提交
        goinsprolist(){
          if (this.outapp.length>0){
            var price =0;
            this.outapp.forEach(item =>{
              price+=item.subtotal;
            })

            this.updstu.costPriceSum=price
            this.outapp[0].updstu=this.updstu

            this.$axios.post("gx/tjgx",JSON.stringify(this.outapp),{headers:{"Content-Type":"application/json"}}).then(response =>{
              this.$message({
                message: '提交成功，请去审核',
                type: 'success'
              });
              this.upddiod=false;
              this.showdwon();
              this.getdata()
            }).catch(e =>{
              this.$message.error('出现问题了，请联系开发人员！');
            })
          }else{
            this.$message({
              showClose: true,
              message: '请至少添加一条工序！！',
              type: 'warning'
            });
          }
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
        }
      },
      created() {
          this.getKind();
          this.getdata();

      },
      filters:{
        jibie(val){
          if (val=="D001-1"){
            return "高档";
          }
          if (val=="D001-2"){
            return "中档";
          }
          if (val=="D001-3"){
            return "低档";
          }
        }
      }
    }
</script>

<style scoped>

</style>
