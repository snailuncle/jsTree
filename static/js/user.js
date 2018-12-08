var jstreeID = 'jstree';
    // $('#jstree_demo_div').on("changed.jstree", function (e, data) {
    //   console.log(data.selected);
    // });
    // $('button').on('click', function () {
    //   $('#jstree').jstree(true).select_node('child_node_1');
    //   $('#jstree').jstree('select_node', 'child_node_1');
    //   $.jstree.reference('#jstree').select_node('child_node_1');
    // });
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
            $.get('?operation=delete_node', {
                'id': data.node.id
              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('create_node.jstree', function (e, data) {
            console.log("e=")
            console.log(e)
            console.log("data=")
            console.log(data)
            $.get('?operation=create_node', {
                'type': data.node.type,
                'id': data.node.parent,
                'text': data.node.text
              })
              .done(function (d) {
                data.instance.set_id(data.node, d.id);
              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('rename_node.jstree', function (e, data) {
            $.get('?operation=rename_node', {
                'id': data.node.id,
                'text': data.text
              })
              .done(function (d) {
                data.instance.set_id(data.node, d.id);
              })
              .fail(function () {
                data.instance.refresh();
              });
          })
          .on('move_node.jstree', function (e, data) {
            $.get('?operation=move_node', {
                'id': data.node.id,
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
          .on('copy_node.jstree', function (e, data) {
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
            $("#project-name").text(sltText);
            $("#script-name").text(sltText);
            $("#script-detail").text(sltText);
          })
      });
    });
});


