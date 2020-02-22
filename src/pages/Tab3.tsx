
//import { Plugins } from '@capacitor/core';
import React, { useState }  from 'react';
import { IonAlert, IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';


import './Tab3.css';

//const { Storage } = Plugins;
const Tab3: React.FC = () =>  {
  const [username, setUsername] = useState('');
  //const [filehash, setFilehash] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState('');

  const listnamevalue = '';
  const liststatvalue = '';
  // const serverurl = "http://157.245.63.46:8080";
   const serverurl = "http://157.245.63.46:1337";

  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


 // const [orbitdb, setOrbit] = useState();


  const mylogin = async () => {
  var url = serverurl + "/api/auth/login";
  var cred = {
	email: 'a@b.com',
	role: 'creator',
        password: 'welcome123'	
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
        },      
        (err) => {
         setError(err);
         setShowErrorAlert(true);
          console.log(err)
        }
      )
  } 

  const mytest = async () => {
  var url = serverurl + "/api/auth/protected";

  fetch(url,
   {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token"),
      }
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
  const myregister = async () => {
  var url = serverurl + "/api/auth/register";
   var cred = {
        email: 'a@b.com',
	role: 'creator',
        password: 'welcome123'
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
	userid: 'user1',
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
	userid: 'user1',
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
	userid: 'user1',
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
    try {
      for await (const file of source) {
        console.log(file)
      }
    } catch (err) {
         setError(err);
         setShowErrorAlert(true);
      console.error(err)
    }

  };


  const liststat = async () => {
    var options = {};
    var source = await ipfs.files.stat('/user1/contents/', options)
        console.log(source)

  };



  


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
            <IonButton onClick={mylogin}> mylogin </IonButton>
            <IonButton onClick={myregister}> register </IonButton>
            <IonButton onClick={mytest}> test </IonButton>
            </IonItem>
            <IonItem>
            <IonButton onClick={startnode}> startnode </IonButton>
            <IonButton onClick={stopnode}> stopnode </IonButton>
            <IonButton onClick={getconfig}> getconfig </IonButton>
            </IonItem>

            <IonItem >
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>
            <IonItem >
              <IonInput name="listname" type="text" placeholder="List" value={listnamevalue} spellCheck={false} autocapitalize="off" >
            <IonButton onClick={listfiles}> List </IonButton>
              </IonInput>
            </IonItem>
            <IonItem >
              <IonInput name="liststat" type="text" placeholder="Stat" value={liststatvalue} spellCheck={false} autocapitalize="off" >
            <IonButton onClick={liststat}> Stat </IonButton>
              </IonInput>
            </IonItem>


    </IonList>
    <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header={'Alert'}
          subHeader={'Error'}
          message={error}
          buttons={['OK']}
        />

   

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
