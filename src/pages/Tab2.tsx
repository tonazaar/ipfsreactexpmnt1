import { Plugins } from '@capacitor/core';


import React, {  useEffect, useState }  from 'react';
import { IonText, IonAlert, IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';


import './Tab2.css';

const { Storage } = Plugins;

const Tab2: React.FC = () =>  {
  const [username, setUsername] = useState('');
  const [dirtomake, setDirtomake] = useState('');
  const [filehash, setFilehash] = useState('');
  const [filename, setFilename] = useState('');
  const [directory, setDirectory] = useState('/user1/contents/');
  const [statvalue, setStatvalue] = useState(0);
  const [mylist, setMylist] = React.useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState('');



  const mylist1: any[] = [];


  const serverurl = "http://157.245.63.46:8080";
//  const serverurl = "http://157.245.63.46:1337";


  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


  var ipfsconfig : any = {
	nodetype : 'publicnode',
	userid : 'user1'
  };
 


 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

      saveToIpfsWithFilename(event.target.files)

  };


  const mynewdirectory = async (newdir) => {
    //var newdir = '/user1';
    setDirectory(newdir); 
    listfiles(newdir);
  };

  const pinfiles = async (dir) => {
    var options = {};

    var tmpss = localStorage.getItem("ipfsconfig");
    if(tmpss != null) {
    ipfsconfig = JSON.parse(tmpss);
    console.log(ipfsconfig);
    }

   var the_arr = dir.split('/');
    var lastdir = the_arr.pop();
    if(lastdir == '')
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

  const listfiles = async (dir) => {
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
         cid: file.cid.toString(),
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


const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]
    const options = {
    create: true
    }

      await Storage.set({ key: 'user', value: 'user1' });
    var source = await ipfs.files.write(directory +file.name, file, options)
        console.log(source)
        source = ipfs.files.ls(directory +file.name, options);
         var file1 = await source.next();
	  console.log( file1.value.cid.toString() )
        
        setFilename(directory + file.name);
        setFilehash(file1.value.cid.toString());
        var x = {
	  hash: file1.value.cid.toString(),
	  name: file.name,
	  cid: file1.value.cid.toString(),
	  path: directory
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
            <IonItem >
            </IonItem >

    <IonList>
            <IonItem >
              <IonLabel color="primary">Nodetype = {ipfsconfig.nodetype} </IonLabel>
            </IonItem >
            <IonItem >
              <IonLabel color="primary">Userid = {ipfsconfig.userid} </IonLabel>
            </IonItem>
            <IonItem   >
          <IonLabel position="stacked" color="primary"   >  Click the directory below to browse  </IonLabel>
            </IonItem   >
            <IonItem   >
          <IonText   onClick={()=>mynewdirectory('/user1')} >  /user1 </IonText>
          <IonText   onClick={()=>mynewdirectory('/user1/contents')} >  /contents </IonText>
            </IonItem>
            <IonItem >
              <IonInput name="listname" type="text" placeholder="Directory to make" value={dirtomake} spellCheck={false} autocapitalize="off" onIonChange={e => setDirtomake(e.detail.value!)} >
              </IonInput>
            <IonButton onClick={newmkdirfunc} slot="end"> mkdir </IonButton>
            </IonItem>
    <IonItem >
          <IonLabel position="stacked" color="primary"   >  Choose file to upload </IonLabel>
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
            </IonItem >
            <IonItem >
            <IonButton onClick={()=>listfiles(directory)} size="small" > List </IonButton>
            <IonButton onClick={()=>pinfiles(directory)} size="small" > Pin </IonButton>
            </IonItem >
            <IonItem >
            <IonButton onClick={()=>liststat(directory)} size="small" > Stat </IonButton>
          <IonLabel color="primary" slot="end"   > {statvalue}  bytes   </IonLabel>
            </IonItem >

       {
           mylist.map((a, index) =>      {
         return (
            <IonItem key={'somerandohmxxx'+index}>
           <IonLabel class="ion-text-wrap">
      <IonText color="primary">
        <h3> {a['name']} </h3>
      </IonText>
      <IonText color="secondary">
      <p>  
           <a target="_blank" rel="noopener noreferrer" href={a['publicurl']} >Public view</a>
      </p>
      <p>
           <a target="_blank" rel="noopener noreferrer" href={a['privateurl']} >Private view</a>
      </p>
      <p>
           <IonButton  size="small" color="primary" slot="end">Delete</IonButton>
           <a  target="_blank"  rel="noopener noreferrer" href={a['privateurl']} download> Download </a>
      </p>
      </IonText>
    </IonLabel>



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
