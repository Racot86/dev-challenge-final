
const compatibilityToString = (array) => {
    let output = '';
    array.forEach((item) => {
        output += item +'" ';
    })
    return output;
}

export const generateTable = (data) => {

    if (data.length > 0) {
        const panel = document.querySelector('.part-list');
        panel.innerHTML = '';
        let allCardsFrag = new DocumentFragment();
        data.forEach((row) => {
            const { detail, name, price, compatibility, img } = row;
            let card = document.createElement('div');
            card.classList.add('spare-card');
            let imgEl = document.createElement('img');

            imgEl.src = img;

            imgEl.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('application/json', JSON.stringify(row));
            });
            imgEl.setAttribute('detail', detail);
            imgEl.setAttribute('name', name);
            imgEl.setAttribute('price', price);
            imgEl.setAttribute('compatibility', compatibility);
            imgEl.classList.add('img-detail');

            let detailCard = document.createElement('div');
            let detailP = document.createElement('p');
            let nameP = document.createElement('p');
            let priceP = document.createElement('p');
            let compatibilityP = document.createElement('p');

            detailP.innerHTML = 'type: ' + detail;
            nameP.innerHTML = 'name: ' + name;
            priceP.innerHTML = 'price: ' + price +'$';
            compatibilityP.innerHTML = 'compatible with ' + compatibilityToString(compatibility);

            detailCard.appendChild(detailP);
            detailCard.appendChild(nameP);
            detailCard.appendChild(priceP);
            detailCard.appendChild(compatibilityP);




            card.appendChild(imgEl);
            card.appendChild(detailCard);

            allCardsFrag.appendChild(card);
        });

        panel.appendChild(allCardsFrag)

    }

}

export const filterData = (data,  droneSize = -1, spatePart = "")=>{
    if (droneSize === -1) {
        if (spatePart === "") {
            return data;
        }else {
            return data.filter((item) => item.detail===spatePart);
        }
    }else{
        if (spatePart === "") {
            return data.filter((item) => item.compatibility.includes(droneSize));
        }else {
            return data.filter((item) => item.compatibility.includes(droneSize) && item.detail === spatePart);
        }
    }

}

export const fillAttributes = (el,object)=>{
    el.setAttribute('detail', object.detail);
    el.setAttribute('name', object.name);
    el.setAttribute('price', object.price);
    el.setAttribute('compatibility', object.compatibility);
    el.setAttribute('slot', 1);
    el.style.opacity = '1';
}

export const resetAttributes = (el)=>{
    el.setAttribute('detail', '');
    el.setAttribute('name', '');
    el.setAttribute('price', 0);
    el.setAttribute('compatibility', '');
    el.setAttribute('slot', 0);
    el.src = '';
    el.style.opacity = '0';
}

export const resetAllAttributes = ()=>{
    const frameEl = document.querySelector(".frame");
    const motorsEl = document.querySelectorAll(".motor");
    const batteryEl = document.querySelector(".battery");
    const controllerEl = document.querySelector(".controller");
    const videoAntennaEl = document.querySelector(".video-antenna");
    const radioModuleEl = document.querySelector(".radio-module");
    const cameraEl = document.querySelector(".camera");

    resetAttributes(frameEl)
    motorsEl.forEach((item) => {
        resetAttributes(item);
    })
    resetAttributes(batteryEl);
    resetAttributes(controllerEl);
    resetAttributes(videoAntennaEl);
    resetAttributes(radioModuleEl);
    resetAttributes(cameraEl);
}

export const calculatePrice = ()=>{

    const frameEl = document.querySelector(".frame");
    const motorsEl = document.querySelectorAll(".motor");
    const batteryEl = document.querySelector(".battery");
    const controllerEl = document.querySelector(".controller");
    const videoAntennaEl = document.querySelector(".video-antenna");
    const radioModuleEl = document.querySelector(".radio-module");
    const cameraEl = document.querySelector(".camera");

    const getPrice = (el) =>{
        try {
            if (el.getAttribute("slot")==='1') {
                return parseInt(el.getAttribute("price"));
            } else {
                return 0;
            }
        }catch(err){
            console.log(el)
        }

    }

    let motorPrice = 0
    motorsEl.forEach((item) => {
        motorPrice += getPrice(item);
    })

    return getPrice(frameEl) +
        motorPrice +
        getPrice(batteryEl) +
        getPrice(controllerEl) +
        getPrice(videoAntennaEl) +
        getPrice(radioModuleEl) +
        getPrice(cameraEl);

}

export const getFreeMotorSlot = (motorsEl)=>{

}

export default generateTable;