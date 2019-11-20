
function send()
{
    var data=firebase.database().ref('Users');
    const ref = firebase.storage().ref();
    var k=data.push().key;
    var name=document.getElementById("name");
    var adhaar=document.getElementById("adhaar");
    const file = document.querySelector('#image').files[0];
      const  fileType = file['type'];
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
if (!validImageTypes.includes(fileType)) {
    // invalid file type code goes here.
    alert("Please upload jpeg, png and gif file types")
}
else{
    
    data.once("value").then(function(snapshot){
        var flag=0; var max = 0;
        snapshot.forEach(function(child){
            if(child.val().UID>max)
                max = child.val().UID;
            if(child.val().Adhaar==adhaar.value){
                flag=1;
                alert("User already in database! ");
            }
        });
        if(flag == 0)
        {
            data.child(k).set({
                Name: name.value,
                Adhaar: adhaar.value,
                UID: max+1,
                flag: ""
            });
        }
        var upload = ref.child((max+1)+'.jpg');
    
    const metadata = {
        contentType: file.type
      };
      const task = upload.put(file, metadata);
        task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url) => {
    console.log(url);
    document.querySelector('#image').src = url;
    alert("Submitted");
    document.getElementById("reused_form").reset(); 
    location.reload(true);
  })
  .catch(console.error);

     });
}
      
    

}
