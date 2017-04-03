// for datatables 

$(function () {
        $('#example2').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": true,
          "autoWidth": false
        });
      });


for(i=0; i < data.length; i++) {
    	qElement = i + 1 +"." + data[i].question + "<br /><ul>";
    	for(j=0; j < data[i].choice.length; j++) {
    		qElement += "<li>" + data[i].choice[j] + "</li>";
    	}
       qElement +="</ul><hr />";
       document.write(qElement);
    }

     //$("#quiz").append(qElement);
     //console.log(data[0].choice[0]);