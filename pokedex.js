const BASE_URL="https://pokeapi.co/api/v2/pokemon/mew/"
async function getMain(){
    const data=await fetch(BASE_URL).then(res=>res.ok?res.json():"no such pokemon")
    console.log(data)
    return data
}

async function main(){
    const data=await getMain()
    getEvolution(data)
    mainRender(data)
    
    console.log(5+5)
}

function mainRender(data){
    let box=document.getElementById("data")
    let img=document.getElementById("img")
    box.innerText=`name: ${data.name}
    height: ${data.height}
    weight: ${data.weight}`
    data.types.forEach(function(type){
        let button=document.createElement("button")
        button.innerText=type.type.name
        box.appendChild(button)
    })
    img.src=data.sprites.front_default
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
    console.log(recurse(stage))
    return recurse(stage)
}

main()