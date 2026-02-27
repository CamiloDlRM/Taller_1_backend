async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
        const datos = await respuesta.json();
        const first40 = datos.results.slice(0, 40);

        const monsters = await Promise.all(
            first40.map(m => fetch(`https://www.dnd5eapi.co${m.url}`).then(res => res.json()))
        );

        const MonsterStrong = monsters.filter(m => m.challenge_rating >= 5 && m.hit_points >= 80);
        const typeMonster = monsters.find(m => m.type === "dragon" && m.challenge_rating >= 6);
        const LegendaryMonster = monsters.some(m => m.legendary_actions?.length > 0);
        
        const StatsMonster = monsters.every(m => {
            const hasStats = m.strength && m.dexterity && m.constitution && m.intelligence && m.wisdom && m.charisma;
            return hasStats && m.hit_points > 0;
        });

        console.log("Monsters:", monsters);
        console.log("Strong:", MonsterStrong);
        console.log("Dragon Type:", typeMonster);
        console.log("Has Legendary:", LegendaryMonster);
        console.log("Stats Complete:", StatsMonster);

    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerDatos();
