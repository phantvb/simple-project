<template>
    <div id="citationNum">
        <div class="search">
            <el-form ref="citationNumForm" :model="citationNumForm">
                <el-form-item style="float: left;margin-left: 10px;">
                    <el-input v-model="citationNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
                        <template slot="prepend" style="width:80px;">引示号码：</template>
                    </el-input>
                    <div style="display: inline-block; margin-left: 15px;">
                        <span>状态：</span>
                        <el-select v-model="citationNumForm.value1" placeholder="请选择" size="mini">
                            <el-option
                                v-for="item in citationNumForm.options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item label="使用渠道：" style="clear: both;margin-left: 15px;">
                    <el-checkbox-group v-model="citationNumForm.checkList" style=" float: left;margin-left: 15px">
                        <el-checkbox label="自助直销"></el-checkbox>
                        <el-checkbox label="渠道"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="margin-left: 15px;">
                    <el-button type="primary" size="mini" class="searchButton" @click="search">搜索</el-button>
                    <el-button type="primary" plain size="mini" class="resetButton" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="buttonDiv">
            <div style="float: left;">
                <el-button type="primary" size="mini"><i class="el-icon-plus"
                                                         @click="showAddCitationNum">&nbsp;新增引示号码</i>
                </el-button>
                <el-button type="primary" plain size="mini" @click="batchDelete">批量删除</el-button>
            </div>
            <div style="float: right;">
                <el-button type="primary" plain size="mini" @click="importInfo">批量导入</el-button>
                <el-button type="primary" plain size="mini" @click="exportInfo">导出</el-button>
            </div>
        </div>

        <div>
            <el-table
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%;margin-bottom:15px;"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="100"></el-table-column>
                <el-table-column prop="number400" label="400号码" min-width="100"></el-table-column>
                <el-table-column prop="channel" label="使用渠道" min-width="100"></el-table-column>
                <el-table-column prop="guideNumber" label="引示号码" min-width="100"></el-table-column>
                <el-table-column prop="price" label="成本单价" min-width="100"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)"
                            :style="'display:'+display[scope.$index]+';'">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)"
                            :style="'display:'+display[scope.$index]+';'">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>

        <div>
            <el-dialog
                title="新增/编辑引示号码"
                :visible.sync="addCitationNumberFormDialogVisible"
                width="30%"
                :before-close="handleClose">
                <div>
                    <el-form ref="addCitationNumberForm" :model="addCitationNumberForm" label-width="100px">
                        <el-form-item label="引示号码：">
                            <el-input v-model="addCitationNumberForm.guideNumber" size="mini" class="el-input"
                                      style="float:left;width: 80%;"></el-input>
                        </el-form-item>

                        <el-form-item label="成本单价：">
                            <el-input v-model="addCitationNumberForm.unitPrice" size="mini" class="el-input"
                                      style="float:left; width: 40%;"></el-input>
                            <span style=" margin:0 5%;float:left;">元 /</span>
                            <el-select v-model="addCitationNumberForm.value" placeholder="请选择" size="mini"
                                       style="width: 25%; float: left;">
                                <el-option
                                    v-for="item in addCitationNumberForm.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="使用渠道：">
                            <el-checkbox-group v-model="addCitationNumberForm.checkList">
                                <el-checkbox label="自助直销" class="el-checkbox"
                                             :disabled="this.disabledSelf"></el-checkbox>
                                <el-checkbox label="渠道" :disabled="this.disabledChannel"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="addCitationNumberFormDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addCitationNum" size="mini"
                     :style="'display:'+submitData+';'">确 定</el-button>
          <el-button type="primary" @click="updateCitationNum" size="mini"
                     :style="'display:'+updateData+';'">编 辑</el-button>
      </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addCitationNumberFormDialogVisible: false,
                multipleSelection: [],
                citationNumForm: {
                    number: '',
                    options1: [{
                        value: '1',
                        label: '已绑定'
                    }, {
                        value: '2',
                        label: '未绑定'
                    }],
                    value1: '',
                    checkList: []
                },
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                addCitationNumberForm: {
                    guideNumber: '',
                    unitPrice: '',
                    second: '',
                    checkList: [],
                    options: [{
                        value: 'per6seconds',
                        label: '6秒'
                    }, {
                        value: 'perMinute',
                        label: '分钟'
                    }],
                    value: '',
                    id: ''          //  编辑时保存的id
                },
                display: [],

                selectedItems: [],
                ids: [],

                updateData: 'none',// 编辑和新增公用一个弹窗控制按钮显示
                submitData: 'inline-block',

                disabledSelf: false,
                disabledChannel: false
            }
        },
        methods: {
            // 修改页面显示数据大小
            handleSizeChange(val) {
                this.page.size = val;
                this.loadData();
            },

            // 修改当前显示页面
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.loadData();
            },

            search() {
                let str = '';
                if (this.citationNumForm.checkList.length == 2) {
                    str = "self,channel";
                }
                if (this.citationNumForm.checkList.length == 1 && this.citationNumForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.citationNumForm.checkList.length == 1 && this.citationNumForm.checkList[0] == "渠道") {
                    str = "channel";
                }

                let status = '';
                if (this.citationNumForm.value1 == '1') {
                    status = 'Binded';
                }
                if (this.citationNumForm.value1 == '2') {
                    status = 'Unbind';
                }

                this.$ajax.post('/vos/guideNumber/search', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "guideNumber": {
                        "line": '',
                        "status": status,
                        "channel": str,
                        "guideNumber": this.citationNumForm.number
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.guideNumbers;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                            }
                            if (this.tableData[i].channel == 'self,channel') {
                                this.tableData[i].channel = '自助直销,渠道';
                            }

                            if (this.tableData[i].status == 'Binded') {
                                this.tableData[i].status = '已绑定';
                                this.display[i] = 'none'
                            }
                            if (this.tableData[i].status == 'Unbind') {
                                this.tableData[i].status = '未绑定';
                                this.display[i] = 'inline-block'
                            }
                            if (this.tableData[i].priceType == 'per6seconds') {
                                this.tableData[i].price = this.tableData[i].price + '/6秒';
                            }
                            if (this.tableData[i].priceType == 'perMinute') {
                                this.tableData[i].price = this.tableData[i].price + '/分钟';
                            }
                        }
                    }
                });
            },

            reset() {
                this.citationNumForm.number = '';
                this.citationNumForm.value1 = '';
                this.citationNumForm.value2 = '';
                this.citationNumForm.checkList = [];
            },

            // 批量选择
            handleSelectionChange(val) {
                this.selectedItems = val;
            },

            batchDelete() {
                if (confirm('确定要删除这些信息吗?')) {
                    for (let i = 0; i < this.selectedItems.length; i++) {
                        this.ids.push(this.selectedItems[i].id);
                    }
                    let IDS = this.ids.join(',');
                    this.$ajax.post('/vos/guideNumber/delete', {
                        "ids": IDS

                    }).then((res) => {
                        if (res.code == 200) {
                            alert('删除成功！');
                            this.loadData();
                        }
                        if (res.code == 4005) {
                            alert('您无权操作！');
                        }
                    });
                }
            },

            showAddCitationNum() {
                this.addCitationNumberFormDialogVisible = true;

                this.addCitationNumberForm.guideNumber = '';
                this.addCitationNumberForm.unitPrice = '';
                this.addCitationNumberForm.value = '';
                this.addCitationNumberForm.checkList = [];

                this.updateData = 'none';
                this.submitData = 'inline-block';

                this.disabledSelf = false;
                this.disabledChannel = false;
            },

            addCitationNum() {
                let str = '';
                if (this.addCitationNumberForm.checkList.length == 2) {
                    str = "self,channel";
                }
                if (this.addCitationNumberForm.checkList.length == 1 && this.addCitationNumberForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addCitationNumberForm.checkList.length == 1 && this.addCitationNumberForm.checkList[0] == "渠道") {
                    str = "channel";
                }

                this.$ajax.post('/vos/guideNumber/save', {
                    "guideNumber": {
                        "guideNumber": this.addCitationNumberForm.guideNumber,
                        "price": this.addCitationNumberForm.unitPrice,
                        "priceType": this.addCitationNumberForm.value,
                        "channel": str,

                        "line": "hangdian",


                    }
                }).then((res) => {
                    if (res.code == 200) {
                        alert('新增成功！');
                        this.loadData();
                    }
                    if (res.code == 4007) {
                        alert('该引示号已经存在！');
                        this.loadData();
                    }
                });

                this.addCitationNumberFormDialogVisible = false;
            },

            handleEdit(index, row) {
                this.addCitationNumberFormDialogVisible = true;
                this.updateData = 'inline-block';
                this.submitData = 'none';

                this.disabledSelf = true;
                this.disabledChannel = true;


                let channel = '';
                if (row.channel == '自助直销') {
                    channel = ['自助直销'];
                }
                if (row.channel == '渠道') {
                    channel = ['渠道'];
                }
                if (row.channel == '自助直销,渠道') {
                    channel = ['自助直销', '渠道']
                }

                this.addCitationNumberForm.guideNumber = row.guideNumber;
                this.addCitationNumberForm.unitPrice = row.price.split("/")[0];
                this.addCitationNumberForm.value = row.priceType;
                this.addCitationNumberForm.checkList = channel;
                this.addCitationNumberForm.id = row.id;
            },

            updateCitationNum() {
                let str = '';
                if (this.addCitationNumberForm.checkList.length == 2) {
                    str = "self,channel";
                }
                if (this.addCitationNumberForm.checkList.length == 1 && this.addCitationNumberForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addCitationNumberForm.checkList.length == 1 && this.addCitationNumberForm.checkList[0] == "渠道") {
                    str = "channel";
                }

                this.$ajax.post('/vos/guideNumber/update', {
                    "guideNumber": {
                        "id": this.addCitationNumberForm.id,
                        "guideNumber": this.addCitationNumberForm.guideNumber,
                        "channel": str,
                        "line": "xihu",
                        "price": this.addCitationNumberForm.unitPrice,
                        "priceType": this.addCitationNumberForm.value
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        alert("编辑成功！");
                        this.loadData();
                    }
                });
                this.addCitationNumberFormDialogVisible = false;
            },

            handleDelete(index, row) {
                if (confirm('确认删除吗?')) {
                    this.$ajax.post('/vos/guideNumber/delete', {
                        "ids": row.id
                    }).then((res) => {
                        if (res.code == 200) {
                            alert('删除成功！')
                            this.loadData();
                        }
                    });
                }
            },

            importInfo() {

            },

            exportInfo() {

            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            loadData() {
                this.$ajax.post('/vos/guideNumber/getAll', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "guideNumber": {
                        "line": "",
                        "status": "",
                        "channel": "",
                        "guideNumber": ""
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.guideNumbers;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                            }
                            if (this.tableData[i].channel == 'self,channel' || this.tableData[i].channel == 'channel,self') {
                                this.tableData[i].channel = '自助直销,渠道';
                            }

                            if (this.tableData[i].line == 'hangdian') {
                                this.tableData[i].line = '杭电';
                            }
                            if (this.tableData[i].line == 'xihu') {
                                this.tableData[i].line = '西湖';
                            }

                            if (this.tableData[i].status == 'Binded') {
                                this.tableData[i].status = '已绑定';
                                this.display[i] = 'none'
                            }
                            if (this.tableData[i].status == 'Unbind') {
                                this.tableData[i].status = '未绑定';
                                this.display[i] = 'inline-block'
                            }
                            if (this.tableData[i].priceType == 'per6seconds') {
                                this.tableData[i].price = this.tableData[i].price + '/6秒';
                            }
                            if (this.tableData[i].priceType == 'perMinute') {
                                this.tableData[i].price = this.tableData[i].price + '/分钟';
                            }
                        }
                    }
                });
            }
        },

        created() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    @import "./citationNum";
</style>
