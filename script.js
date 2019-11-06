let buttonCodes=['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace','Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Backslash','Enter','ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ArrowUp','ShiftRight','ControlLeft','AltLeft','Space','AltRight','ArrowLeft','ArrowDown','ArrowRight'];
let keysCodesEnNoShift=['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace','Tab','q','w','e','r','t','y','u','i','o','p','[',']','CapsLock','a','s','d','f','g','h','j','k','l',';','\'','\/','Enter','Shift','z','x','c','v','b','n','m',',','.','/','▲','Shift','Control','Alt',' ','Alt','◀','▼','▶'];
let keysCodesEnOnShift=['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace','Tab','Q','W','E','R','T','Y','U','I','O','P','{','}','CapsLock','A','S','D','F','G','H','J','K','L',':','"','|','Enter','Shift','Z','X','C','V','B','N','M','<','>','?','▲','Shift','Control','Alt',' ','AltGraph','◀','▼','▶'];
let keysCodesRuNoShift=['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace','Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','\/','Enter','Shift','я','ч','с','м','и','т','ь','б','ю','.','▲','Shift','Control','Alt',' ','AltGraph','◀','▼','▶'];
let keysCodesRuOnShift=['Ё','!','"','№',';','%',':','?','*','(',')','_','+','Backspace','Tab','Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','CapsLock','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','/','Enter','Shift','Я','Ч','С','М','И','Т','Ь','Б','Ю',',','▲','Shift','Control','Alt',' ','Alt','◀','▼','▶'];
let serviceButtons=['Tab','Backspace','CapsLock','Enter','ShiftLeft','ArrowUp','ShiftRight','ControlLeft','AltLeft','Space','AltRight','ArrowLeft','ArrowDown','ArrowRight'];
let diffButtons=['Backquote','BracketLeft','BracketRight','Semicolon','Quote','Comma','Period','Slash'];


let langSwitcher;

if(localStorage.getItem('langSwitcher')){
    langSwitcher=localStorage.getItem('langSwitcher');
    
}else{
    langSwitcher='EN' 
   
}




let capsLock=false;
let shiftSwitcher=false;

let actualKeysArray;
let wraper;
let textArea;
let keyDownBuffer=[];
let curKey;
let curKeys=[];
actualArr(shiftSwitcher,langSwitcher,capsLock);
documentCreation();
keyBoardAreaCreation();
keysRendering();

//keysNaming(actualKeysArray);





function documentCreation(){
wraper=document.createElement('div');
wraper.className="wraper";
wraper.setAttribute('tabindex', '2');
document.body.append(wraper);
textArea=document.createElement('textarea');
textArea.className="text-area"
wraper.append(textArea);
textArea.setAttribute('id', 'textArea');
textArea.setAttribute('rows', '10');

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
}

function keydown(event){
    textArea.focus();
    
    if(!serviceButtons.includes(event.code)){
    event.preventDefault();
    buttonPush(event);}
    
   
    if(event.code=='Tab'){event.preventDefault(); textArea.value+='\t';}
    else if(event.code=='ShiftLeft'||event.code=='ShiftRight'){shiftSwitcher=true; actualArr(shiftSwitcher,langSwitcher,capsLock); keyRenaming(); keyDownBuffer.push(event.code)}
    else if(event.code=='CapsLock'){capsLockSwitcher(); actualArr(shiftSwitcher,langSwitcher,capsLock); keyRenaming();
    return;}
    else if(event.code=='AltLeft'){keyDownBuffer.push(event.code)};
    
    if(keyDownBuffer.includes('AltLeft')&&(keyDownBuffer.includes('ShiftLeft')||keyDownBuffer.includes('ShiftRight'))){langSwitch(); actualArr(shiftSwitcher,langSwitcher,capsLock); keyRenaming();
    keyDownBuffer.length=0;}
    let keySelector='.key.'+event.code;
    curKey=document.querySelector(keySelector);
   
    if(curKey){ curKey.classList.add('actual-key'); curKeys.push(curKey)};
}

function keyup(event){
    if(event.code=='ShiftLeft'||event.code=='ShiftRight'){shiftSwitcher=false; actualArr(shiftSwitcher,langSwitcher,capsLock); keyRenaming();}
    else if(event.code=='CapsLock'){return};
    for(let item of curKeys){item.classList.remove('actual-key');}
    curKeys.length=0;
    keyDownBuffer.length=0;
}



function keyBoardAreaCreation(){
let keyboardArea=document.createElement('div');
keyboardArea.className="keyboard-area"
wraper.append(keyboardArea);
keyboardArea.setAttribute('tabindex', '3')


for(let i=0; i<5; i++){
    let row=document.createElement('div');
    row.className="row "+"row"+i;
    keyboardArea.append(row);

}
}

