
var result1 = null;


function loaddylist(a) {

	var url = "http://localhost:8081/Crm_06/dylist.do?index=" + a;
	var size = $("#size").val();

	
	var dytype=$("#dytype").val();
	var dykey=$("#dykey").val();
	var dyvalue=$("#dyvalue").val();
	
	
	
	var index = (a - 1) * 10;
	var data = {
		"index" : index,
		"size" : size,
		"dytype":dytype,
		"dykey":dykey,
		"dyvalue":dyvalue
			};
	$.post(    url,
					data,
					function(result) {
						if (result != null) {
							result1 = result;
							var tbody = $("<tbody id='tbody'></tbody>")

							var dylist = result.dylist;
							/* $(".query_form_table").append(th); */
							for (var i = 0; i < dylist.length; i++) {
								var aaa = "";

								aaa += "<tr><td>" + dylist[i].dyid + "</td>"
										+ "<td>" + dylist[i].dytype + "</td>"
										+ "<td>" + dylist[i].dykey + "</td>"
										+ "<td>" + dylist[i].dyvalue + "</td>"
										+ "<td>" + dylist[i].isedit + "</td>";
								if (dylist[i].isedit == "是") {
									aaa += "<td class='list_data_op'>"
											+ "<img onclick='to1("
											+ dylist[i].dyid
											+ ");'   title='编辑'  src='../images/bt_edit.gif '   class='op_button' />"
											+ " <img id='del"
											+ dylist[i].dyid
											+ "' onclick='del1("
											+ dylist[i].dyid
											+ ")'   alt='"
											+ dylist[i].dytype
											+ "-"
											+ dylist[i].dyvalue
											+ "'    title='删除'     src='../images/bt_del.gif'  class='op_button'  />"
											+ "</td></tr>";
								} else {
									aaa += "<td></td></tr>";
								}
								/* $("#s1").remove(); */
								tbody.append(aaa);
								$(".query_form_table_tr1").after(tbody);
							}
						}

						$("#count").text(result.count);
						$("#page").text(result.page);
						$("#index").val(result.index);
					}, "json");

	// pager

}

function to1(a) {

	window.location.href("dict_edit.html?dyid=" + a);

}

function del1(a) {

	var urla = window.location.href;
	var index = result1.index;

	var aaa = $("#del" + a).attr("alt");
	var msg = "确认删除  " + aaa + " 吗?";
	if (confirm(msg)) {// 确定
		var url = "http://localhost:8081/Crm_06/deldy.do";
		var data = {
			"dyid" : a
		};
		$.post(url, data, function(result) {
			if (result == 1) {
				$("#tbody").remove();
				loaddylist(index);

			} else {

				alert("删除失败")
			}

		}, "json");

	}

}

function to2() {
	var href = window.location.href;
	var dyid = href.substring(href.indexOf("=") + 1);
	var url = "http://localhost:8081/Crm_06/onedy.do";
	var data = {
		"dyid" : dyid
	};
	var i = 0;
	$.post(url, data, function(result) {

		$("#dyid").text(result.dyid);
		$("#dytype").val(result.dytype);
		$("#dykey").val(result.dykey);
		$("#dyvalue").val(result.dyvalue);

	}, "json");

}

function tiao(a) {
	
	var urla = window.location.href;
	var index = result1.index;
	var page = $("#page").text();
	$("#tbody").remove();

	if (a == 1) {// 首页
		loaddylist(a)
	} else if (a == 2) { // 上一页
		if (index > 1) {

			loaddylist(index - 1)
		} else {
			loaddylist(1)
		}
	} else if (a == 3) { // 下一页
		if (index < page) {

			loaddylist(index + 1)
		} else {
			loaddylist(page)
		}
	} else if (a == 4) { // 尾页

		loaddylist(page)
	}else if (a == 5) { // 尾页

		var zd = $("#zd").val()-0<=page?$("#zd").val():page;
		
			loaddylist(zd)
			
	}

}


function chaxun() {
	
	var a = result1.index;
	$("#tbody").remove();
	loaddylist(a);
	
}
function toadd() {
	
	window.location.href("dict_add.html");
	
}
