export const instructionTemplates = {
    appraisalDimensions:
        {
            instructions_1: [
                {
                    type: 'text',
                    content: `I detta experiment kommer du att bedöma korta filmer där personer befinner sig i olika slags situationer som framkallar känslor.
                Din uppgift är att försöka tyda vilken slags situation personen befinner sig i
                och svara på följande frågor om den händelse som har orsakat känslan:`
                },
            ],
            instructions_2: [
                {
                    type: "text",
                    content: `Det bästa sättet att göra det är att ge ditt spontana svar utan att fundera för mycket.
                        Notera att personerna talar ett låtsasspråk, så du behöver inte försöka förstå vad de säger.
                        Fokusera istället på vad de uttrycker med ansikte, röst och kroppsrörelser.
                        Du kan spela upp samma video så många gånger som du vill och när du känner dig nöjd med ditt svar
                        så trycker du på skicka för att komma till nästa video!`
                },
                {
                    type: "text",
                    content: `Testet är uppbyggt enligt följande: Först kommer 3 exempel, 
                    efter varje videoklipp ska du välja en känsla, 
                    och efter du har sett exempelfilmerna kommer det riktiga testet att börja.`
                }
            ],
            example_round_instructions_2: [
                {
                    type: "text",
                    content: `Svara på följande frågor om den händelse som har orsakat känslan: 
                    1 motsvarar "Nej inte alls" och 5 motsvarar "Ja absolut!"`
                }
            ],
            experiment_round_instructions_2: [
                {
                    type: "text",
                    content: `Svara på följande frågor om den händelse som har orsakat känslan: 
                    1 motsvarar "Nej inte alls" och 5 motsvarar "Ja absolut!"`
                }
            ]
        },

    emotionDimensions:
        {
            instructions_1: [
                {
                    type: "text",
                    content: `Du kommer att behöva ungefär 15 minuter för att slutföra testet.
            Det är helt frivilligt att delta i studien och du kan när som helst välja att inte vara med längre, du behöver inte ange varför. 
            Genom att klicka på "Gå Vidare" nederst på sidan har du samtyckt till att delta och kan fortsätta. Om du inte vill delta, vänligen stäng ned testet.`
                },
                {
                    type: "text",
                    content: `Vänligen läs igenom instruktionerna innan du går vidare. `
                },
                {
                    type: "text",
                    content:
                        `Din uppgift är att titta på en serie korta inspelningar av personer som uttrycker blandade känslor. 
            Efter varje videoklipp ombeds du ange vilka två känslor som du anser att personen uttrycker. 
            Experimentet görs inte på tid och du kan spela upp klippen så många gånger du vill, 
            men försök att basera din bedömning på ditt första intryck. Du kommer bedöma totalt 40 videoklipp.
            Du gör din bedömning av hur tydligt du uppfattade de två olika känslorna på skalor 
            från 0 (inte alls framträdande) till 10 (mycket framträdande). 
            Det kommer finnas 5 olika skalor med olika känslor att välja på och du ska för varje klipp använda två av dessa skalor. 
            De fem känslor som ingår i studien förklaras nedan:`
                },
                {
                    type: "list",
                    content: [
                        `Ilska = En känsla av misshag eller motsättning ofta följd av en önskan att vedergälla.`,
                        `Glädje = Ett tillstånd av behagligt sinnesinnehåll, vilket härrör från framgång eller fullbordandet av något som anses vara bra`,
                        `Sorg = Känslan när du har förlorat något som var viktigt för dig.`,
                        `Äckel = Motvilja eller avsmak framkallad av det som är stötande, såsom dålig lukt eller mat.`,
                        `Rädsla = En känsla av oro orsakad av överhängande eller närvarande fara.`
                    ],
                }
            ],
            instructions_2: [
                {
                    type: "text",
                    content: `Innan det riktiga experimentet börjar, så kommer det tre övningsexempel.
                    Använd gärna hörlurar så att du hör ordentligt under testet.
                    Justera ljudet under övningsomgången och låt sedan ljudnivån vara konstant under resten av experimentet.
                    Starta övningsomgången genom att klicka på "Gå Vidare".`
                }
            ],
            example_round_instructions_1: [
            {
                type: "text",
                content: `Observera att du endast kan skicka svaret om du fyllt i två skjutknappar. Om du råkat fylla i mer än två skjutknappar så dra tillbaka de du inte vill ha med till 0.`
            },
        ],
            example_round_instructions_2: [
                {
                    type: "text",
                    content: `Vilka två känslor uttrycktes? Ange hur tydligt du uppfattade att de två olika känslorna framträdde med hjälp av skjutknapparna för respektive känslokategori. 
                    10 = Mycket framträdande, 5 = Ganska framträdande, 0 = Inte alls framträdande.`
                }
            ],
            experiment_round_instructions_2: [
                {
                    type: "text",
                    content: `Vilka två känslor uttrycktes? Ange hur tydligt du uppfattade att de två olika känslorna framträdde med hjälp av skjutknapparna för respektive känslokategori. 
                    10 = Mycket framträdande, 5 = Ganska framträdande, 0 = Inte alls framträdande.`
                }
            ]
        },
    emotionCategories: {
        instructions_1: [
            {
                type: "text",
                content: `Detta test har för avsikt att mäta din förmåga att känna igen känslouttryck i människors
                        ansikten och röster. Din uppgift är att titta / lyssna på en serie med korta audio-video inspelningar av personer
                        som uttrycker ett urval av olika känslor.`
            },
            {
                type: "text",
                content: `Efter varje uppspelning av dessa inspelningar du tittat på,
                        ombeds du att välja namnet på den känsla som personen uttrycker.
                        I just detta experiment kommer du att få välja mellan dessa känslor.

                        Känslorna presenteras som knappar där man kan välja svar genom att klicka.
                        Om man håller muspekaren över knappen så visas en kort beskrivning av känslan, se exempel:`
            }
        ],
        instructions_2: [
            {
                type: "text",
                content: `Efter varje inspelning måste du välja ett (men inte fler) känslo-ord för
                        att gå vidare. Det bästa sättet att göra det är att ge ditt spontana svar utan att fundera för mycket.
                        Notera att personerna talar ett låtsasspråk, så du behöver inte försöka förstå vad de säger.
                        Fokusera istället på vad de uttrycker med ansikte, röst och kroppsrörelser.
                        Du kan spela upp samma video så många gånger som du vill och när du har valt den känsla som
                        du tror visas av skådespelaren så trycker du på skicka för att komma till nästa video!`
            },
            {
                type: "text",
                content: `Testet är uppbyggt enligt följande: Först kommer 3 exempel, efter varje videoklipp ska du välja
                        en känsla, och efter du har sett exempelfilmerna kommer det riktiga testet att börja.`
            },
        ],
        example_round_instructions_1: [
            {
                type: "text",
                content: `Välj den känsla du ser i videon nedan. Du kommer att få skicka in svar på tre videor
                    i syfte att öva på hur det går till. När du svarat på tre video kommer du att kunna gå vidare till det verkliga experimentet.
                    Tänk på att:`
            },
            {
                type: "list",
                content: ["Genom att hålla musen över ett svarsalternativ så får du en beskrivning av känslan.",
                    "Du kan inte skicka svaret förrän du spelat hela videon från början till slut.",
                    "Du kan inte skicka svaret förrän du valt svarsalternativ."
                ]
            },

        ],
    },
    emotionCategoriesAudio: {
        instructions_1: [
            {
                type: "text",
                content: `Detta test har för avsikt att mäta din förmåga att känna igen känslouttryck i människors
                        röster. Din uppgift är att lyssna på en serie med korta audio inspelningar av personer
                        som uttrycker ett urval av olika känslor.`
            },
            {
                type: "text",
                content: `Efter varje uppspelning av dessa inspelningar du tittat på,
                        ombeds du att välja namnet på den känsla som personen uttrycker.
                        I just detta experiment kommer du att få välja mellan dessa känslor.

                        Känslorna presenteras som knappar där man kan välja svar genom att klicka.
                        Om man håller muspekaren över knappen så visas en kort beskrivning av känslan, se exempel:`
            }
        ],
        instructions_2: [
            {
                type: "text",
                content: `Efter varje inspelning måste du välja ett (men inte fler) känslo-ord för
                        att gå vidare. Det bästa sättet att göra det är att ge ditt spontana svar utan att fundera för mycket.
                        Notera att personerna talar ett låtsasspråk, så du behöver inte försöka förstå vad de säger.
                        Fokusera istället på vad de uttrycker med röst, tonläge etc.
                        Du kan spela upp samma klipp så många gånger som du vill och när du har valt den känsla som
                        du tror visas av skådespelaren så trycker du på skicka för att komma till nästa klipp!`
            },
            {
                type: "text",
                content: `Testet är uppbyggt enligt följande: Först kommer 3 exempel, efter varje klipp ska du välja
                        en känsla, och efter du har sett exempelfilmerna kommer det riktiga testet att börja.`
            },
        ],
        example_round_instructions_1: [
            {
                type: "text",
                content: `Välj den känsla du ser i klippet nedan. Du kommer att få skicka in svar på tre klipp
                    i syfte att öva på hur det går till. När du svarat på tre klipp kommer du att kunna gå vidare till det verkliga experimentet.
                    Tänk på att:`
            },
            {
                type: "list",
                content: ["Genom att hålla musen över ett svarsalternativ så får du en beskrivning av känslan.",
                    "Du kan inte skicka svaret förrän du spelat hela klippet från början till slut.",
                    "Du kan inte skicka svaret förrän du valt svarsalternativ."
                ]
            },

        ],
    },
    emotionCategoriesVideo: {
        instructions_1: [
            {
                type: "text",
                content: `Detta test har för avsikt att mäta din förmåga att känna igen känslouttryck i människors
                        ansikten och röster. Din uppgift är att titta på en serie med korta video inspelningar av personer
                        som uttrycker ett urval av olika känslor.`
            },
            {
                type: "text",
                content: `Efter varje uppspelning av dessa inspelningar du tittat på,
                        ombeds du att välja namnet på den känsla som personen uttrycker.
                        I just detta experiment kommer du att få välja mellan dessa känslor.

                        Känslorna presenteras som knappar där man kan välja svar genom att klicka.
                        Om man håller muspekaren över knappen så visas en kort beskrivning av känslan, se exempel:`
            }
        ],
        instructions_2: [
            {
                type: "text",
                content: `Efter varje inspelning måste du välja ett (men inte fler) känslo-ord för
                        att gå vidare. Det bästa sättet att göra det är att ge ditt spontana svar utan att fundera för mycket.
                        Fokusera istället på vad de uttrycker med ansikte och kroppsrörelser.
                        Du kan spela upp samma video så många gånger som du vill och när du har valt den känsla som
                        du tror visas av skådespelaren så trycker du på skicka för att komma till nästa video!`
            },
            {
                type: "text",
                content: `Testet är uppbyggt enligt följande: Först kommer 3 exempel, efter varje videoklipp ska du välja
                        en känsla, och efter du har sett exempelfilmerna kommer det riktiga testet att börja.`
            },
        ],
        example_round_instructions_1: [
            {
                type: "text",
                content: `Välj den känsla du ser i videon nedan. Du kommer att få skicka in svar på tre videor
                    i syfte att öva på hur det går till. När du svarat på tre video kommer du att kunna gå vidare till det verkliga experimentet.
                    Tänk på att:`
            },
            {
                type: "list",
                content: ["Genom att hålla musen över ett svarsalternativ så får du en beskrivning av känslan.",
                    "Du kan inte skicka svaret förrän du spelat hela videon från början till slut.",
                    "Du kan inte skicka svaret förrän du valt svarsalternativ."
                ]
            },

        ],
    },
};