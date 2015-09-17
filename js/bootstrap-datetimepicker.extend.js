/**
 * [bootstrap-datetimepicker.extend]
 * 依赖于：jQuery、datetimepicker、bootstrap
 * @Author   Moer
 */

(function($){

    // 汉化
    $.fn.datetimepicker.dates['zh-CN'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
    };

    // API
    $.fn.extend({  

        // 日历组件初始化
        Datetimepicker:function (){
            // 查找容器中的input组，并实例化
            var dates       = $(this).find('.date');
            var startPicker = dates.first().find('input');
            var lastPicker  = dates.last().find('input');

            dates.datetimepicker({
                // pickerPosition: "bottom-left",
                format: 'yyyy-mm-dd',
                language:  'zh-CN',
                weekStart: 1,       //一周从哪一天开始
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,  //高亮当前日期
                startView: 2,       //日期时间选择器打开之后首先显示的视图
                minView: 2,         //日期时间选择器所能够提供的最精确的时间选择视图。
                endDate: '-0d'    //设置结束日期，'-0d'表示今天，'-1d'表示昨天
            });

            // 日期控件改变时，根据前后控件的逻辑进行调整
            dates.on('changeDate', function(){
                if (lastPicker.val() ==='' || startPicker.val() ==='') {
                    return;
                }
                var startValArray = startPicker.val().split("-");
                var lastValArray  = lastPicker.val().split("-");
                var startStr = "";
                var lastStr  = "";
                for (var i = 0; i < lastValArray.length; i++) {
                    startStr = startStr + startValArray[i];
                    lastStr  = lastStr  + lastValArray[i];
                }

                // 当结束日期控件时间 小于 开始日期控件时间，将开始控件时间 设置为 为结束控件时间
                if (lastStr < startStr){
                    startPicker.val(lastPicker.val());
                }
            });

            // 当起始日期控件调出选择时，将它的截止日期 设置为 结束日期控件的时间
            dates.first().on('show',function(){
                var lastVal = lastPicker.val();
                if (lastPicker.val() !=='') {
                    dates.first().datetimepicker('setEndDate', lastVal);
                }
            });
        }

    });  
})(jQuery);