// 定义一个类
function DragTree(list, element, search, dragable) {
    this.list = list
    this.element = element
    this.search = search
    this.dragable = dragable
    this.init()
    
}
// 定义初始化展示
DragTree.prototype.init = function () {
    var that = this
    var html = '';
    html += '<div class="select-picker-options-wrp" id="drag-tree">';
    html += '<div class="select-picker-options-serch">';
    html += '<input id="tree-search" type="text" placeholder="">';
    html += '</div>';
    html += '<div class="select-picker-options-list">';
    this.list.forEach(function (ele) {
        html += '<div class="select-picker-options-list-item drag-tree-section">';
        if (ele.child) {
            html += '<b class="duihao duihao-nocheck"></b>';
        }
        html += '<div class="drag-title">' + ele.name + '</div>';
        if (ele.child) {
            html += that.createChildHTML(ele.child)
        }
        html += '</div>';
    })
    html += '</div>';
    html += '</div>';

    $(this.element).html(html)
    this.drag()
    this.treeSearch()

}
// child标签元素递归
DragTree.prototype.createChildHTML = function (child) {
    var subItemsHtml = '';
    child.forEach(function (ele) {
        subItemsHtml += '<div class="select-picker-options-list">';
        subItemsHtml += '<div class="select-picker-options-list-item">';
        subItemsHtml += '<div class="drag-item'
        if( ele.checked==true){
            console.log('ppp')
            subItemsHtml +=' disabled'
        }
        subItemsHtml +='" id="' + ele.id + '">' + ele.name + '</div >';
        if (ele.child) {
            this.createChildHTML(ele.child)
        }
        subItemsHtml += '</div>';
        subItemsHtml += '</div>';
    })
    return subItemsHtml;
}
// 定义搜索事件
DragTree.prototype.treeSearch = function (){
    $('#tree-search').on('blur',function(){
        console.log($(this).val())
        var searchVal=$(this).val()
        $('.drag-item').hide()
        $('.drag-title').hide()
       
        for(var j=0;j<$('.drag-title').length;j++){
            if($('.drag-title')[j].innerText.includes(searchVal)){
                $($('.drag-title')[j]).fadeIn().parents(".drag-tree-section").find(".drag-item").fadeIn()
            }else{

            }

        }
        for(var i=0;i<$('.drag-item').length;i++){
            if($('.drag-item')[i].innerText.includes(searchVal)){
                $($('.drag-item')[i]).fadeIn().parents(".drag-tree-section").children(".drag-title").fadeIn()
            }
        }

        
    })
}
// 定义拖拽事件
DragTree.prototype.drag = function () {

   //表字段拖拽事件 
    $("#drag-tree .drag-item").draggable({
        helper: "clone",
        revert: "invalid",
        start: function (event, ui) {
            $(this)

        }
    });
    // disabled元素无法拖拽
    console.log( $("#drag-tree .disabled"))
      $("#drag-tree .disabled").draggable('disable');
    // input接受拖拽参数的事件
    $("#droppable").droppable({
        // activeClass: "ui-state-default",
        // hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(ui.helper.context).addClass('disabled')
            $(ui.helper.context).draggable("disable")
            // 如果已经被赋值，则替换，并且点亮被替换者
            if($(this).find("input").attr('data')){
                var id=$(this).find("input").attr('data')
                console.log(id)
                $('#'+id).removeClass('disabled')
            }
            // 添加回显字段，及绑定值
            $(this)
                .find("input")
                .attr('data', ui.helper.context.id)
                .val(ui.helper.context.innerText);
        }
    });

    // 删除已经赋值的内容操作
    $('.del').on('click',function(){
        if($(this).prev().attr('data')){
            var id=$(this).prev().attr('data')
            console.log($('#'+id))
            $(this).prev().val('000').removeAttr('data')
            $('#'+id).removeClass('disabled')
            $('#'+id).draggable('enable')
        }
        
    })


}
//