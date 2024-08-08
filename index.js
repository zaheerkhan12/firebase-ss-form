const Signup = async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
 
    try {
       const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
       await result.user.updateProfile({
          displayName: "User"
       })
 
 
       craeteusercollection(result.user)
       await result.user.sendEmailVerification()
       console.log(result);
       alert(`wellcom ${result.user.email}`)
 
 
 
    } catch (error) {
       console.log(error)
       alert(error.message)
 
    }
    email.value = ""
    email.password = ""
 }
 
 
 const Login = async (e) => {
    e.preventDefault()
    const email = document.getElementById("Login-email").value;
    const password = document.getElementById("Login-password").value;
    // console.log(email, password);
 
    try {
       const result = await firebase.auth().signInWithEmailAndPassword(email, password)
       console.log(result);
       alert(`user is successfully login ${result.user.email}`)
    } catch (error) {
       console.log(error);
       alert("valid_password")
 
    }
 
 }
 
 
 const Logout = async () => {
    firebase.auth().signOut()
 
    await firebase.auth().onAuthStateChanged((user) => {
       if (user) {
          getuserinfoRealtime(user.uid)
          console.log(user);
       } else {
    
          console.log(`user successfully Logout`);
          alert(`user successfully Logout`)
          getuserinfoRealtime(null)
       }
    });
 }
 
 
 
 // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
 //    if (user) {
 //      /// new used 
 //      //getuserinfo(user.uid)
 //      getuserinfoRealtime(user.uid)
 //    console.log(user)
 //    } else {
 //      console.log("Signout user successfully")
 //      alert("Signout user successfully")
 //      // getuserinfo(null)
 //      getuserinfoRealtime(null)
 //    }
 //  });
 
 
 // async function google() {
 //    console.log("hello");
 //    try {
 //       var provider = new firebase.auth.GoogleAuthProvider();
 //       const result = await firebase
 //    }
 // }