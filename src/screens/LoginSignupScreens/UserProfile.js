import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { firebase } from '../../../FireBase/FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnin, navbtnout, colors, btn2 } from '../../globals/style';

const UserProfile = ({navigation}) => {

 const [userloggeduid, setUserloggeduid] = useState(null);
 const [userdata, setuserdata] = useState(null);
  
    useEffect(() => {
      const checklogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUserloggeduid(user.uid);
          } else {
            setUserloggeduid(null);
            //navigation.navigate('Home')
          }
        });
      };
      checklogin();
    }, []);
  
  //console.log(userlogged?.uid);
  const getuserdata = async  () => {
    const docRef = firebase.firestore().collection('UserData').where('uid','==',userloggeduid)
    const doc = await docRef.get();
    if(!doc.empty){
      doc.forEach((doc)=>{
        //console.log(doc.data())
        setuserdata(doc.data())
      })
    }
    else{
      //navigation.navigate('Login')
      console.log('no such document')
    }
  }

  useEffect(()=>{
    getuserdata();
  },[userloggeduid])
  //console.log(userdata)

  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState('');
  const [newaddress , setNewAddress] = useState(''); 

  const updateuser = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid','==',userloggeduid)
    const doc = await docRef.get();
    if(!doc.empty){
      if(newname !== ''){
        doc.forEach((doc)=>{
          doc.ref.update({
            name:newname
          })
        })
      }
      if(newaddress !== ''){
        doc.forEach((doc)=>{
          doc.ref.update({
            address:newaddress
          })
        })
      }
      alert('Your Data has been updated')
      getuserdata();
      setEdit(false)
      setPasswordEdit(false);
    }
    else{
      alert('system error')
    }
  }

  const [passwordedit,setPasswordEdit] = useState(false);
  const [oldpassword,setOldPassword] = useState('');
  const [newpassword,setNewPassword] = useState('')

  const  updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, oldpassword
      );
      return user.reauthenticateWithCredential(cred);
    }
    let docRef = firebase.firestore().collection('UserData').where('uid','==',userloggeduid)
    let doc = await docRef.get(); 
    reauthenticate(oldpassword).then(()=>{
      var user = firebase.auth().currentUser;
      user.updatePassword(newpassword).then(()=>{
        if(!doc.empty){
          doc.forEach((doc)=>{
            doc.ref.update({
              password:newpassword
            })
          })
          alert('Your password has been updated')
        }
      })
    }).catch((error)=>{
      alert('Server Issue')
    })
    .catch((error)=>{
      alert('Invalid Password')
    })
    setPasswordEdit(false);
  }

 const logoutuser = async () => {
  firebase.auth().signOut().then(()=>{
    alert('You are Logged Out.');
    navigation.navigate('Welcome');
  }).catch((error)=>{
    alert('System Error')
  })
 }

  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name='back' size={24} color='black' style={navbtnin}/>
        </View>
      </TouchableOpacity>

      {edit == false && passwordedit == false &&
       <View style={styles.container}>
        <Text style={styles.head1}>Your Profile</Text>
        <View style={styles.containerin}>
          <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2in}>
            {userdata.name} 
            </Text> : 'loading'}</Text>

            <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2in}>
            {userdata.email} 
            </Text> : 'loading'}</Text>

            <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2in}>
            {userdata.address} 
            </Text> : 'loading'}</Text>
        




        </View>

        <TouchableOpacity onPress={()=>{
          setEdit(!edit)
        }}>
          <View style={btn2}>
            <Text style={styles.btntext}>Edit Details</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          setPasswordEdit(!passwordedit)
        }}>
          <View style={styles.btnout}>
            <Text style={styles.btntext}>Change Password</Text>
          </View>

        </TouchableOpacity>


        <TouchableOpacity onPress={()=>logoutuser()}>
          <View style={btn2}>
            <Text style={styles.btntext}>Logout</Text>
          </View>
        </TouchableOpacity>


      </View>}

      {edit == true &&

        <View style={styles.container}>
          <Text style={styles.head1}>Edit Profile</Text>
          <TextInput style={styles.input} placeholder='Name' onChangeText={(e)=>setNewName(e)}/>
          <TextInput style={styles.input} placeholder='Address' onChangeText={(e)=>setNewAddress(e)}/>
          
          <TouchableOpacity onPress={()=>updateuser()}>
            <View style={btn2}>
              <Text style={styles.btntext}>Submit</Text>
            </View>
          </TouchableOpacity>


        </View>
      
      
      }

      {passwordedit == true &&
      
        <View style={styles.container}>
          <Text style={styles.head1}>Change Your Password</Text>
          <View style={styles.containerin}>
          <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e)=>setOldPassword(e)}/>
          <TextInput style={styles.input} placeholder='New Password' onChangeText={(e)=>setNewPassword(e)}/>
          </View>
          <TouchableOpacity onPress={()=>updatepassword()}>
            <View style={btn2}>
              <Text style={styles.btntext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      
      }








    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  containerout: {
    flex:1,
    backgroundColor:"#fff",
    width:"100%"
  },
  container: {
    flex:1,
    backgroundColor:"#fff",
    width:"100%",
    alignItems:"center"
  },
  head1:{
    fontSize:40,
    fontWeight:"200",
    marginVertical:20,
    color:colors.text1
  },
  containerin:{
    width:"90%",
    alignItems:"center",
    borderColor:colors.text1,
    borderWidth:1,
    borderRadius:10,
    marginTop:20,
    padding:20
  },
  head2:{
    fontSize:17,
    fontWeight:"200",
    marginTop:10
  },
  head2in:{
    fontSize:17,
    fontWeight:"300"
  },
  btntext:{
    fontSize:20,
    fontWeight:"400",
    color:"white",
    textAlign:"center",
    padding:10
  },
  input:{
    width:"90%",
    marginVertical:10,
    borderRadius:10,
    backgroundColor:colors.col1,
    paddingHorizontal:10,
    paddingVertical:10,
    elevation:20
  },
  inputout:{
    flexDirection:"row",
    width:"100%",
    marginVertical:10,
    backgroundColor:colors.col1,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:10,
    elevation:20
  },
  btnout:{
    borderRadius:10,
    backgroundColor:colors.text1
  },
})