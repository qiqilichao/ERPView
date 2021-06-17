<template>
    <div id="ProductFileRegistration">
      <el-row>
        <el-col :span="18" :offset="4">
          <h1>产品档案登记</h1>
          <el-form :model="Dfile" ref="Dfile" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="10" >
                  <el-form-item label="产品名称" prop="productName">
                      <el-input v-model="Dfile.productName"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="制造商" prop="factoryName">
                  <el-input v-model="Dfile.factoryName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="I级分类" prop="firstKindName">
                  <el-select v-model="Dfile.firstKindName" placeholder="请选择分类">
                    <el-option label="电子" value="电子"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="II级分类" prop="secondKindName" >
                  <el-select v-model="Dfile.secondKindName" placeholder="请选择分类">
                    <el-option label="计算机" value="计算机"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="III级分类" prop="thirdKindName" >
                  <el-select v-model="Dfile.thirdKindName" placeholder="请选择分类">
                    <el-option label="服务器" value="服务器"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="用途类型" prop="type" >
                  <el-select v-model="Dfile.type" placeholder="请选择类型">
                    <el-option label="商品" value="商品"></el-option>
                    <el-option label="物料" value="物料"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="档次级别" prop="productClass">
                  <el-select v-model="Dfile.productClass" placeholder="请选择类型">
                    <el-option label="高档" value="高档"></el-option>
                    <el-option label="中档" value="中档"></el-option>
                    <el-option label="低档" value="低档"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10"  :offset="4">
                <el-form-item label="计量单位" prop="personalUnit">
                  <el-select v-model="Dfile.personalUnit" placeholder="请选择类型">
                    <el-option label="台" value="台"></el-option>
                    <el-option label="片" value="片"></el-option>
                    <el-option label="箱" value="箱"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="保修期" prop="warranty">
                  <el-input v-model="Dfile.warranty"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="市场单价" prop="listPrice">
                  <el-input v-model="Dfile.listPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="产品经理" prop="responsiblePerson">
                  <el-input v-model="Dfile.responsiblePerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="计划成本单价" prop="costPrice">
                  <el-input v-model="Dfile.costPrice"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="9" :offset="4">
              建档时间： <span>{{Dfile.registerTime}}</span>
            </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('Dfile')">立即创建</el-button>
                  <el-button @click="resetForm('Dfile')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    export default {
        name: "ProductFileRegistration",
        data(){
          return{
            Dfile: {
              productName: '',
              factoryName: '',
              firstKindName: '',
              responsiblePerson:'',
              secondKindName: '',
              thirdKindName: '',
              personalUnit:'',
              warranty:'',
              type: '',
              productClass: '',
              listPrice: '',
              realCostPrice: '',
              costPrice:'',
              registerTime:''
            }
          };
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
         this.Dfile.registerTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },
        //立即创建
        submitForm(){
          var _this =this;
          var params =  new FormData;
          Object.keys(this.Dfile).forEach((item)=>{
            params.append(item,this.Dfile[item]);
          })
          this.$axios({
            method:'post',
            url:'dfile/add.action',
            data:params,
            headers: {
              'Content-Type':'multipart/form-data'
            }
          }).then(function (response) {
            if (response.data==true) {
              _this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
              _this.Dfile={}
            }else {
              _this.$notify({
                title: '失败',
                message: '添加失败',
                type: 'danger'
              });
            }
            _this.currentTime();
          }).catch();
        },
        //重置
        resetForm(formName) {
          if (this.$refs[formName]!==undefined) {
            this.$refs[formName].resetFields();
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
      },
    }
</script>

<style scoped>

</style>
