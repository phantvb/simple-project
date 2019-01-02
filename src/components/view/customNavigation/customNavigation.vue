<template>
    <div id="customNavigation">
        <div class="navigation">
            <div class="detailMsg">
                <p>
                    导航管理(可拖动排序)
                </p>
            </div>
            <el-tree
                    :data="navigationList"
                    node-key="id"
                    show-checkbox
                    default-expand-all
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                    draggable
                    :allow-drop="allowDrop"
                    :allow-drag="allowDrag">
            </el-tree>
        </div>
        <div class="collapse">
            <el-collapse>
                <el-collapse-item title="一致性 Consistency" name="1">
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'customNavigation',
        data() {
            return {
                activeName: '1',
                navigationList: [{
                    id: 1,
                    label: '企业管理',
                }, {
                    id: 2,
                    label: '业务受理',
                }, {
                    id: 3,
                    label: '合同管理',
                },{
                    id: 4,
                    label: '运营管理',
                },{
                    id: 5,
                    label: '报表管理',
                },{
                    id: 6,
                    label: '预警信息',
                },{
                    id: 7,
                    label: '人工质检',
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        components: {},
        methods: {
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './customNavigation.scss';
</style>
