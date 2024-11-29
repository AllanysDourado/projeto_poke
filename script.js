let isAnimating = false; // Variável para rastrear se a animação está em andamento


document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('startButton').style.display = 'none'; // Esconde o botão "Iniciar"
    document.querySelector('.loading-container').style.visibility = 'visible'; // Mostra o carregamento

    toggleOpen();

    // Oculta o ícone de carregamento após 10 segundos
    setTimeout(function () {
        document.querySelector('.loading-container').style.visibility = 'hidden';
    }, 10000);
});

function toggleOpen() {
    const pokeballContainer = document.querySelector('.pokeball-container');
    const navbar = document.querySelector('.navbar');
    const inicio = document.getElementById('inicio');
    const funcionalidades = [
        document.getElementById('funcionalidade1'),
        document.getElementById('funcionalidade2'),
        document.getElementById('funcionalidade3')
    ];

    if (isAnimating) return; // Evita múltiplas interações durante a animação

    if (!pokeballContainer.classList.contains('open')) {
        pokeballContainer.classList.toggle('open'); // Abre a Pokébola

        const audio1 = document.getElementById('audio1');
        const audio2 = document.getElementById('audio2');
        const audio3 = document.getElementById('audio3');

        // Toca o áudio 1
        audio1.play().catch(error => console.error('Erro ao reproduzir áudio 1:', error));

        // Após o término do áudio 1
        audio1.addEventListener('ended', () => {
            // Remove a classe `hidden` e adiciona a classe `show` para exibir a div "inicio"
            inicio.classList.remove('hidden');
            inicio.classList.add('show');

            // Centraliza a `div inicio` na tela
            inicio.scrollIntoView({ behavior: 'smooth' });

            // Inicia o áudio 2
            audio2.play().catch(error => console.error('Erro ao reproduzir áudio 2:', error));
        });

        // Após o término do áudio 2
        audio2.addEventListener('ended', () => {
            audio3.loop = true; // Define o áudio 3 para repetir
            audio3.play().catch(error => console.error('Erro ao reproduzir áudio 3:', error));
        });

        isAnimating = true; // Bloqueia novas interações durante a animação

        // Após 10 segundos, desaparece a Pokébola e mostra outros elementos
        setTimeout(() => {
            pokeballContainer.classList.add('fade-out');

            setTimeout(() => {
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('show');
                document.querySelectorAll('.navbar-logo, .nav-item').forEach(item => {
                    item.classList.remove('nav-hidden');
                });

                funcionalidades.forEach(funcionalidade => funcionalidade.classList.remove('hide-funcionalidade'));
                isAnimating = false; // Permite novas interações
            }, 800);
        }, 10000);
    }
}


document.getElementById("buttonFuncao1").addEventListener("click", () => {
    const funcionalidade1 = document.getElementById("funcionalidade1");
    const offset = 100; // ajuste conforme a altura da navbar
    const elementPosition = funcionalidade1.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
});


const navbarItems = document.querySelectorAll('.nav-item a');
const pokeballIndicator = document.getElementById('pokeballIndicator');
const offset = 100; // ajuste para a altura da navbar

navbarItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        const targetId = item.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Atualiza a posição do indicador Pokébola (caso ainda queira mantê-lo)
        const itemPosition = item.getBoundingClientRect();
        pokeballIndicator.style.left = `${itemPosition.left + itemPosition.width / 2 - 20}px`; // Ajusta a posição
        pokeballIndicator.style.display = 'block'; // Mostra o ícone
    });
});

// Código JavaScript para mostrar/ocultar o input
document.querySelectorAll(".toggle-input-icon").forEach(icon => {
    icon.addEventListener("click", function () {
        const input = this.nextElementSibling; // Seleciona o input ao lado do ícone
        if (input.style.display === "none" || input.style.display === "") {
            input.style.display = "block";
            input.focus();
        } else {
            input.style.display = "none";
        }
    });
});

//Funcionalidades
/*
let sugestaoPoke =[]
const listaPoke = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`);
            const pokenames = await response.json();

            sugestaoPoke = pokenames.results.map(pokemon => pokemon.name);
            sugestaoPoke.sort();
            console.log(sugestaoPoke); 
        } catch (error) {
        console.error("Erro ao buscar os Pokémon:", error);
        }

        const datalist = document.getElementById('pokemons');
        datalist.innerHTML = ''; // Limpa as opções anteriores
        sugestaoPoke.forEach(name => {
            const option = document.createElement('option');
            option.value = name;  
            option.textContent = name;
            datalist.appendChild(option); 
        });
    };
    
listaPoke();

const input = document.getElementById('poke1');
input.addEventListener('focus', () => {
    const datalist = document.getElementById('pokemons');
    datalist.style.display = 'block';  // Garante que as opções sejam mostradas
});
*/

