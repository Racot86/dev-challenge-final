import droneSpares from "../data/spare-parts.js";
import {generateTable, filterData, fillAttributes, calculatePrice, resetAttributes, resetAllAttributes} from "./functions.js";

const dropZone = document.querySelector(".drop-zone");

const frameEl = document.querySelector(".frame");
const motorsEl = document.querySelectorAll(".motor");
const batteryEl = document.querySelector(".battery");
const controllerEl = document.querySelector(".controller");
const videoAntennaEl = document.querySelector(".video-antenna");
const radioModuleEl = document.querySelector(".radio-module");
const cameraEl = document.querySelector(".camera");

const resetBtn = document.querySelector(".btn-reset");
const progress =  document.querySelector(".progress");
const parts = document.querySelectorAll(".drone-part");

const exportBtn = document.querySelector(".export");
exportBtn.addEventListener("click", () => {
    const expFileData = generateUsedPartsObject();
    if (expFileData.length>0) {
        exportToJsonFile(expFileData);
    }
})


const btnFrame = document.querySelector(".btn-frame");
btnFrame.addEventListener("click", ()=>{
    let count = 0
    motorsEl.forEach(el => {
        if (el.getAttribute("slot")==='1') {
            count++;
        }
    })
    if (count===0) {
        btnFrame.style.display = "none";
        resetAttributes(frameEl);
        calculatePrice();
        droneProgress();
    }else {
        alert('cannot remove - frame blocked by other elements')
    }
})
const btnMotorLeftTop = document.querySelector(".btn-motor1");
btnMotorLeftTop.addEventListener("click", ()=>{
    btnMotorLeftTop.style.display = "none";
    const leftTop = document.querySelector(".left-top");
    resetAttributes(leftTop);
    calculatePrice();
    droneProgress();
})
const btnMotorRightTop = document.querySelector(".btn-motor2");
btnMotorRightTop.addEventListener("click", ()=>{
    btnMotorRightTop.style.display = "none";
    const rightTop = document.querySelector(".right-top");
    resetAttributes(rightTop);
    calculatePrice();
    droneProgress();
})
const btnMotorLeftDown = document.querySelector(".btn-motor3");
btnMotorLeftDown.addEventListener("click", ()=>{
    btnMotorLeftDown.style.display = "none";
    const leftDown = document.querySelector(".left-down");
    resetAttributes(leftDown);
    calculatePrice();
    droneProgress();
})
const btnMotorRightDown = document.querySelector(".btn-motor4");
btnMotorRightDown.addEventListener("click", ()=>{
    btnMotorRightDown.style.display = "none";
    const rightDown = document.querySelector(".right-down");
    resetAttributes(rightDown);
    calculatePrice();
    droneProgress();
})
const btnBattery = document.querySelector(".btn-battery");
btnBattery.addEventListener("click", ()=>{
    btnBattery.style.display = "none";
    resetAttributes(batteryEl);
    calculatePrice();
    droneProgress();
})
const btnController = document.querySelector(".btn-controller");
btnController.addEventListener("click", ()=>{
    btnController.style.display = "none";
    resetAttributes(controllerEl);
    calculatePrice();
    droneProgress();
})
const btnAntenna = document.querySelector(".btn-antenna");
btnAntenna.addEventListener("click", ()=>{
    btnAntenna.style.display = "none";
    resetAttributes(videoAntennaEl);
    calculatePrice();
    droneProgress();
})
const btnRadio = document.querySelector(".btn-radio");
btnRadio.addEventListener("click", ()=>{
    btnRadio.style.display = "none";
    resetAttributes(radioModuleEl);
    calculatePrice();
    droneProgress();
})
const btnCamera = document.querySelector(".btn-camera");
btnCamera.addEventListener("click", ()=>{
    btnCamera.style.display = "none";
    resetAttributes(cameraEl);
    calculatePrice();
    droneProgress();
})




const totalPriceEl = document.querySelector(".total-price");

let droneSize = 0;

const droneParts = 10;


const exportToJsonFile = (data)  => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'droneParts.json';
    link.click();
    URL.revokeObjectURL(url);
}


const generateUsedPartsObject =()=>{
    let objects = []
    parts.forEach(part => {
        if (part.getAttribute("slot")==='1'){
            let item = {
                detail: "",
                name: "",
                price: 0,
            }
            item.detail = part.getAttribute("detail");
            item.name = part.getAttribute("name");
            item.price = part.getAttribute("price");
            objects.push(item);
        }

    })
    return objects;
}

const droneProgress = ()=>{
    let usedPartsNo = 0;

    parts.forEach(part => {
        if (part.getAttribute("slot")==='1') {usedPartsNo++;}
    })

    progress.innerHTML = 'Drone assembled: ' + ((usedPartsNo / droneParts) * 100).toString() +'%';

}

