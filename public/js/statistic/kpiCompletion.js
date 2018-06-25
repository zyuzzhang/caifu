$(function() {
	H.kpiCompletion = {
		init: function(){
			// 选中左侧某个菜单
			selectLeftNode('nav-kpiCompletion');
			// 选中上方某个tab
			$('#pageTab a[href="#kpiCompletion"]').trigger('click');
			this.events();
			// 初始化日期选择插件
			$('.dateTimePicker').datepicker({
				autoclose: true,
        		format: "yyyy-mm-dd",
        		language: "zh-CN"
			});
			// 绘制kpi页面图表
			drawKpiTable("kpiChart",'2018/01/01','深圳市',kpiData);
			// 初始化分页组件
			initPagination("#kpiPagination", 100, 20, 1);
		},
		events: function(){
			$("body").delegate("#reStatistics","click",function(){
				//重新统计按钮事件，打开重新统计弹层
				$("#reStatisticsTime").val("");
				$("#reStatisticsPopup").removeClass("none");
			}).delegate("#reStatisticsPopup .close-btn","click",function(){
				//重新统计弹层关闭按钮事件，关闭重新统计弹层
				$("#reStatisticsPopup").addClass("none");
			}).delegate("#reStatisticsPopup #reCommitBtn","click",function(){
				//重新统计弹层提交按钮事件，展示提示信息
				$("#reStatisticsPopup").addClass("none");
				showAlert('数据正在重新统计中...<br>24小时后统计结果才会刷新哦！');
			});
		}
	};
	H.kpiCompletion.init();
});