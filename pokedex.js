const BASE_URL="https://pokeapi.co/api/v2/pokemon/"
async function getMain(input){
    if (input){
        let img=document.getElementById("img").hidden=false
        fetch(`${BASE_URL}${input}/`).then(function(res){
            if (res.ok){
                document.getElementById("input").value=""
                res.json().then(main)
            }
            else{
                noSuch()
            }
        }).catch(failure)
    }
}
function failure(){
    let box=document.getElementById("stats")
    let img=document.getElementById("img")
    img.src="https://pm1.narvii.com/7234/01d92d685293d79b609b443da370c4ebad6ee280r1-800-450v2_uhq.jpg"
    img.style.width="40%"
    box.innerHTML="<h1>Oops, There was something wrong with our connection<h1>"
}

function noSuch(){
    let box=document.getElementById("stats")
    let img=document.getElementById("img")
    img.src="https://freestencilgallery.com/wp-content/uploads/2017/04/Pokemon-Psyduck-Silhouette-Stencil-thumb.jpg"
    img.style.width="40%"
    box.innerHTML="<h1>Oops, we didn't find this pokemon<h1>"
}

    
async function main(data){
    mainRender(data)
    getEvolution(data)
    
}

function mainRender(data){
    let box=document.getElementById("stats")
    let img=document.getElementById("img")
    let playground=document.getElementById("playground")
    playground.innerText=""
    box.innerText=`name: ${data.name}
    height: ${data.height}
    weight: ${data.weight}`
    box.appendChild(document.createElement("br"))
    data.types.forEach(function(type){
        let button=document.createElement("button")
        button.innerText=type.type.name
        button.addEventListener("click",getType)
        box.appendChild(button)
    })
    
    img.src=data.sprites.front_default
    img.style.width=25+data.height/145*25+"%"
    img.onmouseenter=function(e){
        e.target.src=data.sprites.back_default}
    img.onmouseleave=function(e){
        e.target.src=data.sprites.front_default}
}


async function getEvolution(data){
    let eChain= await fetch(data.species.url).then(res=>res.json()).then(res=>fetch(res.evolution_chain.url))
    .then(res=>res.json())
    let stage=eChain.chain
    function recurse(stage,count=0){
        let outcome=[]
        count+=1
        outcome.push([stage.species.name, count])
        if (stage.evolves_to.len==0) return outcome
        else{
            stage.evolves_to.forEach(x=>outcome=outcome.concat(recurse(x,count)))
        }
        return outcome
    }
    return recurse(stage)
}

async function getType(e){
    let type=e.target.innerText
    let typeData=await fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(res=>res.json())
    let list=typeData.pokemon.map(x=>x.pokemon.name)
    let playground=document.getElementById("playground")
    playground.innerText=""
    list.forEach(poke=>{
        let span=document.createElement("span")
        span.innerText=poke
        span.setAttribute("onclick","getMain(this.innerText)")
        playground.appendChild(span)
    })
}




let heights=[]
function funcThePolice(){
    let time=setInterval(checkH,1000)
    for (i=1;i<808;i++){
        getHim(i)
    }
}
async function getHim(a){
    fetch(`${BASE_URL}${a}/`).then(res=>res.json()).then(res=>{heights.push(res.height)})
}
function checkH(){
    if (heights.length==807){
        console.log(heights)
        console.log(Math.max(...heights))
    }
}
