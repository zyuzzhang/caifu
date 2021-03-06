$(function() {
	H.ribao = {
		init: function(){
			$.ajaxSetup({
			    headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
			});
			// 选中左侧某个菜单
			selectLeftNode('nav-ribao');
			// 选中上方某个tab
			$('#pageTab a[href="#ribao"]').trigger('click');
			this.events();
			// 初始化日期选择插件
			$('.dateTimePicker').datetimepicker({
				format: 'yyyy-mm-dd',
		        autoclose: true,
		        startView: 2,
		        minView:2,
		        language:  'zh-CN',
			});
			this.getStatDaily();
			$('body').on('click','.data-search',function(){
				H.ribao.getStatDaily();

			});
			$('#reStatisticsTime').datetimepicker({
				format: 'yyyy-mm-dd',
		        autoclose: true,
		        startView: 2,
		        minView:2,
		        language:  'zh-CN',
			});
			$('#exportBtn').on('click',function(e){
				e.preventDefault();
				window.open('/statistic/ribao/export','_blank');

			});
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
				var time = $('#reStatisticsTime').val();
				if(!time){
					alertErrorMsg('请选择时间');
					return;
				}
				//重新统计弹层提交按钮事件，展示提示信息
				$("#reStatisticsPopup").addClass("none");
				showAlert('数据正在重新统计中...');
				
				$.ajax({
				  type: 'POST',
				  url: '/statistic/ribao/reset',
				  data: {
					  'time' : time,

				  },
				  success: function(json){

					  

				  		if(json.errcode == 0){
				  			showAlert('统计成功');
				  			window.location.reload();
				  		}else{
				  			alertErrorMsg(json.msg);
				  		}


				  },
				  dataType: 'json'
			});

			});
		},
		getStatDaily : function (){
			
			var beginTime = $('.stat-daily-begin_time').val();
			var endTime = $('.stat-daily-end_time').val();
			if(!beginTime || !endTime){
				alertErrorMsg('请选择时间段');
				return false;
			}
			$.ajaxSetup({
			    headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
			});
			$.ajax({
				  type: 'POST',
				  url: '/statistic/api/get-stat-daily',
				  data: {
					  'begin_time' : beginTime,
					  'end_time' : endTime,

				  },
				  success: function(json){

					  

					if(json.errcode == 0){
						drawRibaoTable("ribaoChart",json.data);
					}else{
						alertErrorMsg(json.msg);
					}



				  },
				  dataType: 'json'
			});

		}
	};
	H.ribao.init();
});