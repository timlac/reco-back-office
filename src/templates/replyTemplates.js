export const replyTemplates = {

    appraisalDimensions: {
        reply_structure: "dimensions",
        required_replies: 6,
        maximum_replies: 6,
        zero_is_valid_reply: true,
        dimensions:
            [
                {
                    label: "Novelty",
                    description: "Skedde händelsen plötsligt och abrupt?",
                    // markStart: 1,
                    marks: 5
                },
                {
                    label: "Pleasantness",
                    description: "Var händelsen behaglig?",
                    // markStart: 1,
                    marks: 5
                },
                {
                    label: "Goal conduciveness",
                    description: "Hjälpte händelsen personen att uppnå ett mål eller uppfylla ett behov?",
                    // markStart: 1,
                    marks: 5
                },
                {
                    label: "Urgency",
                    description: "Krävde händelsen att personen svarade med brådskande åtgärder?",
                    // markStart: 1,
                    marks: 5
                },
                {
                    label: "Power",
                    description: "Kunde personen påverka händelsens utfall genom sina handlingar?",
                    // markStart: 1,
                    marks: 5
                },
                {
                    label: "Norm compatibility",
                    description: "Stämde händelsen överens med personens normer och värderingar?",
                    // markStart: 1,
                    marks: 5
                }
            ]
    },
    emotionDimensions: {
        reply_structure: "dimensions",
        required_replies: 2,
        maximum_replies: 2,
        zero_is_valid_reply: false,
        dimensions:
            [
                {
                    label: "anger",
                    description: "Ilska",
                    marks: 10
                },
                {
                    label: "happiness_joy",
                    description: "Glädje",
                    marks: 10
                },
                {
                    label: "sadness",
                    description: "Sorg",
                    marks: 10
                },
                {
                    label: "disgust",
                    description: "Äckel",
                    marks: 10
                },
                {
                    label: "fear",
                    description: "Rädsla",
                    marks: 10
                }
            ]
    },
    emotionCategories: {
        reply_structure: "categories"
    }
}