//Cores de back para os pokemons de acordo com suas classes
//funcao 1
const procurarPoke1 = async () => {
    try {
        const input = document.getElementById('poke1');
        input.addEventListener('input', async function () {
            poke1value = input.value.toLowerCase();
            console.log(`${poke1value}`);
            if (poke1value) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1value}`);
                    const poke1data = await response.json();
                    console.log(poke1data);
                    // extrai o ID
                    const ID = poke1data.id;
                    //extrair o tipo do pokemon
                    const tipoPoke1 = poke1data.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke1)

                    // Extrai as stats
                    const stats = poke1data.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));
                    console.log(stats)
                    let hp = stats.find(stat => stat.name === "hp").value;
                    let ataque = stats.find(stat => stat.name === "attack").value;
                    let ataqueEspecial = stats.find(stat => stat.name === "special-attack").value;
                    let defesa = stats.find(stat => stat.name === "defense").value;
                    let defesaEspecial = stats.find(stat => stat.name === "special-defense").value;
                    let velo = stats.find(stat => stat.name === "speed").value;

                    containerpokemon1.innerHTML = ` 
                <div class="pokemon1 ${tipoPoke1}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png">
                </div> 
                <p class="pokemon-texto1" id="habilidadesPoke1"></p>`;
                    habilidadesPoke1.innerHTML = `
                    <h3>${poke1data.name}</h3>
                    <p>tipo: ${tipoPoke1}</p>
                    <p>hp:${hp}</p>
                    <p>ataque:${ataque}</p>
                    <p>ataque especial :${ataqueEspecial}</p>
                    <p>defesa:${defesa}</p>
                    <p>defesa especial :${defesaEspecial}</p>
                    <p>velocidade:${velo}</p>`
                } catch (fetchError) {
                    console.error("Erro ao buscar os Pokémon:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
};
procurarPoke1();


const procurarPoke2 = async () => {
    try {
        const input = document.getElementById('poke2');
        input.addEventListener('input', async function () {
            poke2value = input.value.toLowerCase();
            console.log(poke2value);
            if (poke2value) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2value}`);
                    const poke2data = await response.json();
                    console.log(poke2data);

                    const ID = poke2data.id;
                    //extrair o tipo do pokemon
                    const tipoPoke2 = poke2data.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke2)
                    // Extrai as stats
                    const stats = poke2data.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));
                    console.log(stats)
                    let hp = stats.find(stat => stat.name === "hp").value;
                    let ataque = stats.find(stat => stat.name === "attack").value;
                    let ataqueEspecial = stats.find(stat => stat.name === "special-attack").value;
                    let defesa = stats.find(stat => stat.name === "defense").value;
                    let defesaEspecial = stats.find(stat => stat.name === "special-defense").value;
                    let velo = stats.find(stat => stat.name === "speed").value;

                    console.log(hp, ataque)

                    containerpokemon2.innerHTML = ` 
                <div class="pokemon2 ${tipoPoke2}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png">
                </div> 
                <p class="pokemon-texto2" id="habilidadesPoke2"></p>`;
                    habilidadesPoke2.innerHTML = `
                    <h3>${poke2data.name}</h3>
                    <p>tipo: ${tipoPoke2}</p>
                    <p>hp:${hp}</p>
                    <p>ataque:${ataque}</p>
                    <p>ataque especial :${ataqueEspecial}</p>
                    <p>defesa:${defesa}</p>
                    <p>defesa especial :${defesaEspecial}</p>
                    <p>velocidade:${velo}</p>`


                } catch (fetchError) {
                    console.error("Erro ao buscar os Pokémon:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
};
procurarPoke2();
// Funcionalidade 2

const arvoreEvoloucao = async () => {
    try {
        const input = document.getElementById('pokeArvore');
        input.addEventListener('input', async function () {
            pokeArvorevalue = input.value.toLowerCase();
            console.log(pokeArvorevalue);
            if (pokeArvorevalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeArvorevalue}`);
                    const pokeArvoredata = await response.json();
                    console.log(pokeArvoredata);

                    const urlEvolucao = pokeArvoredata.evolution_chain.url;
                    console.log(urlEvolucao)

                    const responseEvolucao = await fetch(urlEvolucao)
                    const evolucaodata = await responseEvolucao.json()
                    console.log(evolucaodata)
                    //Armazena as evolucoes do pokemon
                    const cadeiaEvolucao = [];
                    //Ponto de partida da evolucao do poke
                    let evolucoes = evolucaodata.chain;

                    do {
                        const nivelPokemon = {
                            name: evolucoes.species.name,
                            evolves_at: null,
                        };


                        if (evolucoes.evolves_to.length > 0) {
                            const details = evolucoes.evolves_to[0].evolution_details[0];

                            if (details && details.min_level !== null) {
                                nivelPokemon.evolves_at = details.min_level;
                            }
                        }

                        cadeiaEvolucao.push(nivelPokemon);

                        evolucoes = evolucoes.evolves_to[0];
                    } while (evolucoes);

                    console.log(cadeiaEvolucao)


                    // Poke1 da arvore
                    const responsepoke1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${cadeiaEvolucao[0].name}`)
                    const evolucao1 = await responsepoke1.json()
                    console.log(evolucao1)
                    const IDv1 = evolucao1.id
                    const tipoevolu1 = evolucao1.types.map(type => type.type.name).join("-");
                    containerpokemon1_2.innerHTML = `
                    <div class="pokemon1-2 ${tipoevolu1}"> 
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IDv1}.png">
                    </div>
                    <h3 class="pokemon-texto1-2">${evolucao1.name}</h3>
                    <h3 class="pokemon-texto1-2">LvL: 0</h3>
                    `
                    if (cadeiaEvolucao.length === 1) {
                        containerpokemon2_2.innerHTML = "";
                        containerpokemon3_2.innerHTML = "";
                    } else {
                        // poke2 da arvore 
                        const responsepoke2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${cadeiaEvolucao[1].name}`)
                        const evolucao2 = await responsepoke2.json()
                        console.log(evolucao2)
                        const IDv2 = evolucao2.id
                        const tipoevolu2 = evolucao2.types.map(type => type.type.name).join("-");
                        containerpokemon2_2.innerHTML = `
                    <div class="pokemon2-2 ${tipoevolu2}"> 
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IDv2}.png">
                    </div>
                    <h3 class="pokemon-texto2-2">${evolucao2.name}</h3>
                    <h3 class="pokemon-texto2-2">LvL: ${cadeiaEvolucao[0].evolves_at}</h3>`
                    }
                    if (cadeiaEvolucao.length === 2) {
                        containerpokemon3_2.innerHTML = "";

                    } else {
                        // poke 3 da arvore
                        const responsepoke3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${cadeiaEvolucao[2].name}`)
                        const evolucao3 = await responsepoke3.json()
                        console.log(evolucao3)
                        const IDv3 = evolucao3.id
                        const tipoevolu3 = evolucao3.types.map(type => type.type.name).join("-");
                        containerpokemon3_2.innerHTML = `
                    <div class="pokemon3-2 ${tipoevolu3}"> 
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IDv3}.png">
                    </div>
                    <h3 class="pokemon-texto3-2">${evolucao3.name}</h3>
                    <h3 class="pokemon-texto3-2">LvL: ${cadeiaEvolucao[1].evolves_at}</h3>
                    `
                    }
                } catch (fetchError) {
                    console.error("Erro ao buscar os Pokémon:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
};
arvoreEvoloucao();


//Funcionalidade 3

const construirEquipe = async () => {
let somaHp = 0;
let somaAtaque = 0;
let somaAtaqueEspecial = 0;
let somaDefesa = 0;
let somaDefesaEspecial = 0;
let quant = 0;
 
    // Poke1 da equipe
    try {
        const input = document.getElementById('poke1-eqp');
        input.addEventListener('input', async function () {
            poke1eqpvalue = input.value.toLowerCase();
            if (poke1eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1eqpvalue}`);
                    const poke1eqpdata = await response.json();
                    const ID = poke1eqpdata.id;
                    const tipoPoke1eqp = poke1eqpdata.types.map(type => type.type.name).join("-");

                    pokemon1eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon1-3 ${tipoPoke1eqp}">`

                    const stats1 = poke1eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    let hp1 = stats1.find(stat => stat.name === "hp").value;
                    let ataque1 = stats1.find(stat => stat.name === "attack").value;
                    let ataqueEspecial1 = stats1.find(stat => stat.name === "special-attack").value;
                    let defesa1 = stats1.find(stat => stat.name === "defense").value;
                    let defesaEspecial1 = stats1.find(stat => stat.name === "special-defense").value;

                    
                    somaHp += hp1;
                    somaAtaque += ataque1;
                    somaAtaqueEspecial += ataqueEspecial1;
                    somaDefesa += defesa1;
                    somaDefesaEspecial += defesaEspecial1;

                    quant++;

                    console.log(`HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);
                } catch (fetchError) {
                    console.error("Erro ao buscar os Pokémon1:", fetchError);
                }
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
    try {
        const input = document.getElementById('poke2-eqp');
        input.addEventListener('input', async function () {
            poke2eqpvalue = input.value.toLowerCase();
            console.log(poke2eqpvalue);
            if (poke2eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2eqpvalue}`);
                    const poke2eqpdata = await response.json();
                    console.log(poke2eqpdata);

                    const ID = poke2eqpdata.id;
                    const tipoPoke2eqp = poke2eqpdata.types.map(type => type.type.name).join("-");
                    pokemon2eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon2-3 ${tipoPoke2eqp}">`
                    const stats2 = poke2eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));
                    
                    console.log(stats2)
                    let hp2 = stats2.find(stat => stat.name === "hp").value;
                    let ataque2 = stats2.find(stat => stat.name === "attack").value;
                    let ataqueEspecial2 = stats2.find(stat => stat.name === "special-attack").value;
                    let defesa2 = stats2.find(stat => stat.name === "defense").value;
                    let defesaEspecial2 = stats2.find(stat => stat.name === "special-defense").value;
                    somaHp += hp2;
                    somaAtaque += ataque2;
                    somaAtaqueEspecial += ataqueEspecial2;
                    somaDefesa += defesa2;
                    somaDefesaEspecial += defesaEspecial2; 
                    quant++;
                    console.log(`HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);                  
                } catch (fetchError) {
                    console.error("Erro ao buscar os Pokémon2:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
    try {
        const input = document.getElementById('poke3-eqp');
        input.addEventListener('input', async function () {
            poke3eqpvalue = input.value.toLowerCase();
            console.log(poke3eqpvalue);
            if (poke3eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke3eqpvalue}`);
                    const poke3eqpdata = await response.json();
                    console.log(poke3eqpdata);

                    const ID = poke3eqpdata.id;

                    const tipoPoke3eqp = poke3eqpdata.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke3eqp);

                    pokemon3eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon3-3  ${tipoPoke3eqp}">`
                    const stats3 = poke3eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    console.log(stats3)
                    let hp3 = stats3.find(stat => stat.name === "hp").value;
                    let ataque3 = stats3.find(stat => stat.name === "attack").value;
                    let ataqueEspecial3 = stats3.find(stat => stat.name === "special-attack").value;
                    let defesa3 = stats3.find(stat => stat.name === "defense").value;
                    let defesaEspecial3 = stats3.find(stat => stat.name === "special-defense").value;

                    somaHp += hp3;
                    somaAtaque += ataque3;
                    somaAtaqueEspecial += ataqueEspecial3;
                    somaDefesa += defesa3;
                    somaDefesaEspecial += defesaEspecial3; 
                    quant++;
                    console.log(`Somas atuais: HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);
                } catch (fetchError) {
                    console.error("Erro ao buscar o Pokémon3:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }

    try {
        const input = document.getElementById('poke4-eqp');
        input.addEventListener('input', async function () {
            poke4eqpvalue = input.value.toLowerCase();
            console.log(poke4eqpvalue);
            if (poke4eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke4eqpvalue}`);
                    const poke4eqpdata = await response.json();
                    console.log(poke4eqpdata);

                    const ID = poke4eqpdata.id;
                    const tipoPoke4eqp = poke4eqpdata.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke4eqp);

                    pokemon4eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon4-3 ${tipoPoke4eqp}">`
                    const stats4 = poke4eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    console.log(stats4)
                    let hp4 = stats4.find(stat => stat.name === "hp").value;
                    let ataque4 = stats4.find(stat => stat.name === "attack").value;
                    let ataqueEspecial4 = stats4.find(stat => stat.name === "special-attack").value;
                    let defesa4 = stats4.find(stat => stat.name === "defense").value;
                    let defesaEspecial4 = stats4.find(stat => stat.name === "special-defense").value;
                    somaHp += hp4;
                    somaAtaque += ataque4;
                    somaAtaqueEspecial += ataqueEspecial4;
                    somaDefesa += defesa4;
                    somaDefesaEspecial += defesaEspecial4; 
                    quant++;
                    console.log(`Somas atuais: HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);
                } catch (fetchError) {
                    console.error("Erro ao buscar o Pokémon4:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
    try {
        const input = document.getElementById('poke5-eqp');
        input.addEventListener('input', async function () {
            poke5eqpvalue = input.value.toLowerCase();
            console.log(poke5eqpvalue);
            if (poke5eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke5eqpvalue}`);
                    const poke5eqpdata = await response.json();
                    console.log(poke5eqpdata);

                    const ID = poke5eqpdata.id;
                    const tipoPoke5eqp = poke5eqpdata.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke5eqp);

                    pokemon5eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon5-3 ${tipoPoke5eqp}">`
                    const stats5 = poke5eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    console.log(stats5)
                    let hp5 = stats5.find(stat => stat.name === "hp").value;
                    let ataque5 = stats5.find(stat => stat.name === "attack").value;
                    let ataqueEspecial5 = stats5.find(stat => stat.name === "special-attack").value;
                    let defesa5 = stats5.find(stat => stat.name === "defense").value;
                    let defesaEspecial5 = stats5.find(stat => stat.name === "special-defense").value;
                    somaHp += hp5;
                    somaAtaque += ataque5;
                    somaAtaqueEspecial += ataqueEspecial5;
                    somaDefesa += defesa5;
                    somaDefesaEspecial += defesaEspecial5;
                    quant++; 
                    console.log(`Somas atuais: HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);
                } catch (fetchError) {
                    console.error("Erro ao buscar o Pokémon5:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
    try {
        const input = document.getElementById('poke6-eqp');
        input.addEventListener('input', async function () {
            poke6eqpvalue = input.value.toLowerCase();
            console.log(poke6eqpvalue);
            if (poke6eqpvalue) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke6eqpvalue}`);
                    const poke6eqpdata = await response.json();
                    console.log(poke6eqpdata);

                    const ID = poke6eqpdata.id;

                    const tipoPoke6eqp = poke6eqpdata.types.map(type => type.type.name).join("-");
                    console.log(tipoPoke6eqp);

                    pokemon6eqp.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png" class="pokemon6-3 ${tipoPoke6eqp}">                   `
                    const stats6 = poke6eqpdata.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    console.log(stats6)
                    let hp6 = stats6.find(stat => stat.name === "hp").value;
                    let ataque6 = stats6.find(stat => stat.name === "attack").value;
                    let ataqueEspecial6 = stats6.find(stat => stat.name === "special-attack").value;
                    let defesa6 = stats6.find(stat => stat.name === "defense").value;
                    let defesaEspecial6 = stats6.find(stat => stat.name === "special-defense").value;
                    somaHp += hp6;
                    somaAtaque += ataque6;
                    somaAtaqueEspecial += ataqueEspecial6;
                    somaDefesa += defesa6;
                    somaDefesaEspecial += defesaEspecial6; 
                    quant++;
                    console.log(`Somas atuais: HP = ${somaHp}, Ataque = ${somaAtaque}, Ataque Especial = ${somaAtaqueEspecial}, Defesa = ${somaDefesa}, Defesa Especial = ${somaDefesaEspecial}`);
                    const botaoCalcular = document.getElementById('calcular-media');
                    botaoCalcular.addEventListener('click', () => {
                        if (quant === 0) {
                        alert('Preencha todos os membros da equipe');
                    } else {
                                const mediaHp = Math.round(somaHp / quant);
                                const mediaAtaque = Math.round(somaAtaque / quant);
                                const mediaAtaqueEspecial = Math.round(somaAtaqueEspecial / quant);
                                const mediaDefesa = Math.round(somaDefesa / quant);
                                const mediaDefesaEspecial = Math.round(somaDefesaEspecial / quant);
                        
                                mediaValores.innerHTML = `
                                
                                    <p>Ataque: ${mediaAtaque}</p>
                                    <p>Ataque Especial: ${mediaAtaqueEspecial}</p>
                                    <p>Defesa: ${mediaDefesa}</p>
                                    <p>Defesa Especial: ${mediaDefesaEspecial}</p>
                                `;
                        }
                    });
                    
                } catch (fetchError) {
                    console.error("Erro ao buscar o Pokémon6:", fetchError);
                }
            } else {
                console.log("O campo de entrada está vazio.");
            }
        });
    } catch (error) {
        console.error("Erro:", error);
    }
};

construirEquipe();
