<template>
  <div id="Makeprocessdesignsheet">

    <el-button @click="upddiod=true">sss</el-button>

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
      <div >
        <el-button type="success" @click="upprolist">添加工序</el-button>
        <el-button type="danger" @click="delprolist">删除工序</el-button>
        <el-button type="primary" @click="">提交</el-button>
      </div>
      <h1>生产工序设计单</h1>
      <el-form :inline="true" :model="updstu" class="demo-form-inline">
        <el-form-item label="产品名称：">
          <!--        <el-input v-model="updstu.id" style="width: 400px"></el-input>-->
          <span style="width: 400px">{{updstu.idss}}</span>
        </el-form-item>
        <el-form-item style="padding-left: 450px" label="产品编号：">
          <span>{{updstu.cpid}}</span>
        </el-form-item><br>
        <el-form-item label="设计人：">
          <el-input v-model="updstu.qweqwe" style="width: 386px" placeholder="请输入年龄"></el-input>
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
          label="工时数"
          width="185">
          <template slot-scope="scope">
            <el-input v-model="scope.row.labourHourAmount"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="工时单位"
          width="185">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amountUnit"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="单位工时成本"
          width="190">
          <template slot-scope="scope">
            <el-input v-model="scope.row.costPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="工时成功小计（元）"
          width="190">
          <span></span>
        </el-table-column>
      </el-table>
      <br/>
      <el-form :inline="true" :model="updstu" class="demo-form-inline">
        <el-form-item label="登记人：">
          <el-input v-model="updstu.id" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item style="padding-left: 120px" label="登记时间：">
          <div class="block" >
            <!--            <span class="demonstration">设置默认时间</span>-->
            <el-date-picker style="width: 400px"
                            v-model="updstu.age"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                            :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item><br>
        <el-form-item label="设计要求：">
          <el-input   v-model="updstu.sss" style="width: 1000px" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="productlist" border style="width: 100%">
      <el-table-column
      prop="id"
      label="产品编号"
      width="230">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        width="140">
      </el-table-column>
      <el-table-column
        prop="name"
        label="档次级别"
        width="230">
      </el-table-column>
      <el-table-column
        prop="name"
        label="I级分类"
        width="170">
      </el-table-column>
      <el-table-column
        prop="name"
        label="II级分类"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="III级分类"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品经理"
        width="163">
      </el-table-column>
      <el-table-column label="指定设计单">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="upddiod=true">指定设计单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "Makeprocessdesignsheet",
      data(){
          return {
            updstu: {},
            outapp: [
              // labourHourAmount:'',
              // amountUnit:'',
              // costPrice:'',
              // subtotal:''
            ],
            productlist: [],
            upddiod:false,
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            sc: false,
            prolist:[]
          }
      },
      methods:{
        //  关闭模态框
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //这是打开工序对话框的方法
        upprolist(){
          this.$axios.post("gx/queryprolist").then(response =>{
            this.prolist=response.data;
            this.sc=true;
          }).catch(e => alert("错误"))
        },
        insprolist(index,ids){

          if (this.outapp.length>0){
            var a=this.outapp.find(item =>{
              return item.id==ids
            })
            console.log(a)
            if (a==null){
              this.outapp.push(this.prolist[index]);
            }
          }else {
            this.outapp.push(this.prolist[index]);
            console.log(this.outapp)
          }
        },
        delprolist(){

        }
      },
      computed:{
          // gscbxj(){
          //   // return this.outapp[0].labourHourAmount*this.outapp[0].costPrice
          // }
      }
    }
</script>

<style scoped>

</style>
