const createActivities = {
	//定义状态
	state: {
		// 业务受理入参5大模块入参
		company: {}, //企业信息
		business: {}, //业务信息
		destNumber: [], //目的码
		number400ValueAdded: [], //增值服务
		number400Concession: [], //优惠信息
		msgDisabled:false,       //信息输入框禁用
		permission: {}, //当前路由信息

        flowRecord:[], // 全部详情右侧信息
		routes: [],


	},
	//更新状态
	mutations: {
		//控制信息输入框是否禁用
		changeMsgDisabled(state, msgDisabled) {
			state.msgDisabled = msgDisabled
		},
		//控制企业信息的变化
		changeCompany(state, company) {
			state.company = company
		},
		//控制业务信息的变化
		changeBusiness(state, business) {
			state.business = business
		},
		//控制目的码的变化
		changeDestNumber(state, destNumber) {
			state.destNumber = destNumber
		},
		//控制企业信息的变化
		changeNumber400ValueAdded(state, number400ValueAdded) {
			state.number400ValueAdded = number400ValueAdded
		},
		//控制企业信息的变化
		changeNumber400Concession(state, number400Concession) {
			state.number400Concession = number400Concession
		},
		changePermission(state, data) {
			state.permission = data;
		},
        addRoute(state, data) {
            let r = [];

            function format(data, parentPath) {
                var parentPath = parentPath || '';
                data.map(item => {
                    if (item.children.length > 0 && item.children[0].type != 'b') {
                        format(item.children, parentPath + item.url);
                    } else {
                        r.push(parentPath + item.url);
                    }
                })
            };
            format(data);
            state.routes = r;
        }
	},
	getters: {
		getPermission: state => {
			return state.permission.children;
		},
		getRoute: state => {
			return state.routes;
		}
	},
	actions: {
		//控制企业信息的变化
        changeMsgDisabledStatus({ commit }, msgDisabled) {
			commit("changeMsgDisabled", msgDisabled)
		},
		//控制企业信息的变化
		ChangeCompanyStatus({ commit }, company) {
			commit("changeCompany", company)
		},
		//控制企业信息的变化
		ChangeBusinessStatus({ commit }, business) {
			commit("changeBusiness", business)
		},
		//控制目的码的变化
		ChangeDestNumberStatus({ commit }, destNumber) {
			commit("changeDestNumber", destNumber)
		},
		//控制增值业务的变化
		ChangeNumber400ValueAddedStatus({ commit }, number400ValueAdded) {
			commit("changeNumber400ValueAdded", number400ValueAdded)
		},
		//控制优惠信息的变化
		ChangeNumber400ConcessionStatus({ commit }, number400Concession) {
			commit("changeNumber400Concession", number400Concession)
		},
		//控制详情右侧信息栏
        ChangeFlowRecord({ commit }, flowRecord) {
			commit("changeFlowRecord", flowRecord)
		},
	}
}
export default createActivities
