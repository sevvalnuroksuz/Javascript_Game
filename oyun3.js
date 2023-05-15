const main=document.querySelector(".main")
const plevel=document.querySelector(".level")
const pscore=document.querySelector(".puan")

let colors=["#c0dbdd","#5495db","yellow","green","purple","pink","lime","orange","black","grey","blue","white",
"#bff2b2","#fcdb08","#ed86d4"]
let level=2
let puan=0
let dim=85
let width=400
let kazandin=new Audio("./kazandin.mp3")
let yenildin=new Audio("./yenildin.mp3")

plevel.textContent=level-1
function drawboard(){
    main.style.width=width+"px"
   

    for(let i=0;i< level*8;i++){
        let kare=document.createElement("div")
        kare.classList.add("kare")
        kare.setAttribute("color","")
        kare.style.width=dim+"px"
        kare.style.height=dim+"px"
        main.appendChild(kare)

    }
    const kareler=document.querySelectorAll(".main .kare")
    let count=0
    let innercount=[]
    while(count<kareler.length)
    {
        let index=Math.floor(Math.random()*kareler.length)
        if(!innercount.includes(index))
        {
            innercount.push(index)
            count++
        
        }

    }
   let b=0
   count=0

   for(let i=0;i<kareler.length;i++){

   let color =colors[Math.floor(Math.random()*colors.length)]

       for(let f=1;f<=2;f++){
          if(b<kareler.length){
          kareler[innercount[b]].setAttribute("color",color)
          b++
        }
     }
   }
     let c=0
     let selectedkareler=[]
     kareler.forEach(item =>{
        item.addEventListener("click",(e) => {
            if(selectedkareler.length < 2 && !e.target.classList.contains("rotateKare")) {
                e.target.classList.add("rotateKare")
                e.target.style.background = e.target.getAttribute("color")
                selectedkareler.push(e.target)
                if(selectedkareler.length===2){

                    if(selectedkareler[0].getAttribute("color")===selectedkareler[1].getAttribute("color"))
                    {
                        kazandin.play()
                        kazandin.currentTime=0
                        puan=puan+5
                        pscore.textContent=puan
                        count++
                        if(count===(kareler.length)/2){
                            level++
                            plevel.textContent=level-1
                            main.innerHTML=""
                            drawboard() 
                        }
                        selectedkareler = []
                    }
                    else {
                        setTimeout(() => {
                            selectedkareler[0].classList.remove("rotateKare")
                            selectedkareler[0].style.background = "none"
                            selectedkareler[1].classList.remove("rotateKare")
                            selectedkareler[1].style.background = "none"
                            selectedkareler = []
                        }, 1000)
                        yenildin.play()
                        yenildin.currentTime=0
                    }
                }
            }
        })
     })
}
drawboard()
