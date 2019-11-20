var ref1 = firebase.database().ref('Attendance');
var ref2 = firebase.database().ref('Users');
var temp4 = firebase.database().ref('Temp4');
var ob = {}; var count = 0;
temp4.remove();
function displayModal(){
    var names ="";var arr=["attendance"];var arr1=["x"];
    var id=document.getElementById('yearly');
    temp4.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            child.forEach(function(mychild){
                names += "<p>"+mychild.key + "----" + mychild.val()+"</p>";
                arr.push(mychild.val());
                arr1.push(mychild.key);
            });
        });
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
                        temp4.remove();
    });
}
ref2.once("value").then(function(snapshot){
    snapshot.forEach(function(child){
        count++;
    });
    ref1.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
           
                var p = child.val().Present.split(" ");
                var d = child.val().Date.split("-");
                var year = d[0];
                if (year in ob)
                    ob[year] += " " + ((p.length)/count)*100;
                else
                    ob[year] = " "+((p.length)/count)*100;
        });
        var k = temp4.push().key;
        temp4.child(k).set(ob);
        ob = {};
        temp4.once('value').then(function(snapshot){
            snapshot.forEach(function(child){
                child.forEach(function(mychild){
                    var arr = mychild.val().split(" ");
                    //console.log(mychild.val().split(" "));
                    var sum=0;
                    for(var i=0;i<arr.length;i++){
                        if(arr[i]!=""){
                            //console.log(sum);
                            sum = sum + parseFloat(arr[i]);
                            //console.log(sum);
                        }
                    }
                    
                    ob[mychild.key]=sum/(arr.length-1);
                    //console.log(ob);
                    
                });
                temp4.child(child.key).set(ob);
            });
            displayModal();
        });
    });
});
