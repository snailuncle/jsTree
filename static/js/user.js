var jstreeID = 'jstree';
    // $('#jstree_demo_div').on("changed.jstree", function (e, data) {
    //   console.log(data.selected);
    // });
    // $('button').on('click', function () {
    //   $('#jstree').jstree(true).select_node('child_node_1');
    //   $('#jstree').jstree('select_node', 'child_node_1');
    //   $.jstree.reference('#jstree').select_node('child_node_1');
    // });


  function reloadTree(){
    var tree = $('#' + jstreeID)
    // tree.jstree().destroy()
    // tree.data('jstree', false).empty();
    tree.jstree({ 'core': { data: null } });
    var url = "/getDirInfo"
    $.post(url, {}, function(json) {
      console.log("reloadTree  json=")
      console.log(json);

    // tree.jstree(true).settings.core.data = json;
    // tree.jstree().settings.core.data = null;
    // tree.jstree().refresh(true,true);
    tree.jstree(true).settings.core.data = json;
    tree.jstree(true).refresh();
    //console.debug("reloaded.");
    });





    //$("#browser").jstree().destroy();//方法一









  }


function getPathFromNode(NodeObj){
  var parentsFileName=NodeObj["parents"].map((id)=>{
    return getNode(id).text
  })
  parentsFileName.unshift(NodeObj.text);
  parentsFileName.reverse();
  parentsFileName.shift();
  parentsFileName=parentsFileName.join('/')
  return parentsFileName
}








function myFunction() {
  x = document.getElementById("文件夹1"); // 找到元素
  x.style.color = "red"; // 改变内容
  x.style.fontSize = "larger";
}
function getSelectNodeId() {   
  var treeNode = $('#' + jstreeID).jstree(true).get_selected(true)[0]; //获取所有选中的节点对象
  var nodeId = treeNode.original.id;   
  return nodeId;
}

