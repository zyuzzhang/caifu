$(function() {
	H.ribao = {
		init: function(){
			// 选中左侧某个菜单
			selectLeftNode('nav-ribao');
			// 选中上方某个tab
			$('#pageTab a[href="#ribao"]').trigger('click');
			this.events();
			// 初始化日期选择插件
			$('.dateTimePicker').datepicker({
				autoclose: true,
        		format: "yyyy-mm-dd",
        		language: "zh-CN"
			});
			drawRibaoTable("ribaoChart",ribaoData);
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
	H.ribao.init();
});