<template>
    <div id="lineCostSetting">
        <header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>线路成本设置</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <el-tabs>
            <div class="search">
                <span>线路：</span>
                <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="mini" style="width:80px;" @click="searchNotice">搜索</el-button>
                <el-button type="primary" plain size="mini" style="width:80px;" @click="resetForm">重置</el-button>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="localSide" label="局端">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                    </el-table-column>
                    <el-table-column prop="cost" label="成本">
                    </el-table-column>
                    <el-table-column prop="cost" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="margin-top: 10px">
                <el-pagination
                    style="float:right;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="$global.pageSize"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
            <div>
                <el-dialog
                    title="线路成本编辑"
                    :visible.sync="editDialog"
                    width="30%">
                    <el-form>
                        <el-form-item label="局端">
                            <span>{{this.value}}</span>
                        </el-form-item>
                        <el-form-item label="备注">
            <span>
              <el-input v-model="remark" size="mini" style="width: 70%"></el-input>
            </span>

                        </el-form-item>
                        <el-form-item label="成本">
                            <el-input v-model="cost" size="mini" style="width: 36%"></el-input>
                            <span>元/</span>
                            <el-select v-model="unit" placeholder="请选择" size="mini" style="width: 30%;">
                                <el-option
                                    v-for="item in units"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit" size="mini">确 定</el-button>
            <el-button @click="editDialog = false" size="mini">取 消</el-button>
          </span>
                </el-dialog>
            </div>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                editDialog: false,
                options: [{
                    value: '江干分局',
                    label: '江干分局'
                }, {
                    value: '西湖分局',
                    label: '西湖分局'
                }, {
                    value: '全部',
                    label: '全部'
                }],
                value: '',
                units: [{
                    value: '6秒',
                    label: '6秒'
                }, {
                    value: '分钟',
                    label: '分钟'
                }],
                unit: '',
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                remark: '',
                cost: '',
                id: ''
            }
        },

        methods: {
            searchNotice() {
                if (this.value == '全部') {
                    this.value = '';
                }
                this.$ajax.post('/vos/linecost', {
                    "line": {
                        "localSide": this.value
                    },
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.linecosts;
                        this.page.total = res.data.totalCount;
                    }
                });
            },

            resetForm() {
                this.value = '';
            },

            handleEdit(index, row) {
                this.editDialog = true;
                this.$ajax.get('/vos/linecost/getDetail/' + row.id).then((res) => {
                    if (res.code == 200) {
                        let oldCost = res.data.cost.split("元")[0];
                        let oldUnit = res.data.cost.split("/")[1];
                        this.value = res.data.localSide;
                        this.remark = res.data.remark;
                        this.cost = oldCost;
                        this.unit = oldUnit;
                        this.id = row.id;
                    }
                });
            },

            submit() {
                let cost = this.cost + '元/' + this.unit;
                console.log(cost);
                this.$ajax.post('/vos/linecost/update', {
                    "line": {
                        "remark": this.remark,
                        "cost": cost,
                        "id": this.id
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        alert("编辑成功！");
                        this.loadTableData();
                    } else {
                        alert("编辑失败！");
                    }
                });
                this.editDialog = false;
            },

            // 修改页面显示数据大小
            handleSizeChange(val) {
                this.page.size = val;
                this.loadTableData();
            },

            // 修改当前显示页面
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.loadTableData();
            },

            loadTableData() {
                this.$ajax.post('/vos/linecost', {
                    "line": {
                        "localSide": "",
                        "remark": "",
                        "cost": ""
                    },
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    }

                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.linecosts;
                        this.page.total = res.data.totalCount;
                    }
                });
            }
        },
        created() {
            this.loadTableData();
        }
    }
</script>
<style lang="scss" scoped>
    @import "./lineCostSetting.scss";
</style>
