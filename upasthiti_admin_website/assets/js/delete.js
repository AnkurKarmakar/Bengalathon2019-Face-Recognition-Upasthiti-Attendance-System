var data=firebase.database().ref('Users');
const ref = firebase.storage().ref();
data.once("value").then(function(snapshot){
    var x = document.getElementById("dropdown");
    snapshot.forEach(function(child){
        var option = document.createElement("option");
        option.text=child.val().Name;
        x.add(option);
    });
});
function remove()
{
    var e = document.getElementById("dropdown");
    var selected = e.options[e.selectedIndex].text;
    var uid;
    data.once("value").then(function(snapshot){
        snapshot.forEach(function(child){
            if(child.val().Name == selected){
                var key = child.key;
                uid=child.val().UID;
                data.child(key).remove();
            }
        });
        var Ref = ref.child(uid+'.jpg');
        Ref.delete().then(function() {
            // File deleted successfully
            alert("deleted");
        location.reload(true);
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          });
        
        
    });
}