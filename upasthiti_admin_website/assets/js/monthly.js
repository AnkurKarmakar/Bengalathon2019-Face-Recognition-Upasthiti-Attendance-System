var s = "",date = "";
firebase.database().ref('Temp').remove();
firebase.database().ref('Temp2').remove();
firebase.database().ref('Temp3').remove();
function getPercent(s,date){
    var date_array=date.split("-");
    var arr = s.split(" ");
    var n = arr.length;
    var users = firebase.database().ref('Users');
    var temp=firebase.database().ref('Temp');
    var count = 0;
    users.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            count++;
        });
        var k=data.push().key;
        temp.child(k).set({
            Date : date,
            Attendance : ((n/count)*100)
        });
    });
}
function findAverage(){
    var temp2 = firebase.database().ref("Temp2");
    var months = {"01":"January","02":"February","03":"March","04":"April","05":"May","06": "June","07": "July","08": "August","09": "September", "10":"October", "11":"November", "12":"December"};
    temp2.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            child.forEach(function(mychild){
                //console.log(mychild.val());
                
                var arr = mychild.val().trim().split(" ");
                var sum=0;
                //console.log(arr,arr.length,sum);
                for(var i=0;i<arr.length;i++)
                {
                    sum+=parseInt(arr[i]);
                    //console.log(sum);
                }    

                sum = sum / arr.length;
                //console.log(key2,sum);
                var temp3 = firebase.database().ref("Temp3");
                var k = temp3.push().key;var key2 = mychild.key;;
                var ob = {};
                //if(key2 == "01") key2=1;
                ob[months[key2]] = sum;
                temp3.child(k).set(ob);
            });
        });
    });
}
function displayModal(){
    var temp3 = firebase.database().ref("Temp3");
    var names = "<p>Month----Attendance %</p>";
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var id = document.getElementById("report");
    var arr=["attendance"];var arr1=["x"];
    temp3.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            child.forEach(function(mychild){
                names += "<p>"+mychild.key + "----" + mychild.val()+"</p>";
                arr.push(mychild.val());
                arr1.push(mychild.key);
            });
        });
        //console.log(arr,arr1);
        var chart = bb.generate({
            data: {
              x: "x",
              columns: [
              arr1,
              arr
              ],
              type: "bar"
            },
            axis: {
              x: {
                type: "category"
              }
            },
            bindto: "#chart"
          });
        chart.resize({
            width: 400,
            height: 400
         });
                        id.innerHTML += names;
                    modal.style.display = "block";
                    
                    span.onclick = function() {
                        modal.style.display = "none";
                        firebase.database().ref('Temp').remove();
                        firebase.database().ref('Temp2').remove();
                        temp3.remove();
                        location.reload();                 
                      }
                      
                      // When the user clicks anywhere outside of the modal, close it
                      window.onclick = function(event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                          firebase.database().ref('Temp').remove();
                          firebase.database().ref('Temp2').remove();
                          temp3.remove();
                          location.reload();
                          
                        }}
    });
    
}
function getAttendance()
{
    var array={};
    var data=firebase.database().ref('Attendance');
    var data1=firebase.database().ref('Temp');
    var data2=firebase.database().ref('Temp2');
    var year=document.getElementById("monthly");
    var e = document.getElementById("year");
    var selected = e.options[e.selectedIndex].text;
    data.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            var arr = child.val().Date.split("-");
            if(selected == arr[0]){
                getPercent(child.val().Present,child.val().Date);
            }
        });
        data1.once("value").then(function(snapshot){
            
            snapshot.forEach(function(child){
                if((child.val().Date.split("-"))[1] in array)    
                    array[(child.val().Date.split("-"))[1]]+=" "+child.val().Attendance;
                else    
                    array[(child.val().Date.split("-"))[1]]=" "+child.val().Attendance;
            });
            var k = data2.push().key;
            data2.child(k).set(array);
            findAverage();
            displayModal();
        });
    });
}