const checkUsedParts=()=>{



    if (frameEl.getAttribute("slot")==='1') {
        btnFrame.style.display='block';
    }else{
        btnFrame.style.display='none';
    }
    let i = 1
    motorsEl.forEach((item) => {
        if(i===1){
            if (item.getAttribute("slot")==='1') {
                btnMotorLeftTop.style.display='block'
            }else{
                btnMotorLeftTop.style.display='none';
            }
        }
        if(i===2){
            if (item.getAttribute("slot")==='1') {
                btnMotorRightTop.style.display='block';
            }else{
                btnMotorRightTop.style.display='none';
            }
        }
        if(i===3){
            if (item.getAttribute("slot")==='1') {
                btnMotorLeftDown.style.display='block';
            }else{
                btnMotorLeftDown.style.display='none';
            }
        }
        if(i===4){
            if (item.getAttribute("slot")==='1') {
                btnMotorRightDown.style.display='block';
            }else{
                btnMotorRightDown.style.display='none';
            }
        }
        i++;
    })
    if (batteryEl.getAttribute("slot")==='1') {
        btnBattery.style.display='block';
    }else{
        btnBattery.style.display='none';
    }
    if (controllerEl.getAttribute("slot")==='1') {
        btnController.style.display='block';
    }else{
        btnController.style.display='none';
    }
    if (videoAntennaEl.getAttribute("slot")==='1') {
        btnAntenna.style.display='block';
    }else{
        btnAntenna.style.display='none';
    }
    if (radioModuleEl.getAttribute("slot")==='1') {
        btnRadio.style.display='block';
    }else{
        btnRadio.style.display='none';
    }
    if (cameraEl.getAttribute("slot")==='1') {
        btnCamera.style.display='block';
    }else{
        btnCamera.style.display='none';
    }

droneProgress();

}



resetBtn.addEventListener("click", () => {
    resetAllAttributes();
    checkUsedParts();
    droneSize = 0;
    totalPriceEl.innerHTML = 'Total price: ' + calculatePrice() +'$';
})






generateTable(filterData(droneSpares, -1, ''));


dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Handle the drop event
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    // Retrieve and parse the JSON string to an object
    const data = event.dataTransfer.getData('application/json');
    const receivedObject = JSON.parse(data);


    switch (receivedObject.detail) {
        case 'frame':
            if (frameEl.slot === '0') {
                frameEl.src = receivedObject.img;
                droneSize = receivedObject.compatibility[0];
                fillAttributes(frameEl, receivedObject);
            }else{
                if(receivedObject.compatibility.includes(droneSize)) {
                    frameEl.src = receivedObject.img;
                    droneSize = receivedObject.compatibility[0];
                    fillAttributes(frameEl, receivedObject);
                }else{
                    alert('not compatible')
                }
            }
                break;

        case 'motors':
            for (let i = 0; i < motorsEl.length; i++) {
                if (motorsEl[i].slot === '0') {
                    if(receivedObject.compatibility.includes(droneSize)) {
                        motorsEl[i].src = receivedObject.img;
                        fillAttributes(motorsEl[i], receivedObject);
                        break;
                    }else {
                        alert('not compatible')
                        break;
                    }
                }
            }
            break;
        case 'battery':
            if(receivedObject.compatibility.includes(droneSize)) {
                batteryEl.src = receivedObject.img;
                fillAttributes(batteryEl, receivedObject);
            }else {
                alert('not compatible');
            }
            break;
        case 'flight_controller':
            if(receivedObject.compatibility.includes(droneSize)) {
                controllerEl.src = receivedObject.img;
                fillAttributes(controllerEl, receivedObject);
            }else {
                alert('not compatible');
            }
            break;
        case 'video_antenna':
            if(receivedObject.compatibility.includes(droneSize)) {
                videoAntennaEl.src = receivedObject.img;
                fillAttributes(videoAntennaEl, receivedObject);
            }else {
                alert('not compatible');
            }
            break;
        case 'radio_module':
            if(receivedObject.compatibility.includes(droneSize)) {
                radioModuleEl.src = receivedObject.img;
                fillAttributes(radioModuleEl, receivedObject);
            }else {
                alert('not compatible');
            }
            break;
        case 'camera':
            if(receivedObject.compatibility.includes(droneSize)) {
                cameraEl.src = receivedObject.img;
                fillAttributes(cameraEl, receivedObject);
                break;
            }else {
                alert('not compatible');
            }
    }
    checkUsedParts();

    totalPriceEl.innerHTML = 'Total price: ' + calculatePrice() +'$';
});