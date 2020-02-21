
import { Plugins } from '@capacitor/core';
import React, { useState }  from 'react';
import { IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';
//import OrbitDB from 'orbit-db';
//import ExploreContainer from '../components/ExploreContainer';


import './Tab3.css';

const { Storage } = Plugins;
const Tab3: React.FC = () =>  {
  const [username, setUsername] = useState('');
  const [filehash, setFilehash] = useState('');
//
//  const [keepfile, setKeepfile] = useState('');
//  const [password, setPassword] = useState('');
  const listnamevalue = '';
  const liststatvalue = '';
  const serverurl = "http://157.245.63.46:8080";
  // const serverurl = "http://157.245.63.46:1337";

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
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
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
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
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
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
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
//         localStorage.setItem('ipfsconfig', res.token);
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
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
//         localStorage.setItem('ipfsconfig', res.token);
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
          console.log(err)
        }
      )
  } 


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
//         localStorage.setItem('ipfsconfig', res.token);
/*
          this.setState({
            tags: res.tags
          });
*/
        },
        (err) => {
          console.log(err)
        }
      )
  }


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
//         localStorage.setItem('ipfsconfig', res.token);
/*
          this.setState({          
            tags: res.tags
          });
*/
        },      
        (err) => {
          console.log(err)
        }
      )
  } 

  const login = async () => {
//  var  orbitdb1 = new OrbitDB(ipfs);
//    setOrbit(orbitdb1)

    try {
    var x = await ipfs.version();
    // var y = await orbitdb.keyvalue('my-database');
    console.log(x);
    // console.log(y);
    } catch (err) {
     console.log(err);
    }
  };
/*
  const saveToIpfs = async (files) => {
    const source = ipfs.add(
      [...files],
      {
        progress: (prog) => console.log(`received: ${prog}`)
      }
    )
    try {
      for await (const file of source) {
        console.log(file)
        setFilehash(file.path )
      }
    } catch (err) {
      console.error(err)
    }
  };
*/

 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

      saveToIpfsWithFilename(event.target.files)
/*
    if (keepfile) {
      saveToIpfsWithFilename(event.target.files)
    } else {

      saveToIpfs(event.target.files)
    }
*/

  };
const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]
    const options = {
    create: true
    }

      await Storage.set({ key: 'user', value: 'user1' });
    var source = await ipfs.files.write('/user1/contents/'+file.name, file, options)
        console.log(source)
      source = ipfs.files.ls('/user1/contents/'+file.name, options);
	  console.log( source)
         var file1 = await source.next();
	  console.log( file1 )
	  console.log( file1.value.cid.toString() )
//        console.log(await source.next())
//          file1 = await source.next();
//	  console.log( file1 )
        
        setFilehash('/user1/contents/'+ file.name);
        var x = {
	  hash: file1.value.cid.toString(),
	  name: file.name,
	  cid: file1.value.cid.toString(),
	  path: '/user1/contents/'
        };
        saveinserver(x);
  };


  const listfiles = async () => {
    var options = {};
 var source = ipfs.files.ls('/user1/contents/', options)
    try {
      for await (const file of source) {
        console.log(file)
      }
    } catch (err) {
      console.error(err)
    }

  };


  const liststat = async () => {
    var options = {};
    var source = await ipfs.files.stat('/user1/contents/', options)
        console.log(source)

  };


/*
  const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]

    if(!file) return;

    const fileDetails = {
      path: '/user1/'+ file.name,
      content: file
    }
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`)
    }

    const source = ipfs.add(fileDetails, options)
    try {
        console.log(source)
        var dir = await source.next(); 
        dir = await source.next(); 
        if(dir) {
        console.log(dir)
        console.log(JSON.stringify(dir));
        setFilehash(dir.value.cid.toString())
        var xx = {user:'user1', ipfskey: dir.value.cid.toString()}; 
        await Storage.set({ key: 'userobj', value: JSON.stringify(xx) });
        }
    } catch (err) {
      console.error(err)
    }
  };

  
  const removeIpfsDirectory = async () => {
    const response = await Storage.remove({key: 'userobj' });
    console.log(JSON.stringify(response));
  };

  const createIpfsDirectory = async (obj) => {
    console.log("obj=" + JSON.stringify(obj));
 
    const fileDetails = {
      path: '/'+obj.user + '/'
    }
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`)
    }

    const source = ipfs.add(fileDetails, options)
    try {
      for await (const file of source) {
        console.log(file)
        obj.ipfskey = file.cid.toString();
        return (obj );
      }
    } catch (err) {
      console.error(err)
    }
  };

 

  const listfiles = async () => {
    //var options = {};

    var  storedvalue ;
    try {
      storedvalue = await getuser();
      console.log('storedvalue'+ storedvalue);
    } catch(err) {

      console.log('err'+ err);
    }

   console.log(JSON.parse(storedvalue).ipfskey);

   var source = ipfs.ls(JSON.parse(storedvalue).ipfskey);
    try {
      for await (const file of source) {
        console.log(file)
        console.log(file.path)
      }
    } catch (err) {
      console.error(err)
    }

  };


  const liststat = async () => {
    var options = {};
      var storedvalue ;
    try {
      storedvalue = await getuser();
      console.log('storedvalue'+ storedvalue);
    } catch(err) {

      console.log('err'+ err);
    }


    var source = await ipfs.files.stat('/ipfs/'+JSON.parse(storedvalue).ipfskey, options)
        console.log(source)

  };
  const getuser = async () => {
 
    var response = await Storage.get({key: 'userobj' });
    return response.value;

    if(response.value != null ) {
      console.log('response='+ response);
      return response.value;
    } else {
      return null;
    }
      var obj = await createIpfsDirectory({user:'user1', ipfskey:''});
      console.log('obj='+ JSON.stringify(obj));
      await Storage.set({ key: 'userobj', value: JSON.stringify(obj) });
      return obj;
    }
  };
  */


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
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
            <IonButton onClick={login}> login </IonButton>
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

    <IonItem>
              <IonLabel color="primary">IPFS create/list files</IonLabel>
            </IonItem>
       <div>
        <form id='captureMedia' onSubmit={handleSubmit}>
          <input type='file' onChange={captureFile} /><br/>
        </form>
        </div>
       <div>
          <a target='_blank' rel="noopener noreferrer"
            href={'https://ipfs.io/ipfs/' + filehash}>
            {filehash}
          </a>
        </div>

   

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
