(function($){

    /**
     * 初始化整体的方法
     * @param {DOM node} ele 
     * @param {Object} options 
     */
    var init = function(ele, options){
        var t = $(ele);
       
        console.log(options)
        initTreeDom(ele, options);
        initTreeCss(ele, options);
    }

   /**
    * 
    * @param {Dom nodes} ele 
    * @param {Object} options 
    */
    var initTreeDom = function(ele, options){
        
        if(options.data.length > 0){
            $(ele).append(getDom(options.data, options));
        }else if("" != options.url && null != options.url){
            $.ajax({
                type: 'get',
                dataType: 'json',
                cache: false,
                async: false,
                contentType: 'application/json;charset=UTF-8',
                url: options.url,
                success: function(resp){
                    if(resp){
                        $(ele).append(getDom(resp, options));
                    }
                }

            });
        }else{
            alert('at least push something!')
        }
    }

    /**
     * 获取dom结构
     * @param {*} data 
     * @param {*} options
     */
    var getDom = function(data, options){
        var checkStr = '';
        switch(options.checkboxes){
            case 'none':
                checkStr = '';break;
            case 'false':
                checkStr = '';break;
            case 'radio':
                checkStr = '<input type="radio" name="radio">';break;
            case 'checkbox':
                checkStr = '<input type="chechbox">';break;
            case 'true':
                checkStr = '<input type="checkbox">';break;
        }

        var domStr = '';
        domStr +='<ul>';
        $.each(data, function(i, n){
            domStr+='<li>'+checkStr+n.text;
            if(n.items){
               domStr+= getDom(n.items, options);
            }
            domStr+='</li>';
            
        });
        domStr += '</ul>';
        console.log(domStr)
       return domStr;
    }

    /**
     * 初始化css
     * @param {DOM node} ele 
     * @param {Object} options 
     */
    var initTreeCss = function(ele, options){
        console.log(options.ulIndent)
        $(ele).find('li').css('list-style', 'none');
        $(ele).find('ul').css('padding-left', options.ulIndent);
        if(options.ulCss){
            $(ele).find('ul').css(options.ulCss);
        }
        if(options.liCss){
            $(ele).find('li').css(options.liCss);
        }
        
        
    }

    $.fn.extend({
        ulTree: function(options) {
            var defaults = {
                /**通用 */
                type : 'normal',// string 类型，默认为normal,可以选择的值有
                ulIndent: '15px', //String 类型，值可以是px或者百分号，但是百分号有没有用就另说了
                data: [], //用于拼接的数组,
                url: '',//字符串，用于get方法的url
                checkboxes: 'none',//string类型，可选值有'none','false', 'radio', 'checkbox', 'true'

                /**自定义样式系列 */
                ulCss: '',//放进ul的样式
                liCss: '',//放进li的样式

                /**设计字段 */
                schema: {},//字段相关
            }

            var options = $.extend(defaults, options);

            return init(this, options);
        }
    });
})(jQuery);

