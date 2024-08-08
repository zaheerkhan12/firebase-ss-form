const userDetail = document.querySelector("#userdetails")
const editsprofile = document.getElementById("editsprofile");
function craeteusercollection(user){
   firebase.firestore().collection("users") 
   .doc(user.uid)
   .set({
   uid:user.uid,
   name:user.displayName,
   email:user.email,
   phone:"",
   speciality:"",
   portfolioUrl:"",
   gender: ""
   })
   }

  async  function getuserinfoRealtime(userID){
if (userID ) {
   const userDocRef = await firebase.firestore()
   .collection("users")
   .doc(userID)

   userDocRef.onSnapshot((doc)=>{
      if(doc.exists){
         const userinfo = doc.data();
         if (userinfo) {
            userDetail.innerHTML = `
            <h3>${userinfo.name}</h3>
            <h3>${userinfo.email}</h3>
            <h3>${userinfo.phone}</h3>
            <h3>${userinfo.speciality}</h3>
            <h3>${userinfo.portfolioUrl}</h3>
            <h3>${userinfo.gender}</h3>
            `
          editsprofile["name"].value = userinfo.name
             editsprofile["email"].value = userinfo.email
          editsprofile["phone"].value = userinfo.phone
             editsprofile["speciality"].value = userinfo.speciality
              editsprofile["portfolioUrl"].value = userinfo.portfolioUrl
              editsprofile["gender"].value = userinfo.gender

              if(firebase.auth().currentUser.photoURL){
               document.querySelector("#propic").src = firebase.auth().currentUser.photoURL
            }
         }
      }
   })
 
   }else{
      userDetail.innerHTML = `
      <h3>please login</h3>

      `
   }
}

function userupdate(e) {
   e.preventDefault()
 const userDocRef = firebase.firestore()
   .collection("users")
   .doc(firebase.auth().currentUser.uid)

   userDocRef.update({
      name:editsprofile["name"].value,
      email:editsprofile["email"].value,
      phone:editsprofile["phone"].value,
      speciality:editsprofile["speciality"].value,
      portfolioUrl:editsprofile["portfolioUrl"].value,
      gender:editsprofile["gender"].value

   })

}

function uploadimg (e){
   // console.log(e.target.files);
   const uid = firebase.auth().currentUser.uid;
   const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`);
   const uploadTask = fileRef.put(e.target.files[0])

   uploadTask.on('state_changed', 
       (snapshot) => {

         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         if(progress=='100')alert("uploaded pic")

       }, 
       (error) => {
         console.log(error);
       }, 
       () => {

         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
           console.log('File available at', downloadURL);
           firebase.auth().currentUser.updateProfile({
               photoURL: downloadURL
             })
         });
       }
     );
}