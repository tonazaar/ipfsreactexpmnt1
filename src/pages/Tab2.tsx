import { Plugins } from '@capacitor/core';


import React, {  useEffect, useState }  from 'react';
import { IonAlert, IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';


import './Tab2.css';

const { Storage } = Plugins;

const Tab2: React.FC = () =>  {
  const [username, setUsername] = useState('');
  const [filehash, setFilehash] = useState('');
  const [mylist, setMylist] = React.useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState('');



  const listnamevalue = '';
  const liststatvalue = '';
  const mylist1: any[] = [];


//  const serverurl = "http://157.245.63.46:8080";
  const serverurl = "http://157.245.63.46:1337";


  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


 


 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

      saveToIpfsWithFilename(event.target.files)

  };



  const listfiles = async () => {
    var options = {};
 var source = ipfs.files.ls('/user1/contents/', options)
    var testarray = [] as any;
    try {
      for await (const file of source) {
        console.log(file)
        //mylist1.push( {key:('hh'+ p++), value:file}); 
        var obj = {
         name: file.name,
         cid: file.cid.toString(),
         url: 'https://ipfs.io/ipfs/'+file.cid.toString()
        };
        testarray.push(obj); 
      }
            setMylist(testarray);
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
 


  useEffect(() => {
/*
    if(mylist1.length > 0) {
      for( var x in mylist1) {
       console.log(x);
      }
    };
*/

  }, [mylist, mylist1]);

  const mkdirfunc = async () => {
    var options = {parents: true};
    var source = await ipfs.files.mkdir('/user1/contents', options)
        console.log(source)
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> File manager </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">File manager </IonTitle>
          </IonToolbar>
        </IonHeader>
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

            <IonButton onClick={mkdirfunc}> Mkdir </IonButton>
    <IonList>
            <IonItem >
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>
            <IonItem >
              <IonInput name="listname" type="text" placeholder="List" value={listnamevalue} spellCheck={false} autocapitalize="off" >
              </IonInput>
            <IonButton onClick={listfiles}> List </IonButton>
            </IonItem>
            <IonItem >
              <IonInput name="liststat" type="text" placeholder="Stat" value={liststatvalue} spellCheck={false} autocapitalize="off" >
              </IonInput>
            <IonButton onClick={liststat}> Stat </IonButton>
            </IonItem>
       {
           mylist.map((a, index) =>      {
         return (
             <IonItem key={'somerandomxxx'+index}>
                  {a['name']}
           <IonButton href={a['url']} color="primary" slot="end">Read</IonButton>

            </IonItem>
          ) 
          })
       }  




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

export default Tab2;