function selectTreeNode(id) {   
  $('#' + jstreeID).jstree("deselect_all", true);    // id是选中的节点id，然后后面的一个参数 true表示的是不触发默认select_node.change的事件 
  $('#' + jstreeID).jstree('select_node', id /* , true */ );
}
$(document).ready(function () {
  $.post("/getDirInfo", {
      dir: null
    },
    function (data, status) {
      $(function () {
        $('#' + jstreeID)
          .jstree({
            'core': {
              'data': data,
              // 'check_callback' : function (operation, node, node_parent, node_position, more) {
              'check_callback': function (o, n, p, i, m) {
                if (m && m.dnd && m.pos !== 'i') {
                  return false;
                }
                if (o === "move_node" || o === "copy_node") {
                  if (this.get_node(n).parent === this.get_node(p).id) {
                    return false;
                  }
                }
                return true;
              },
              'themes': {
                'responsive': false,
                'variant': 'small',
                'stripes': true,
                "icons" : true
              }
            },
            'sort': function (a, b) {
              return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 :
                -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
            },
            'contextmenu': {
              'items': function (node) {
                var tmp = $.jstree.defaults.contextmenu.items();
                delete tmp.create.action;
                tmp.create.label = "New";
                tmp.create.submenu = {
                  "create_folder": {
                    "separator_after": true,
                    "label": "Folder",
                    "action": function (data) {
                      var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                      inst.create_node(obj, {
                        type: "default"
                      }, "last", function (new_node) {
                        setTimeout(function () {
                          inst.edit(new_node);
                        }, 0);
                      });
                    }
                  },
                  "create_file": {
                    "label": "File",
                    "action": function (data) {
                      var inst = $.jstree.reference(data.reference),
                        obj = inst.get_node(data.reference);
                      inst.create_node(obj, {
                        type: "file"
                      }, "last", function (new_node) {
                        setTimeout(function () {
                          inst.edit(new_node);
                        }, 0);
                      });
                    }
                  }
                };
                if (this.get_type(node) === "file") {
                  delete tmp.create;
                }
                return tmp;
              }
            },
            'types': {
              'default': {
                'icon': 'folder'
              },
              'file': {
                'valid_children': [],
                'icon': 'file'
              }
            },
            'unique': {
              'duplicate': function (name, counter) {
                return name + ' ' + counter;
              }
            },
            'plugins': ['state', 'dnd', 'sort', 'types', 'contextmenu', 'unique']
          })
          .on('delete_node.jstree', function (e, data) {
            console.log("e=");
            console.table(e)
            console.log("delete_node.jstree data node=");
            console.table(data.node)
            console.log("delete_node.jstree data node text=");
            console.log(data.node.text)
            var parentsFileName=data.node["parents"].map((id)=>{
              return getNode(id).text
            })
            console.log("parentsFileName=")
            console.table(parentsFileName)
            parentsFileName.reverse();
            parentsFileName.shift();
            parentsFileName=parentsFileName.join('/')

            $.get('?operation=delete_node', {
                'id': data.node.id,
                'parentsFileName': parentsFileName,
                'text': data.node.text
              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('create_node.jstree', function (e, data) {
            console.log("create_node.jstree e=")
            console.table(e)
            console.log("create_node.jstree data=")
            console.table(data)
            //首先获取再那个文件上操作的
            var 操作的文件id=getNode(data.parent)
            var 操作的文件=getNode(操作的文件id)
            console.log("操作的文件=")
            console.table(操作的文件)
            window.aaa=操作的文件
            console.log("操作的文件['parents']=")
            console.table(操作的文件["parents"])

            var parentsFileName=(操作的文件["parents"]).map((id)=>{
              return getNode(id).text
            })
            parentsFileName.unshift(操作的文件.text)
            console.log("parentsFileName=")
            console.table(parentsFileName)
            parentsFileName.reverse();
            parentsFileName.shift();
            parentsFileName=parentsFileName.join('/')
            console.log("parentsFileName应当等于111111")
            console.log(parentsFileName)



            $.get('?operation=create_node', {
                'type': data.node.type,
                'id': data.node.parent,
                'text': data.node.text,
                'icon':data.node.icon,


                // 'id': data.node.id,
                // 'text': data.text,
                // 'parentFileName': parentFileName,
                'parentsFileName': parentsFileName,
                // 'oldFileName': oldFileName,








              })
              .done(function (d) {
                reloadTree()
                data.instance.set_id(data.node, d.id);

              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('rename_node.jstree', function (e, data) {
            console.log("e=");

            console.table(e)
            console.log("data=");
            console.table(data)
            var parentFileName=getNode(data.node.parent).text
            console.log("parentsFileName=")
            console.table(data.node["parents"])
            var parentsFileName=data.node["parents"].map((id)=>{
              return getNode(id).text
            })
            console.log("parentsFileName=")
            console.table(parentsFileName)
            parentsFileName.reverse();
            parentsFileName.shift();
            parentsFileName=parentsFileName.join('/')

            console.log("parentsFileName=")
            console.table(parentsFileName)
            var oldFileName=data.old
            console.table(oldFileName)
            // alert(oldFileName)
            $.get('?operation=rename_node', {
                'id': data.node.id,
                'text': data.text,
                'parentFileName': parentFileName,
                'parentsFileName': parentsFileName,
                'oldFileName': oldFileName,
                'icon':data.node.icon
              })
              .done(function (d) {
                data.instance.set_id(data.node, d.id);
                reloadTree()

              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('move_node.jstree', function (e, data) {
            console.log("move_node.jstree");
            console.log("e=");

            console.table(e)
            console.log("data=");
            console.table(data)
            var 从哪里来=data.old_parent
            var 到哪里去=data.node.parent
            var text=data.node.text
            从哪里来=getNode(从哪里来)
            到哪里去=getNode(到哪里去)
            console.log("从哪里来=");
            console.table(从哪里来)
            console.log("到哪里去=");
            console.table(到哪里去)
            var 原始id=data.node.id


            从哪里来=getPathFromNode(从哪里来)
            到哪里去=getPathFromNode(到哪里去)






            console.log("从哪里来=");
            console.log(从哪里来)
            console.log("到哪里去=");
            console.log(到哪里去)


            var fromWhere=从哪里来+"/"+text
            var toWhere=到哪里去



            $.get('?operation=move_node', {
                'id': 原始id,
                'parent': data.parent,
                'from':fromWhere,
                'to':toWhere
              })
              .done(function (d) {
                console.log('移动成功')
                //data.instance.load_node(data.parent);
                data.instance.refresh();
                reloadTree()
              })
              .fail(function () {
                console.log('移动失败')
                data.instance.refresh();
              });
          })
          .on('copy_node.jstree', function (e, data) {

            console.log("copy_node.jstree");
            console.log("e=");

            console.table(e)
            console.log("data=");
            console.table(data)
            $.get('?operation=copy_node', {
                'id': data.original.id,
                'parent': data.parent
              })
              .done(function (d) {
                //data.instance.load_node(data.parent);
                data.instance.refresh();
              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('select_node.jstree', function (event, data) {
            var ref = $('#' + jstreeID).jstree(true);
            var sel = ref.get_selected();
            var sltText = ref.get_text(sel);
            console.log(ref)
            console.log(sel)
            console.log(sltText)
            // $("a").attr('href',"http://www.bilibili.com");
            // $("#a1").text("B站");
            // $(".a2").text("你值得拥有");
            console.table(data)

            $("#script-name").text(data.node);
            console.table(data.node)
            $("#project-name").text('选中的文件的父目录='+getNode(data.node.parent).text+" id="+data.node.parent);
            $("#script-name").text('选中的文件='+data.node.text+" id="+data.node.id);
            var children=data.node.children
            var childrenName=''
            for(let i=0;i<children.length;i++){
              childrenName+="\n"+getNode(children[i]).text
            }

            $("#script-detail").text('选中的文件的子目录='+childrenName);
          })
      });
    });
});

function getNode(nodeID){
  var node = $('#' + jstreeID).jstree("get_node", nodeID);
  console.log("getNode(nodeID)  node=")
  console.table(node)
  return node
}
