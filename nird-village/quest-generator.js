const questTemplates = [
    {
        title: "L'Exode de {app}",
        desc: "Remplacer {app} par une alternative respectueuse de la vie privée.",
        xp: 50,
        diff: "easy",
        category: "software"
    },
    {
        title: "Le Bouclier {type}",
        desc: "Installer un {type} pour protéger votre navigateur.",
        xp: 30,
        diff: "easy",
        category: "security"
    },
    {
        title: "Détox Cloud",
        desc: "Migrer {size} de documents hors de {service}.",
        xp: 100,
        diff: "hard",
        category: "data"
    },
    {
        title: "Chasse aux GAFAM",
        desc: "Identifier et remplacer un service de {company} que vous utilisez.",
        xp: 70,
        diff: "medium",
        category: "awareness"
    },
    {
        title: "Lecture Souveraine",
        desc: "Lire un article sur {topic} pour améliorer vos connaissances.",
        xp: 20,
        diff: "easy",
        category: "knowledge"
    }
];

const questData = {
    software: {
        app: ["Google Chrome", "Microsoft Edge", "Safari", "Opera"]
    },
    security: {
        type: ["bloqueur de publicités", "gestionnaire de mots de passe", "VPN"]
    },
    data: {
        size: ["50 Mo", "100 Mo", "200 Mo"],
        service: ["Google Drive", "OneDrive", "Dropbox", "iCloud"]
    },
    awareness: {
        company: ["Google", "Amazon", "Facebook", "Apple", "Microsoft"]
    },
    knowledge: {
        topic: ["le RGPD", "les cookies tiers", "le chiffrement de bout en bout"]
    }
};

function generateQuest() {
    const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
    let title = template.title;
    let desc = template.desc;

    const category = template.category;
    const data = questData[category];

    for (const key in data) {
        const placeholder = `{${key}}`;
        const value = data[key][Math.floor(Math.random() * data[key].length)];
        title = title.replace(placeholder, value);
        desc = desc.replace(placeholder, value);
    }

    return {
        id: Math.random().toString(36).substring(2, 9),
        title,
        desc,
        xp: template.xp,
        diff: template.diff
    };
}

function generateQuests(count = 3) {
    const quests = [];
    for (let i = 0; i < count; i++) {
        quests.push(generateQuest());
    }
    return quests;
}

module.exports = { generateQuests };
