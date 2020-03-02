import { Plugins } from '@capacitor/core';


import React, {  useEffect, useState }  from 'react';
import { IonBadge, IonCardHeader, IonCard, useIonViewWillEnter, useIonViewDidEnter, IonRow, IonCol, IonGrid, IonIcon, IonText, IonAlert, IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { trash } from 'ionicons/icons';
import ipfsClient from 'ipfs-http-client';


import './Tab2.css';

const { Storage } = Plugins;

const Tab2: React.FC = () =>  {
  // const [username, setUsername] = useState('');
  const [dirtomake, setDirtomake] = useState('');
  const [filehash, setFilehash] = useState('');
  const [filename, setFilename] = useState('');
  const [directory, setDirectory] = useState('/user1/contents/');
  const [statvalue, setStatvalue] = useState(0);
  const [mylist, setMylist] = React.useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [error, setError] = useState('');
  const [loginmessage, setLoginmessage] = useState('');

  const [mysegments, setMysegments] = React.useState([]);


  const mylist1: any[] = [];

 const trashicon = trash;
  state = { redirect: null };

  const serverurl = "http://157.245.63.46:8080";
//  const serverurl = "http://157.245.63.46:1337";


  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


  var ipfsconfig : any = {
	nodetype : 'publicnode',
	userid : 'user1'
  };
 
 useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired')
  });

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    var tmptoken = localStorage.getItem("token");
    var tmpipfs = localStorage.getItem("ipfsconfig");

    if(tmptoken == null) 
    {
      setLoginmessage("Login to proceed");
      setShowLoginAlert(true); 
      return;
    }

    if(tmpipfs == null) 
    {
      setLoginmessage("Config not created");
      setShowLoginAlert(true); 
      return;
    }

    if(tmpipfs != null) {
    ipfsconfig = JSON.parse(tmpipfs);
    console.log(ipfsconfig);
    }

    setUsername(ipfsconfig.userid);

    listNewDirectory('/'+ ipfsconfig.userid);
  });

 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

    saveToIpfsWithFilename(event.target.files)

  };

  const prepareDisplayDirectory = async (dir) => {

    var tmplocalsegment= dir.split('/');
    var cleanedlocalsegment = [] as any;
   
    for(var j =0; j< tmplocalsegment.length; j++) {
       if(tmplocalsegment[j] !== '')
       cleanedlocalsegment.push(tmplocalsegment[j]);
    }
 
    var segmentstouse = [] as any;
    console.log(JSON.stringify(cleanedlocalsegment));

    var newarray = cleanedlocalsegment.map((x)=> x);
    for(var i = 0; i< newarray.length; i++) {
 
       var lastdir =  newarray[newarray.length-i-1];
       var obj = {
         lastpath: lastdir,
         fullpath: '/'+cleanedlocalsegment.join('/') 
       };

      segmentstouse.push(obj); 
      cleanedlocalsegment.pop();
    }
    
    console.log(JSON.stringify(segmentstouse));
    segmentstouse.reverse(); 
    setMysegments(segmentstouse);
    console.log(JSON.stringify(segmentstouse));
 
  };

  const listNewDirectory = async (newdir) => {
    preSaveDirectory(newdir); 
    prepareDisplayDirectory(newdir);
    listFiles(newdir);
  };

  const preSaveDirectory = async (dir) => {

    var tmplocalsegment= dir.split('/');
    var cleanedlocalsegment = [] as any;

    for(var j =0; j< tmplocalsegment.length; j++) {
       if(tmplocalsegment[j] !== '')
       cleanedlocalsegment.push(tmplocalsegment[j]);
    }
   
    var newdir = '/'+cleanedlocalsegment.join('/'); 
    setDirectory(newdir); 
  };

  const pinFiles = async (dir) => {
    var options = {};

    var tmpss = localStorage.getItem("ipfsconfig");
    if(tmpss != null) {
    ipfsconfig = JSON.parse(tmpss);
    console.log(ipfsconfig);
    }

   var the_arr = dir.split('/');
    var lastdir = the_arr.pop();
    if(lastdir === '')
    lastdir = the_arr.pop();
   var newdir =  the_arr.join('/') ;

   console.log("newdir =" + newdir);
   console.log("lastdir =" + lastdir);

   var source = ipfs.files.ls(newdir , options)
    try {
      for await (const file of source) {
        console.log(file)
       /* var segments = dir.replace(/\/+$/, '').split('/');
       var lastDir = (segments.length > 0) ? segments[segments.length - 1] : "";
        console.log(lastDir);
*/

        if(file.type === 1 && file.name === lastdir) {

          var pinoptions = {
		recursive: true
          };
          var pinoutput = await ipfs.pin.add(file.cid.toString(), pinoptions);
          console.log("pinning status =" + JSON.stringify(pinoutput));
        }
      }
    } catch (err) {
      setError(err);
      setShowErrorAlert(true);

      console.error(err)
    }

  };

  const listFiles = async (dir) => {
    var options = {};

    var tmpss = localStorage.getItem("ipfsconfig");
    if(tmpss != null) {
    ipfsconfig = JSON.parse(tmpss);
    console.log(ipfsconfig);
    }


 var source = ipfs.files.ls(dir, options)
    var testarray = [] as any;
    try {
      for await (const file of source) {
        console.log(file)
        //mylist1.push( {key:('hh'+ p++), value:file}); 

        var publicurl = 'https://ipfs.io/ipfs/'+file.cid.toString()
        var privateurl = ipfsconfig.localgateway + '/ipfs/'+file.cid.toString()

        var obj = {
         name: file.name,
         type: file.type,
         cid: file.cid.toString(),
         fullpath: dir+"/"+ file.name, 
         publicurl: publicurl,
         privateurl: privateurl,
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


  const liststat = async (dir) => {
    var options = {};
    var source = await ipfs.files.stat(dir , options)
     setStatvalue(source.cumulativeSize);

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

/*
  const mkdirfunc = async () => {
    var options = {parents: true};
    var source = await ipfs.files.mkdir('/user1/contents', options)
        console.log(source)
  };

*/
  const newmkdirfunc = async () => {
    var options = {parents: true};
    if(dirtomake.length < 1) return; 
    var source = await ipfs.files.mkdir(directory+"/"+dirtomake, options)
        console.log(source)
  };

  const deletefile = async (cid) => {
    var options = {};
    var source = await ipfs.files.rm(cid, options)
        console.log(source)
    listFiles(directory);
  };



const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]
    const options = {
    create: true
    }

      await Storage.set({ key: 'user', value: 'user1' });
    var source = await ipfs.files.write(directory +'/'+file.name, file, options)
        console.log(source)
        source = ipfs.files.ls(directory +'/'+file.name, options);
         var file1 = await source.next();
	  console.log( file1.value.cid.toString() )
        
        setFilename(directory +'/'+ file.name);
        setFilehash(file1.value.cid.toString());
        var x = {
	  hash: file1.value.cid.toString(),
	  name: file.name,
	  cid: file1.value.cid.toString(),
	  path: directory
        };
        saveinserver(x);
        listFiles(directory);
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

    <IonList>
            <IonCard >
     <IonCardHeader>
    IPFS storage system 
     </IonCardHeader>
            <IonItem >
      <IonGrid>
  <IonRow>
    <IonCol>
              <IonLabel color="primary">Nodetype  </IonLabel>
    </IonCol>
    <IonCol>
              <IonLabel color="primary"> {ipfsconfig.nodetype} </IonLabel>
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
              <IonLabel color="primary">Userid  </IonLabel>
    </IonCol>
    <IonCol>
              <IonLabel color="primary"> {ipfsconfig.userid} </IonLabel>
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem >

            <IonItem >
      <IonGrid>
  <IonRow>
    <IonCol>
    Current directory
    </IonCol>
    <IonCol>





           {
           mysegments.map((a, index) =>      {
         return (
            <IonText key={'somggsgserandohmxxx'+index}   onClick={()=>listNewDirectory(a['fullpath'])} >/{a['lastpath']}</IonText>
           )
           })
          }
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem>
            </IonCard >

   <IonCard >
     <IonCardHeader>
    File processing
     </IonCardHeader>

            <IonItem >
 <IonBadge slot="start">1</IonBadge>
      <IonGrid>
  <IonRow>
    <IonCol>
              <IonInput name="listname" type="text" placeholder="Create directory " value={dirtomake} spellCheck={false} autocapitalize="off" onIonChange={e => setDirtomake(e.detail.value!)} >
              </IonInput>
    </IonCol>
    <IonCol>
            <IonButton shape="round" fill="outline" onClick={newmkdirfunc} > mkdir </IonButton>
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem>
            
    <IonItem >
 <IonBadge slot="start">2</IonBadge>
      <IonGrid>
  <IonRow>
    <IonCol>
          <IonLabel color="primary"   >  Choose file to upload </IonLabel>
    </IonCol>
    <IonCol>
    <div>
        <form id='captureMedia' onSubmit={handleSubmit}>
          <input type='file' onChange={captureFile} /><br/>
        </form>
        </div>
  <div>
          <a target='_blank' rel="noopener noreferrer"
            href={'https://ipfs.io/ipfs/' + filehash}>
            {filename}
          </a>
        </div>
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem >
   </IonCard >

   <IonCard >
     <IonCardHeader>
    File queries
     </IonCardHeader>


            <IonItem >
      <IonGrid>
  <IonRow>
    <IonCol>
            <IonButton shape="round" fill="outline" onClick={()=>listFiles(directory)} size="small" > List files </IonButton>
    </IonCol>
    <IonCol>
            <IonButton shape="round" fill="outline" onClick={()=>pinFiles(directory)} size="small" > Pin directory </IonButton>
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem >
            <IonItem >
      <IonGrid>
  <IonRow>
    <IonCol>
            <IonButton shape="round" fill="outline" onClick={()=>liststat(directory)} size="small" > Usage </IonButton>
    </IonCol>
    <IonCol>
          <IonLabel color="primary"   > {statvalue}  bytes   </IonLabel>
    </IonCol>
  </IonRow>
      </IonGrid>
            </IonItem >
   </IonCard >
   <IonCard >
     <IonCardHeader>
    File listing
     </IonCardHeader>

       {
           mylist.map((a, index) =>      {
         return (
            <IonItem key={'somerandomghxx'+index}>
      { a['type'] ? (
           <IonLabel class="ion-text-wrap">
      <IonGrid>
  <IonRow>
    <IonCol>
      <IonText color="danger">
        <h3> /{a['name']} </h3>
      </IonText>
    </IonCol>
    <IonCol>
    </IonCol>
    <IonCol>
     <IonButton size="small" shape="round" fill="outline"  onClick={()=>listNewDirectory(a['fullpath'])} >
       Directory
    </IonButton>
    </IonCol>
    <IonCol>
    </IonCol>
  </IonRow>
      </IonGrid>

    </IonLabel>

      ) : (
           <IonLabel class="ion-text-wrap">
      <IonGrid>
  <IonRow>
    <IonCol>
        <h3> {a['name']} </h3>
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
           <a target="_blank" rel="noopener noreferrer" href={a['publicurl']} >Public </a>
    </IonCol>
    <IonCol>
           <a target="_blank" rel="noopener noreferrer" href={a['privateurl']} >Private </a>
    </IonCol>
    <IonCol>
           <a  target="_blank"  rel="noopener noreferrer" href={a['privateurl']} download> Download </a>
    </IonCol>
    <IonCol>
     <IonButton shape="round" fill="outline" onClick={()=>deletefile(a['fullpath'])} >
      <IonIcon size="small" slot="icon-only" icon={trashicon} />
    </IonButton>
    </IonCol>
  </IonRow>

      </IonGrid>


    </IonLabel>
      ) }



            </IonItem>
          ) 
          })
       }  

   </IonCard >



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
          message={loginmessage}
          buttons={['OK']}
        />


   

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
