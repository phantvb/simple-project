<template>
    <div id="usableNum">
        <div class="search">
            <el-form ref="usableNumForm" :model="usableNumForm">
                <el-form-item style="float: left;margin-left: 10px;">
                    <el-input v-model="usableNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
                        <template slot="prepend" style="width:80px;">400号码：</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="可见渠道：" style=" clear: both;margin-left: 15px;">
                    <el-checkbox-group v-model="usableNumForm.checkList" style="float: left;margin-left: 15px">
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
                <el-button type="primary" size="mini" @click="showAddNum"><i class="el-icon-plus">&nbsp;新增400号码</i>
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
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData"
                style="width: 100%;margin-bottom:15px;"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number400"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="channel"
                    label="可见渠道"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="packageIds"
                    label="关联套餐"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除
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
                title="新增/编辑400号码"
                :visible.sync="addNumberFormDialogVisible"
                width="30%"
                :before-close="handleClose">
                <div>
                    <el-form ref="addNumberForm" :model="addNumberForm" label-width="100px">
                        <el-form-item label="400号码：">
                            <el-input v-model="addNumberForm.number" size="mini" class="el-input"></el-input>
                        </el-form-item>

                        <el-form-item label="可见渠道：">
                            <el-checkbox-group v-model="addNumberForm.checkList" @change="changeCheckList">
                                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                                <el-checkbox label="渠道"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item label="引示号码：">
                            <el-select v-model="addNumberForm.guideNumberValue" placeholder="请选择" size="mini"
                                       class="el-input">
                                <el-option
                                    v-for="item in addNumberForm.guideNumberOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="关联套餐：" style="margin-top: 15px;">
                            <el-tabs v-model="activeName" type="card">
                                <el-tab-pane label="自助直销" name="first">
                                    <el-checkbox-group v-model="addNumberForm.selfCheckList"
                                                       v-for="(item,index) in this.addNumberForm.selfTableData.length"
                                                       :key="item">
                                        <el-checkbox :label=addNumberForm.selfTableData[index].tariffName></el-checkbox>
                                        <br/>
                                    </el-checkbox-group>
                                </el-tab-pane>
                                <el-tab-pane label="渠道" name="second">
                                    <el-checkbox-group v-model="addNumberForm.channelCheckList"
                                                       v-for="(item,index) in this.addNumberForm.channelTableData.length"
                                                       :key="item">
                                        <el-checkbox
                                            :label=addNumberForm.channelTableData[index].tariffName></el-checkbox>
                                        <br/>
                                    </el-checkbox-group>
                                </el-tab-pane>
                            </el-tabs>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
      <el-button @click="addNumberFormDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addUsableNum" size="mini" :style="'display:'+submitData+';'">确 定</el-button>
          <el-button type="primary" @click="updateUsableNum" size="mini"
                     :style="'display:'+updateData+';'">编 辑</el-button>
      </span>
            </el-dialog>
        </div>

        <div>
            <el-dialog
                title="400号码导入校验"
                :visible.sync="importNumberFormDialogVisible"
                width="40%"
                :before-close="handleClose">
                <div>
                    <el-form ref="addNumberForm" :model="importNumberForm" label-width="150px">
                        <el-form-item label="校验比对结果：">
                            <span style="float: left;">可导入号码{{importNumberForm.totalNum}}个，有{{importNumberForm.errorNum}}个号码有误</span>
                        </el-form-item>
                        <el-form-item label="有误号码列表：">
                            <el-table
                                :data="importNumberForm.tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="number"
                                    label="400号码"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="channel"
                                    label="可见渠道"
                                    width="120">
                                </el-table-column>
                                <el-table-column
                                    prop="combo"
                                    label="关联套餐"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="error"
                                    label="错误">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="importNumberFormDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="importNumberFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                addNumberFormDialogVisible: false,
                importNumberFormDialogVisible: false,
                activeName: 'first',
                radio1: 1,
                radio2: 1,
                usableNumForm: {
                    number: '',
                    checkList: [],
                },
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                addNumberForm: {
                    number: '',
                    checkList: ['自助直销'],
                    selfTableData: [],
                    channelTableData: [],
                    selfCheckList: [],
                    channelCheckList: [],
                    guideNumberOptions: [],
                    guideNumberValue: ''
                },
                importNumberForm: {
                    totalNum: '2',
                    errorNum: '1',
                    tableData: [
                        {
                            number: '400123',
                            channel: '自助直销',
                            combo: '400商务热线6000套餐',
                            error: '400号码有误'
                        }
                    ]
                },
                selectedItems: [],
                ids: [],     // 批量删除时保存id
                getIds: [],
                getIdsItem: [],
                aTableData1: [],
                aTableData2: [],

                editContent: [],       // 编辑的时候保存信息

                updateData: 'none',    // 编辑和新增公用一个弹窗控制按钮显示
                submitData: 'inline-block',

                id: ''                 // 存放编辑时的id
            }
        },
        // props:['status'],
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
                if (this.usableNumForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.usableNumForm.checkList.length == 1 && this.usableNumForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.usableNumForm.checkList.length == 1 && this.usableNumForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/number400/search', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": this.usableNumForm.number,
                        "channel": str,
                        "status": "CanUse",
                        "companyName": '',
                        "guideNumber": ''
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.number400s;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                            }
                        }
                    }
                });
            },

            reset() {
                this.usableNumForm.number = '';
                this.usableNumForm.checkList = [];

                this.addNumberForm.number = '';
                this.addNumberForm.checkList = ['自助直销'];
                this.addNumberForm.selfTableData = [];
                this.addNumberForm.channelTableData = [];
                this.addNumberForm.selfCheckList = [];
                this.addNumberForm.channelCheckList = [];
                this.addNumberForm.guideNumberValue = '';
            },

            // 显示新增400号码请求，并加载关联套餐
            showAddNum() {
                this.addNumberFormDialogVisible = true;
                this.reset();

                this.updateData = 'none';
                this.submitData = 'inline-block';

                this.$ajax.post('/vos/tariffPackage/getTariff', {
                    "tariff": {
                        "channel": "self"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.addNumberForm.selfTableData = res.data.tariffPackageList;
                    }
                });

            },

            // 根据checklist改变关联套餐选项
            changeCheckList() {
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == '自助直销') {
                    // 自助直销
                    this.$ajax.post('/vos/tariffPackage/getTariff', {
                        "tariff": {
                            "channel": "self"
                        }
                    }).then((res) => {
                        if (res.code == 200) {
                            this.addNumberForm.selfTableData = res.data.tariffPackageList;
                        }
                    });
                    this.addNumberForm.channelTableData = [];
                }
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == '渠道') {
                    // 渠道
                    this.$ajax.post('/vos/tariffPackage/getTariff', {
                        "tariff": {
                            "channel": "channel"
                        }
                    }).then((res) => {
                        if (res.code == 200) {
                            this.addNumberForm.channelTableData = res.data.tariffPackageList;
                        }
                    });

                    this.addNumberForm.selfTableData = [];
                }
                if (this.addNumberForm.checkList.length == 2) {
                    // 自助直销 渠道
                    this.$ajax.post('/vos/tariffPackage/getTariff', {
                        "tariff": {
                            "channel": "self"
                        }
                    }).then((res) => {
                        if (res.code == 200) {
                            this.addNumberForm.selfTableData = res.data.tariffPackageList;
                        }
                    });
                    this.$ajax.post('/vos/tariffPackage/getTariff', {
                        "tariff": {
                            "channel": "channel"
                        }
                    }).then((res) => {
                        if (res.code == 200) {
                            this.addNumberForm.channelTableData = res.data.tariffPackageList;
                        }
                    });
                }
                if (this.addNumberForm.checkList.length == 0) {
                    // 都不选
                    this.addNumberForm.channelTableData = [];
                    this.addNumberForm.selfTableData = [];
                }
            },

            addUsableNum() {

                let str = '';
                if (this.addNumberForm.checkList.length == 2) {
                    str = "self,channel";
                }
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == "渠道") {
                    str = "channel";
                }

                let ids = this.getIdsFunction();

                this.$ajax.post('/vos/number400/save', {
                    "number400": {
                        "number400": this.addNumberForm.number,
                        "guideNumber": this.addNumberForm.guideNumberValue,
                        "channel": str,
                        "packageIds": ids
                    }
                }).then((res) => {
                    if (res.code == 5000) {
                        alert("新增成功！");
                    }
                    if (res.code == 4007) {
                        alert("该引示号已使用！");
                    }
                    this.loadData();
                });
                this.addNumberFormDialogVisible = false;
            },

            importInfo() {
                this.importNumberFormDialogVisible = true;
            },

            exportInfo() {

            },

            // 编辑
            handleEdit(index, row) {
                this.addNumberForm.number = '';
                this.addNumberForm.checkList = [];
                this.addNumberForm.guideNumberOptions = [];

                this.addNumberFormDialogVisible = true;
                this.updateData = 'inline-block';
                this.submitData = 'none';

                this.$ajax.post('/vos/tariffPackage/getTariff', {
                    "tariff": {
                        "channel": ""
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.addNumberForm.selfTableData = res.data.tariffPackageList;
                    }
                });

                // 加载可用引示号
                this.getCanUseCitationNum();

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

                this.addNumberForm.number = row.number400;
                this.addNumberForm.checkList = channel;
                this.addNumberForm.guideNumberValue = row.guideNumber;
                this.id = row.id;
            },

            updateUsableNum() {
                let str = '';
                if (this.addNumberForm.checkList.length == 2) {
                    str = "self,channel";
                }
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addNumberForm.checkList.length == 1 && this.addNumberForm.checkList[0] == "渠道") {
                    str = "channel";
                }

                let ids = this.getIdsFunction();

                this.$ajax.post('/vos/number400/update', {
                    "number400": {
                        "id": this.id,
                        "number400": this.addNumberForm.number,
                        "guideNumber": this.addNumberForm.guideNumberValue,
                        "channel": str,
                        "packageIds": ids
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        alert('更新成功！');
                        this.loadData();
                    }
                    if (res.code == 4005) {
                        alert('您无权操作！');
                    }
                });
                this.addNumberFormDialogVisible = false;

            },

            // 单个删除
            handleDelete(index, row) {
                if (confirm('确定删除该条信息吗?')) {
                    this.$ajax.post('/vos/number400/delete', {
                        "number400": [
                            {
                                "id": row.id,
                                "number400": row.number400,
                                "guideNumber": row.guideNumber
                            }
                        ]
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

            // 批量删除
            handleSelectionChange(val) {
                this.selectedItems = val;
            },

            batchDelete() {
                if (confirm('确定要删除这些信息吗?')) {
                    if (this.selectedItems.length == 0) {
                        alert('您未选择！');
                    }
                    else {
                        for (let i = 0; i < this.selectedItems.length; i++) {
                            this.ids.push({
                                "id": this.selectedItems[i].id,
                                "number400": this.selectedItems[i].number400,
                                "guideNumber": this.selectedItems[i].guideNumber
                            });
                        }
                        this.$ajax.post('/vos/number400/delete', {
                            "number400": this.ids
                        }).then((resp) => {
                            if (resp.code == 200) {
                                alert('删除成功！');
                                this.loadData();
                            }
                            if (resp.code == 4005) {
                                alert('您无权操作！');
                            }
                        });
                    }
                }
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
                this.$ajax.post('/vos/number400/getAll', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": "",
                        "channel": "",
                        "status": "CanUse",
                        "companyName": '',
                        "guideNumber": ''
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.number400s;
                        this.page.total = res.data.totalCount;


                        for (let i = 0; i < this.tableData.length; i++) {
                            this.getIdsItem = res.data.number400s[i].packageIds.split(",");    //把接收到的id字符串转换成数组
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';

                                for (let n = 0; n < this.getIdsItem.length; n++) {
                                    for (let j = 0; j < this.aTableData1.length; j++) {
                                        if (this.getIdsItem[n] == this.aTableData1[j].id) {
                                            this.getIds.push(this.aTableData1[j].tariffName);
                                        }
                                    }
                                }
                                res.data.number400s[i].packageIds = this.getIds.join(",");
                                this.getIds = [];
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                                for (let n = 0; n < this.getIdsItem.length; n++) {
                                    for (let j = 0; j < this.aTableData2.length; j++) {
                                        if (this.getIdsItem[n] == this.aTableData2[j].id) {
                                            this.getIds.push(this.aTableData2[j].tariffName);
                                        }
                                    }
                                }
                                res.data.number400s[i].packageIds = this.getIds.join(",");
                                this.getIds = [];
                            }
                            if (this.tableData[i].channel == 'self,channel') {
                                this.tableData[i].channel = '自助直销,渠道';
                                for (let n = 0; n < this.getIdsItem.length; n++) {
                                    for (let j = 0; j < this.aTableData1.length; j++) {
                                        if (this.getIdsItem[n] == this.aTableData1[j].id) {
                                            this.getIds.push(this.aTableData1[j].tariffName);
                                        }
                                    }
                                }
                                for (let n = 0; n < this.getIdsItem.length; n++) {
                                    for (let j = 0; j < this.aTableData2.length; j++) {
                                        if (this.getIdsItem[n] == this.aTableData2[j].id) {
                                            this.getIds.push(this.aTableData2[j].tariffName);
                                        }
                                    }
                                }
                                res.data.number400s[i].packageIds = this.getIds.join(",");
                                this.getIds = [];
                            }
                        }

                    }
                });

                this.$ajax.post('/vos/tariffPackage/getTariff', {
                    "tariff": {
                        "channel": "self"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.aTableData1 = res.data.tariffPackageList;
                    }
                });
                this.$ajax.post('/vos/tariffPackage/getTariff', {
                    "tariff": {
                        "channel": "channel"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.aTableData2 = res.data.tariffPackageList;
                    }
                });

                this.getCanUseCitationNum();
            },

            // 得到新增dialog里面的关联套餐的列表
            getIdsFunction() {
                let ids = [];
                for (let i = 0; i < this.addNumberForm.selfCheckList.length; i++) {
                    for (let j = 0; j < this.addNumberForm.selfTableData.length; j++) {
                        if (this.addNumberForm.selfCheckList[i] == this.addNumberForm.selfTableData[j].tariffName) {
                            ids.push(this.addNumberForm.selfTableData[j].id);
                        }
                    }
                }

                for (let i = 0; i < this.addNumberForm.channelCheckList.length; i++) {
                    for (let j = 0; j < this.addNumberForm.channelTableData.length; j++) {
                        if (this.addNumberForm.channelCheckList[i] == this.addNumberForm.channelTableData[j].tariffName) {
                            ids.push(this.addNumberForm.channelTableData[j].id);
                        }
                    }
                }
                ids = ids.join(",");
                return ids;
            },

            //加载可用引示号
            getCanUseCitationNum(){

                let totalCount = 0;
                this.$ajax.post('/vos/guideNumber/getAll', {
                    "guideNumber": {
                        "status": "Unbind",
                        "channel": "",
                        "guideNumber": ""
                    },
                    "page": {
                        "pageNo": '1',
                        "pageSize": '10'
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        totalCount = res.data.totalCount;
                        this.$ajax.post('/vos/guideNumber/getAll', {
                            "guideNumber": {
                                "status": "Unbind",
                                "channel": "",
                                "guideNumber": ""
                            },
                            "page": {
                                "pageNo": '1',
                                "pageSize": totalCount
                            }
                        }).then((resp) => {
                            if (resp.code == 200) {
                                for (let i = 0; i < resp.data.guideNumbers.length; i++) {
                                    if (resp.data.guideNumbers[i].status = "Unbind") {
                                        this.addNumberForm.guideNumberOptions.push({
                                            "value": resp.data.guideNumbers[i].guideNumber,
                                            "label": resp.data.guideNumbers[i].guideNumber
                                        });
                                    }
                                }
                            }
                        });
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
    @import "./usableNum";
</style>
