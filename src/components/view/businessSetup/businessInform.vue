<template>
    <div id="businessInform">
        <header>
            企业管理
        </header>
        <el-tabs v-model="active">
            <el-tab-pane label="全部" name="1"></el-tab-pane>
            <el-tab-pane label="企业审核" name="2"></el-tab-pane>
            <el-tab-pane label="变更审核" name="3"></el-tab-pane>
            <el-tab-pane label="注销审核" name="4"></el-tab-pane>
            <el-tab-pane label="已过审企业" name="5"></el-tab-pane>
            <el-tab-pane label="已注销企业" name="6"></el-tab-pane>
            <div class="search">
                <ul>
                    <li>
                        <el-input v-model="form.name" placeholder="请输入内容" size="mini" style="width:200px;">
                            <template slot="prepend" style="width:80px;">企业名称：</template>
                        </el-input>
                    </li>
                    <li>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                            <template slot="prepend">法人：</template>
                        </el-input>
                    </li>
                    <li>
                        <el-input v-model="form.number" placeholder="请输入内容" size="mini">
                            <template slot="prepend">证件编号：</template>
                        </el-input>
                    </li>
                </ul>
                <div class="block left">
                    <span class="demonstration">提交日期：</span>
                    <el-date-picker
                    style="margin-right:15px;"
                    v-model="form.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini">
                    </el-date-picker>
                    <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
                    <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
                </div>
            </div>
            <section class="addCompany left">
                <el-button type="primary" size="mini" @click="addCompany(true)">新增企业</el-button>
                <div>
                    <span>状态：</span>
                    <el-select v-model="form.status" size="mini" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" plain size="mini">导出</el-button>
                </div>
            </section>
            <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    prop="type"
                    label="类型"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="企业名称"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="证件编号"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="法人"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="提交日期"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text">详情</el-button>
                        <el-button size="mini" type="text">编辑</el-button>
                        <el-button size="mini" type="text">送审</el-button>
                        <el-button size="mini" type="text">撤回</el-button>
                        <el-button size="mini" type="text">变更</el-button>
                        <el-button size="mini" type="text">注销</el-button>
                        <el-button size="mini" type="text">通过审核</el-button>
                        <el-button size="mini" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.num"
                :page-sizes="$global.pageSize"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </el-tabs>
        <company :show="addCompanys" @close="addCompany(false)"></company>
    </div>
</template>
<style lang="scss" scoped>
@import './businessInform.scss';
</style>
<script>
import company from './dialog/company.vue'
export default {
    name:'businessInform',
    components:{
        company
    },
    data(){
        return {
            active:'1',
            addCompanys:false,
            form:{
                name:'',
                person:'',
                number:'',
                date:null,
                status
            },
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '选项2',
                label: '等待送审'
            }, {
                value: '选项3',
                label: '待审核'
            }, {
                value: '选项4',
                label: '审核通过'
            }, {
                value: '选项5',
                label: '被驳回'
            }],
            tableData:[],
            page:{
                num:1,
                size:10,
                total:1
            }
        }
    },
    mounted(){

        var arr=[12312,213312,111];

        this.$ajax.post('/user/apiLogin',{'username':'jeq','password':'123456'}).then(res=>{
            this.$ajax.post('/tariffPackage/testArray',{'strings':arr}).then(ires=>{

            })
        })

    },
    methods:{
        addCompany(bol){
            this.addCompanys=bol;
        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
    }
}
</script>