function keysRendering(){
let keyRows=document.querySelectorAll('.row');
let keyCounter=0;
for(let i=0; i<keyRows.length;i++){

   let curRow=keyRows[i]; 
 
    if(i==0||i==2){for(let j=0; j<14;j++){
        keyNaming(curRow,j,keyCounter);
        keyCounter++;
 
  }}
  if(i==1){
    for(let j=0; j<13;j++){
        keyNaming(curRow,j,keyCounter);
        keyCounter++;
  }}
 if(i==3){
    for(let j=0; j<13;j++){
        keyNaming(curRow,j,keyCounter);
        keyCounter++;
  }}
if(i==4){
    for(let j=0; j<7;j++){
        keyNaming(curRow,j,keyCounter);
        keyCounter++;
  }

}
}

function keyNaming(curRow,j,keyCounter){
    let key=document.createElement('div');
    key.addEventListener('click',mouseClick,false);
   

    key.className="key "+buttonCodes[keyCounter];
    let span=document.createElement('span');
    if(buttonCodes[keyCounter]=='ControlLeft'){
        span.innerHTML='Ctrl';
    }
    else if(buttonCodes[keyCounter]=='AltRight'){
        span.innerHTML='Alt';
    }else if(buttonCodes[keyCounter]=='Space'){
        span.innerHTML=langSwitcher;
    }else{    
    span.innerHTML=actualKeysArray[keyCounter];
    }
    key.append(span);
    curRow.append(key);
    return keyCounter;
   }
}

function mouseClick(event){
    let key=event.currentTarget;
    let classOfKey='';
    classOfKey=key.getAttribute('class').slice(4);
    
    if(!serviceButtons.includes(classOfKey)){
    textArea.value=textArea.value+actualKeysArray[buttonCodes.indexOf(classOfKey)];}
    
    else{
       
       textArea.focus(); 
       if(classOfKey=='Tab'){textArea.value+='\t';}
       else if(classOfKey=='Enter'){textArea.value+='\n';}
       else if(classOfKey=='Backspace'){textArea.value=textArea.value.slice(0,textArea.value.length-1);}
       else if(classOfKey=='Space'){textArea.value+=' '}

    }
    
    key.classList.add('actual-key');
    setTimeout(()=>{key.classList.remove('actual-key')},100);
   };

function langSwitch(){
    if(langSwitcher=='RU'){
        langSwitcher='EN'
        localStorage.setItem('langSwitcher', 'EN');
        
    }else{
        langSwitcher='RU'
        localStorage.setItem('langSwitcher', 'RU');
        
    }
}

function capsLockSwitcher(){
	let caps;
    if(capsLock==false){
        capsLock=true;
        caps=document.querySelector('.key.CapsLock');
        caps.classList.add('actual-key');
    }else{
        capsLock=false;
       	caps=document.querySelector('.key.CapsLock.actual-key');
        caps.classList.remove('actual-key');
    }
}



function actualArr(shiftSwitcher,langSwitcher,capsLock){
    let actualArr=[];
    
    if(capsLock==true&&langSwitcher=='EN'){
        for(let i=0; i<keysCodesEnNoShift.length;i++){
            if(buttonCodes[i].indexOf('Key')!==-1){
                actualArr.push(keysCodesEnOnShift[i])
            }else{
                actualArr.push(keysCodesEnNoShift[i])
            }
        }
    }else if(capsLock==true&&langSwitcher=='RU'){
        for(let i=0; i<keysCodesRuNoShift.length;i++){
            if(buttonCodes[i].indexOf('Key')!==-1||diffButtons.includes(buttonCodes[i])){
                actualArr.push(keysCodesRuOnShift[i])
            }else{
                actualArr.push(keysCodesRuNoShift[i])
            }
        }

    }else if(capsLock==false&&langSwitcher=='RU'&&shiftSwitcher==false){
        actualArr=keysCodesRuNoShift;
    }else if(capsLock==false&&langSwitcher=='EN'&&shiftSwitcher==false){
        actualArr=keysCodesEnNoShift;
    }else if(langSwitcher=='RU'&&shiftSwitcher==true){
        actualArr=keysCodesRuOnShift;
    }else if(langSwitcher=='EN'&&shiftSwitcher==true){
        actualArr=keysCodesEnOnShift;
    }   
    actualKeysArray=actualArr;

}

function keyRenaming(){
    let keys=document.querySelectorAll('span')
    
    for(let i=0;i<keys.length;i++){
    if(i==54){keys[i].innerHTML='Ctrl';}
    else if(i==55){keys[i].innerHTML='Alt';}
    else if(i==56){keys[i].innerHTML=langSwitcher;}
    else if(i==57){keys[i].innerHTML='Alt'}
    else{keys[i].innerHTML=actualKeysArray[i];}
    }
}

function buttonPush(event){
    let key=document.querySelector('.key.'+event.code);
    let classOfKey='';
    classOfKey=key.getAttribute('class').slice(4);
    
    if(!serviceButtons.includes(classOfKey)){
    textArea.value=textArea.value+actualKeysArray[buttonCodes.indexOf(classOfKey)];}
    
    else{
       
       textArea.focus(); 
       if(classOfKey=='Tab'){textArea.value+='\t';}
       else if(classOfKey=='Enter'){textArea.value+='\n';}
       else if(classOfKey=='Backspace'){textArea.value=textArea.value.slice(0,textArea.value.length-1);}

    }
    
   };