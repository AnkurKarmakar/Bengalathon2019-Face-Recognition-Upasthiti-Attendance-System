var data=firebase.database().ref('Attendance');
var users=firebase.database().ref('Users');



function getAttendance(){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var d=document.getElementById("date");
    var names="";var count1=0,count2 = 0;
    //names[0]="Ankur";
    //console.log(d.value);
    var date=moment(d.value);
    //console.log(date);
    data.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            //console.log(child.val().Date,d.value);
            if(child.val().Date==(d.value)){
                var arr=child.val().Present.split(" ");
                count2=arr.length;
                //names=arr.length*[""];
                //names=child.val().Present.split(" ");
                //console.log(arr);
                count1=0;
                    users.once("value").then(function(snapshot){
                        var a=0;
                        snapshot.forEach(function(child){
                            count1++;
                            //console.log(child.val().UID,parseInt(arr[i]),i);
                            if(arr.includes(child.val().UID.toString())){
                                //console.log(child.val().UID);
                                //console.log(child.val().UID+") "+child.val().Name+" ( Adhaar="+child.val().Adhaar+" )");
                                names += "<p>"+child.val().UID+") "+child.val().Name+" ( Adhaar="+child.val().Adhaar+" )"+"</p>";
                            }
                        });
                        //console.log(names);
                        bb.generate({
                            data: {
                                columns: [
                                    ["present", count2],
                                    ["absent", count1-count2]
                                ],
                                type: "pie"
                            },
                            bindto: "#chart"
                        });
                        var id = document.getElementById("report");
                        id.innerHTML += names;
                    modal.style.display = "block";
                    span.onclick = function() {
                        modal.style.display = "none";
                        location.reload();                 
                      }
                      
                      // When the user clicks anywhere outside of the modal, close it
                      window.onclick = function(event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                          location.reload();
                          
                        }}
                    });
                
                
                //console.log(names,names.length,arr.length);
                //console.log(arr[0],names[0]);
                //console.log(names);
                    
                  // When the user clicks on <span> (x), close the modal

            }
          
        });
    });
}
