async function getData(number_request) {
    const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
    const data = await response.json();
    
    selectioned_list= []
    for (var i = 0; i < number_request; i++) {

        selectioned_list.push('https://www.dnd5eapi.co'+data.results[i].url)
         
    }

    const promises = selectioned_list.map(async (value) => {
    const full_data_selectioned = await fetch(value);
    return full_data_selectioned.json();
    });


    const resultados = await Promise.all(promises);
    speed_values =[]
    for (var i = 0; i < number_request; i++) {
        speed=[parseInt(resultados[i].speed.walk?.split(" ")[0]), parseInt(resultados[i].speed.fly?.split(" ")[0]), parseInt(resultados[i].speed.swim?.split(" ")[0])]
         console.log({"index": resultados[i].index,
                      "name": resultados[i].name,
                      "size": resultados[i].size,
                      "type": resultados[i].type,
                      "alignment": resultados[i].alignment,
                      "cr": resultados[i].challenge_rating,
                      "ac": resultados[i].armor_class[0].value,
                      "hp": resultados[i].hit_points,
                      "speed": Math.max(...speed.filter(Number)),
                      "stats": { "strength": resultados[i].strength,
                                "dexterity": resultados[i].dexterity,
                                "constitution": resultados[i].constitution,
                                "intelligence": resultados[i].intelligence,
                                "wisdom": resultados[i].wisdom,
                                "charisma": resultados[i].charisma

                      },
                      "immuneCount": resultados[i].damage_immunities.length,
                      "resistCount": resultados[i].damage_resistances.length,
                      "vulnCount": resultados[i].damage_vulnerabilities.length,
                      "hasLegendary": resultados[i].legendary_actions?.length > 0
         });
    }
    



    

}

getData(5)
