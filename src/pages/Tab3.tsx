
//import { Plugins } from '@capacitor/core';
import React, { useState }  from 'react';
import {  useIonViewWillEnter, IonListHeader, IonRadioGroup,IonRadio, IonRow, IonCol, IonAlert, IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';


import './Tab3.css';

//const { Storage } = Plugins;
const Tab3: React.FC = () =>  {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [nodetype, setNodetype] = useState('privatesharednode');
  const [password, setPassword] = useState('');
  const [loginmessage, setLoginmessage] = useState('Place for login message');
  const [loginalert, setLoginalert] = useState('');
  const [nodemessage, setNodemessage] = useState('Place for node message');
  const [statvalue, setStatvalue] = useState(0);
  const [listvalue, setListvalue] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);



  //const [filehash, setFilehash] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState('');

   const serverurl = "http://157.245.63.46:8080";
//   const serverurl = "http://157.245.63.46:1337";

  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


 // const [orbitdb, setOrbit] = useState();

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    var tmptoken = localStorage.getItem("token");
    var userinfo = localStorage.getItem('userinfo') as any;

    if(userinfo != null )
    {
	setUsername(userinfo.username);
	setEmail(userinfo.email);
    }


    if(tmptoken == null)
    {
      setLoginalert("Login to proceed");
      setShowLoginAlert(true);
      return;
    }

    logintest();

    getconfig();

    var tmpipfs = localStorage.getItem("ipfsconfig");

    if(tmpipfs == null)
     {
      setLoginalert("Config not created");
      setShowLoginAlert(true);
      return;
     }

   });


  const mylogin = async () => {
  var url = serverurl + "/api/auth/login";
  var cred = {
	email: email,
	username: username,
	role: 'user',
        password: password
   };
  fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",              
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         localStorage.setItem('token', res.token);
         localStorage.setItem('userinfo', res.user);
         setLoginmessage(JSON.stringify(res));
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

  const logintest = async () => {
  var url = serverurl + "/api/auth/protected";

  fetch(url,
   {
      method: 'GET',
      headers: {
//        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token"),
      }
    })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         localStorage.setItem('userinfo', res.user);
         setLoginmessage(JSON.stringify(res));
         return 0;
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
         return -1;
        }
      )
  } 
  const myregister = async () => {
  var url = serverurl + "/api/auth/register";
   var cred = {
        email: email,
	username: username,
	role: 'user',
        password: password
   };
  fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         localStorage.setItem('token', res.token);
         setLoginmessage(JSON.stringify(res));
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

  const stopnode = async () => {
  var url = serverurl + "/api/ipfsnode/stopnode";
   var cred = {
	userid: username,
   };
  fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "" + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         setNodemessage(JSON.stringify(res));
           
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

  const startnode = async () => {
  var url = serverurl + "/api/ipfsnode/startnode";
   var cred = {
	userid: username
   };
  fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("token"),
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         setNodemessage(JSON.stringify(res));
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

/*
  const saveinserver = async ( x ) => {

   var url = serverurl + "/api/ipfsusage/savefile";

   var cred = {
        userid: 'user1',
        name: x.name,
        path: x.path,
        hash: x.hash, 
        cid: x.cid, 
   };

  fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("token"),
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
        },
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  }

*/
  const getconfig = async () => {
  var url = serverurl + "/api/ipfsnode/getipfsconfig";
   var cred = {
	userid: username,
	nodetype: nodetype
   };
  fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("token"),
            },
            body: JSON.stringify(cred)
     })
      .then(res => res.json())
      .then(
        (res) => {
         console.log(res);
         localStorage.setItem("ipfsconfig", JSON.stringify(res) );
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

/*
 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

      saveToIpfsWithFilename(event.target.files)

  };
*/

/*
const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]
    const options = {
    create: true
    }

      await Storage.set({ key: 'user', value: 'user1' });
    var source = await ipfs.files.write('/user1/contents/'+file.name, file, options)
        console.log(source)
        source = ipfs.files.ls('/user1/contents/'+file.name, options);
         var file1 = await source.next();
	  console.log( file1.value.cid.toString() )
        
        setFilehash('/user1/contents/'+ file.name);
        var x = {
	  hash: file1.value.cid.toString(),
	  name: file.name,
	  cid: file1.value.cid.toString(),
	  path: '/user1/contents/'
        };
        saveinserver(x);
  };

*/

  const listfiles = async () => {
    var options = {};
 var source = ipfs.files.ls('/user1/contents/', options)
     var arraylength = 0;
    try {
      for await (const file of source) {
        console.log(file)
        arraylength ++;
      }
    } catch (err) {
         setError(err);
         setShowErrorAlert(true);
      console.error(err)
    }
        setListvalue(arraylength);

  };


  const liststat = async () => {
    var options = {};
    var source = await ipfs.files.stat('/user1/contents/', options)
        console.log(source)
        setStatvalue(source.cumulativeSize);

  };

/*
 const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
 };
*/
  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin panel </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Login, connect  </IonTitle>
          </IonToolbar>
        </IonHeader>

    <IonList>
          <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>


        <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => setEmail(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>
       <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>
   <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={mylogin}> Login </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={myregister}> Register </IonButton>
            </IonCol>
          </IonRow>



            <IonItem>
               <IonLabel>
               {loginmessage}
               </IonLabel>
            </IonItem>
            <IonItem>
            <IonButton onClick={logintest}> Test Login </IonButton>
            </IonItem>
            <IonItem>
            <IonButton onClick={startnode}> startnode </IonButton>
            <IonButton onClick={stopnode}> stopnode </IonButton>
            <IonButton onClick={getconfig}> getconfig </IonButton>
            </IonItem>
            <IonItem>
               <IonLabel>
               {nodemessage}
               </IonLabel>
            </IonItem>

            <IonItem >
            <IonButton onClick={listfiles}> Number of files </IonButton>
            <IonLabel slot="end" >  {listvalue} </IonLabel>
            </IonItem>
            <IonItem >
            <IonButton onClick={liststat}> Size usage (bytes) </IonButton>
            <IonLabel slot="end" >  {statvalue} </IonLabel>
            </IonItem>

           <IonRadioGroup value={nodetype}   onIonChange={e => setNodetype(e.detail.value!)} >
        <IonListHeader>
          <IonLabel>Usage type</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Private node </IonLabel>
          <IonRadio slot="start" value="privatenode" />
        </IonItem>

        <IonItem>
          <IonLabel>Private shared node </IonLabel>
          <IonRadio slot="start" value="privatesharednode" />
        </IonItem>

        <IonItem>
          <IonLabel>Public shared node</IonLabel>
          <IonRadio slot="start" value="publicsharednode" />
        </IonItem>

        <IonItem>
          <IonLabel>Cluster node</IonLabel>
          <IonRadio slot="start" value="clusternode" />
        </IonItem>
       </IonRadioGroup>

    </IonList>
    <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header={'Alert'}
          subHeader={'Error'}
          message={error}
          buttons={['OK']}
        />

     <IonAlert
          isOpen={showLoginAlert}
          onDidDismiss={() => setShowLoginAlert(false)}
          header={'Instruction'}
          subHeader={'Login '}
          message={loginalert}
          buttons={['OK']}
        />
   

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
