function trans(){
    var first = [];
    var second = [];
    var third = [];
	var ajob = [];
	var dao_name=[];
	
    var dat = document.getElementById("tree").value;
	first = dat.split("\n\n\n");
	//console.log(first);
	
	for(var i = 0;i<first.length;i++)
	{
		var data=[];
		second = first[i].split("\n\n");
		//console.log(second);
		third=second[0].split("\n");
		for(var j = 0;j<third.length;j++)
		{
			ajob=third[j].split("：");
			var job = ajob[0];
			var name1 = ajob[1];
			//console.log(job);
			if(job=="导师")
			{
				dao_name.push(job);
				data.push({name:name1,value:"导师",sj:"-"});
				//console.log(data);
			}
			else
			{
				var childd = name1.split("、");
				//console.log(childd);
				data.push({name:job,value:job,sj:"导师"});
				
				for(var k=0;k<childd.length;k++)
				{
					data.push({name:childd[k],value:childd[k],sj:job});
				}
				
			}
		}
		for(var j = 1;j<second.length;j++)
		{
			var ajob1=second[j].split("：");
			var name11=ajob1[0];
			var jineng=ajob1[1].split("、");
			//console.log(ajob1);
			//console.log(name11);
			for(var k=0;k<jineng.length;k++)
			{
				data.push({name:jineng[k],value:jineng[k],sj:name11});
			}
		}
		//console.log(data);
		//console.log(job);
		
		var treeData ;
		var nname="";
		nname=i.toString()+"tree";
		//console.log(nname);
		treeData = transData(data, 'value', 'sj', 'children');
		drawTree(treeData,nname);
	}
	
}




 
/**2.数据处理成层级关系的数据***/ 
function transData(a, idStr, pidStr, childrenStr) {
	var r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = a.length;
	for (; i < len; i++) {
		hash[a[i][id]] = a[i];
	}
	for (; j < len; j++) {
		var aVal = a[j], hashVP = hash[aVal[pid]];
		if (hashVP) {
			!hashVP[children] && (hashVP[children] = []);
			hashVP[children].push(aVal);
		} else {
			r.push(aVal);
		}
	}
	return r;
}
 
/**
 *3. 画树
 */
function drawTree(treeData,nname="") {
	var  myChart = echarts.init(document.getElementById(nname));//div元素节点的对象
	myChart.setOption({
		tooltip : {
			trigger : 'item',
			triggerOn : 'mousemove'
		},
		series : [ {
			type : 'tree',
			name : 'TREE_ECHARTS',
			data : treeData,
			top : '2%',
			left : '10%',
			bottom : '2%',
			right : '15%',
			
			symbolSize : 12,
			label : {
				normal : {
					position : 'left',
					verticalAlign : 'middle',
					align : 'right'
				}
			},
			leaves : {
				label : {
					position : 'right',
					verticalAlign : 'middle',
					align : 'left'
				}
			},
			expandAndCollapse : true ,
			initialTreeDepth : 2  //展示层级数,默认是2
		} ]
	});
	
	
}




 
 
 