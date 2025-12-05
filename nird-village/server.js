const express = require('express');
const app = express();
const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (optional, if you add local images/css later)
app.use(express.static('public'));

// --- MOCK DATA (The "Village" Database) ---
const { generateQuests } = require('./quest-generator');

// --- MOCK DATA (The "Village" Database) ---
let villageData = {
    stats: {
        level: 1,
        currentXP: 0,
        nextLevelXP: 100,
        rank: "Éveillé Digital",
        sovereigntyScore: 50, // Percentage
        co2Saved: "0kg"
    },
    alerts: [
        { type: 'info', msg: "Bienvenue ! Accomplissez des quêtes pour améliorer le village." }
    ],
    levelRanks: {
        1: "Éveillé Digital",
        2: "Protecteur Numérique",
        3: "Gardien des Données",
        4: "Défenseur de la Vie Privée",
        5: "Maître de la Souveraineté"
    }
};

let quests = generateQuests();

const armory = {
    student: [
        {
            name: "Firefox",
            icon: "fa-brands fa-firefox-browser",
            desc: "Navigateur rapide qui ne vend pas ton historique.",
            replaces: "Google Chrome",
            link: "https://www.mozilla.org/fr/firefox/new/"
        },
        {
            name: "Qwant",
            icon: "fa-solid fa-magnifying-glass",
            desc: "Le moteur de recherche qui ne te trace pas.",
            replaces: "Google Search",
            link: "https://www.qwant.com/"
        },
        {
            name: "Signal",
            icon: "fa-solid fa-comment-dots",
            desc: "Messagerie chiffrée. Pas de pub, pas de mouchards.",
            replaces: "WhatsApp",
            link: "https://signal.org/fr/"
        },
        {
            name: "VLC",
            icon: "fa-solid fa-play",
            desc: "Le cône orange qui lit absolument toutes les vidéos.",
            replaces: "Windows Media Player",
            link: "https://www.videolan.org/"
        },
        {
            name: "Bitwarden",
            icon: "fa-solid fa-key",
            desc: "Génère et stocke tes mots de passe en sécurité.",
            replaces: "Mots de passe '123456'",
            link: "https://bitwarden.com/"
        },
        {
            name: "CryptPad",
            icon: "fa-solid fa-file-shield",
            desc: "Suite collaborative chiffrée pour tes exposés.",
            replaces: "Google Docs",
            link: "https://cryptpad.fr/"
        },
        {
            name: "Minetest",
            icon: "fa-solid fa-cubes",
            desc: "Jeu 'bac à sable' infini, gratuit et open source.",
            replaces: "Minecraft",
            link: "https://www.minetest.net/"
        },
        {
            name: "NewPipe",
            icon: "fa-brands fa-youtube",
            desc: "Client YouTube léger, sans pub et arrière-plan.",
            replaces: "App YouTube",
            link: "https://newpipe.net/"
        },
        {
            name: "Proton Mail",
            icon: "fa-solid fa-envelope",
            desc: "Email sécurisé basé en Suisse. Vie privée garantie.",
            replaces: "Gmail",
            link: "https://proton.me/mail"
        }
    ],
    teacher: [
        {
            name: "LibreOffice",
            icon: "fa-solid fa-file-word",
            desc: "Suite bureautique complète (Texte, Diapos, Calc).",
            replaces: "Microsoft Office",
            link: "https://fr.libreoffice.org/"
        },
        {
            name: "BigBlueButton",
            icon: "fa-solid fa-chalkboard-user",
            desc: "La classe virtuelle pensée pour l'enseignement.",
            replaces: "Zoom / Teams",
            link: "https://bigbluebutton.org/"
        },
        {
            name: "PeerTube",
            icon: "fa-solid fa-video",
            desc: "Hébergez vos vidéos pédagogiques sans pubs ni algo.",
            replaces: "YouTube",
            link: "https://joinpeertube.org/fr/"
        },
        {
            name: "Moodle",
            icon: "fa-solid fa-graduation-cap",
            desc: "Plateforme d'apprentissage (LMS) mondiale.",
            replaces: "Google Classroom",
            link: "https://moodle.org/"
        },
        {
            name: "Zotero",
            icon: "fa-solid fa-book-bookmark",
            desc: "Gérez vos bibliographies et sources de recherche.",
            replaces: "Gestion manuelle",
            link: "https://www.zotero.org/"
        },
        {
            name: "Xournal++",
            icon: "fa-solid fa-pen-nib",
            desc: "Annotez des PDF et écrivez à la main.",
            replaces: "Adobe Reader Pro",
            link: "https://xournalpp.github.io/"
        },
        {
            name: "OBS Studio",
            icon: "fa-solid fa-video-camera",
            desc: "Enregistrez vos cours ou diffusez en direct.",
            replaces: "Logiciels propriétaires",
            link: "https://obsproject.com/fr"
        },
        {
            name: "Jitsi Meet",
            icon: "fa-solid fa-phone-video",
            desc: "Visioconférence instantanée sans compte.",
            replaces: "Skype",
            link: "https://meet.jit.si/"
        },
        {
            name: "Scribus",
            icon: "fa-solid fa-newspaper",
            desc: "Mise en page professionnelle (PAO).",
            replaces: "Adobe InDesign",
            link: "https://www.scribus.net/"
        }
    ],
    admin: [
        {
            name: "Linux Mint",
            icon: "fa-brands fa-linux",
            desc: "Système léger pour ressusciter les vieux PC.",
            replaces: "Windows 10/11",
            link: "https://linuxmint.com/"
        },
        {
            name: "Nextcloud",
            icon: "fa-solid fa-cloud",
            desc: "Cloud souverain pour les données de l'école.",
            replaces: "Google Drive / OneDrive",
            link: "https://nextcloud.com/"
        },
        {
            name: "Matomo",
            icon: "fa-solid fa-chart-pie",
            desc: "Analysez le trafic web sans voler de données.",
            replaces: "Google Analytics",
            link: "https://matomo.org/"
        },
        {
            name: "Thunderbird",
            icon: "fa-solid fa-envelope-open-text",
            desc: "Client mail robuste pour l'administration.",
            replaces: "Outlook",
            link: "https://www.thunderbird.net/fr/"
        },
        {
            name: "Pi-hole",
            icon: "fa-solid fa-ban",
            desc: "Bloqueur de pubs au niveau du réseau.",
            replaces: "Filtres coûteux",
            link: "https://pi-hole.net/"
        },
        {
            name: "Element",
            icon: "fa-solid fa-comments",
            desc: "Communication interne sécurisée (Matrix).",
            replaces: "Slack / Teams",
            link: "https://element.io/"
        },
        {
            name: "Gitea",
            icon: "fa-solid fa-code-branch",
            desc: "Forge logicielle légère pour héberger le code.",
            replaces: "GitHub",
            link: "https://gitea.com/"
        },
        {
            name: "Snipe-IT",
            icon: "fa-solid fa-barcode",
            desc: "Gestion d'inventaire du parc informatique.",
            replaces: "Excel / Paid Tools",
            link: "https://snipeitapp.com/"
        },
        {
            name: "PfSense",
            icon: "fa-solid fa-network-wired",
            desc: "Pare-feu et routeur open source.",
            replaces: "Cisco Propriétaire",
            link: "https://www.pfsense.org/"
        }
    ],
    parent: [
        {
            name: "F-Droid",
            icon: "fa-brands fa-android",
            desc: "Magasin d'apps gratuites et open source.",
            replaces: "Google Play Store",
            link: "https://f-droid.org/"
        },
        {
            name: "TimeLimit.io",
            icon: "fa-solid fa-clock",
            desc: "Gérez le temps d'écran de l'enfant sans l'espionner.",
            replaces: "Google Family Link",
            link: "https://timelimit.io/en/"
        },
        {
            name: "OsmAnd",
            icon: "fa-solid fa-map-location-dot",
            desc: "Cartes hors-ligne précises pour les voyages.",
            replaces: "Google Maps",
            link: "https://osmand.net/"
        },
        {
            name: "GCompris",
            icon: "fa-solid fa-shapes",
            desc: "Suite de logiciels éducatifs pour les petits.",
            replaces: "Jeux avec pubs",
            link: "https://gcompris.net/index-fr.html"
        },
        {
            name: "Tuta",
            icon: "fa-solid fa-envelope",
            desc: "Email chiffré facile pour toute la famille.",
            replaces: "Gmail / Yahoo",
            link: "https://tuta.com/"
        },
        {
            name: "DuckDuckGo",
            icon: "fa-solid fa-duck",
            desc: "Moteur de recherche sain pour les enfants.",
            replaces: "Google Search",
            link: "https://duckduckgo.com/"
        },
        {
            name: "Kodi",
            icon: "fa-solid fa-tv",
            desc: "Centre multimédia pour le salon.",
            replaces: "Apple TV / Roku",
            link: "https://kodi.tv/"
        },
        {
            name: "Firefox Focus",
            icon: "fa-solid fa-eye-slash",
            desc: "Navigateur mobile ultra-privé (efface tout).",
            replaces: "Chrome Mobile",
            link: "https://www.mozilla.org/fr/firefox/browsers/mobile/focus/"
        },
        {
            name: "Etar",
            icon: "fa-solid fa-calendar-days",
            desc: "Calendrier simple et sans pisteurs.",
            replaces: "Google Calendar",
            link: "https://github.com/Etar-Group/Etar-Calendar"
        }
    ]
};

const grimoire = [
    {
        category: "🛡️ Défense Contre les Arts Sombres (Vie Privée)",
        description: "Protège tes données des espions de l'Empire.",
        articles: [
            {
                title: "Le Traçage Publicitaire (Cookies)",
                icon: "fa-cookie-bite",
                content: `
                    <p class="mb-2">Quand tu navigues, des milliers de petits fichiers (cookies) te suivent pour noter tout ce que tu fais, comme des espions invisibles.</p>
                    <h4 class="font-bold text-emerald-400 mt-2">La Parade :</h4>
                    <ul class="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Refuse toujours les cookies "non essentiels" sur les sites.</li>
                        <li>Installe l'extension <strong>uBlock Origin</strong>.</li>
                        <li>Utilise Firefox qui isole les cookies par site.</li>
                    </ul>`
            },
            {
                title: "Mots de Passe & Double Authentification",
                icon: "fa-key",
                content: `
                    <p class="mb-2">"123456" ou le nom de ton chat ne sont pas des boucliers suffisants. Un pirate les devine en 2 secondes.</p>
                    <h4 class="font-bold text-emerald-400 mt-2">Le Sortilège de Protection :</h4>
                    <ul class="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Utilise des phrases de passe : <em>"Cheval-Batterie-Agrafeuse-Correct"</em>.</li>
                        <li>Active la <strong>2FA (Double facteur)</strong> partout. C'est comme une deuxième serrure.</li>
                        <li>Utilise un coffre-fort (Bitwarden) pour ne rien retenir.</li>
                    </ul>`
            },
            {
                title: "Le RGPD : Ton Bouclier Légal",
                icon: "fa-scale-balanced",
                content: `
                    <p class="mb-2">Le Règlement Général sur la Protection des Données est une loi européenne qui oblige les entreprises à te respecter.</p>
                    <p class="text-slate-300">Tu as le droit de : savoir ce qu'ils savent sur toi, demander la suppression de tes données, et refuser le profilage.</p>`
            }
        ]
    },
    {
        category: "🌿 Magie Verte (Numérique Responsable)",
        description: "Réduis l'impact du village sur la nature.",
        articles: [
            {
                title: "Le Poids Caché du Cloud",
                icon: "fa-cloud-showers-heavy",
                content: `
                    <p class="mb-2">Le "Cloud" n'est pas un nuage, c'est une usine pleine d'ordinateurs qui chauffent. Envoyer un email avec une grosse pièce jointe pollue autant qu'une ampoule allumée pendant 1h.</p>
                    <h4 class="font-bold text-emerald-400 mt-2">L'Action Écolo :</h4>
                    <ul class="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Utilise des liens de téléchargement (Swisstransfer) au lieu des pièces jointes.</li>
                        <li>Nettoie ta boîte mail régulièrement.</li>
                        <li>Stocke tes fichiers localement (clé USB, disque dur) plutôt qu'en ligne.</li>
                    </ul>`
            },
            {
                title: "L'Obsolescence Programmée",
                icon: "fa-recycle",
                content: `
                    <p class="mb-2">Goliath veut que tu jettes ton téléphone tous les 2 ans. C'est un désastre écologique et humain (extraction de métaux rares).</p>
                    <h4 class="font-bold text-emerald-400 mt-2">La Résistance :</h4>
                    <ul class="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Achète reconditionné (BackMarket, Leboncoin).</li>
                        <li>Répare avant de jeter (iFixit).</li>
                        <li>Installe Linux sur un vieux PC lent pour le rendre rapide à nouveau.</li>
                    </ul>`
            },
            {
                title: "Le Streaming Vidéo (4K vs HD)",
                icon: "fa-film",
                content: `
                    <p class="mb-2">La vidéo représente 60% du trafic web mondial. Regarder Netflix en 4K sur un téléphone est inutile et énergivore.</p>
                    <p class="text-slate-300"><strong>Astuce :</strong> Baisse la qualité en 720p ou 1080p. Tes yeux ne verront pas la différence, mais la planète si.</p>`
            }
        ]
    },
    {
        category: "✊ Le Code d'Honneur (Open Source)",
        description: "Comprendre pourquoi le libre est l'avenir.",
        articles: [
            {
                title: "Logiciel Libre vs Propriétaire",
                icon: "fa-unlock",
                content: `
                    <p class="mb-2">Un logiciel propriétaire (Word, Photoshop) est une boîte noire fermée à clé. Tu ne sais pas ce qu'il fait.</p>
                    <p class="mb-2">Un logiciel libre (LibreOffice, Firefox) est comme une recette de cuisine publique. Tout le monde peut la lire, l'améliorer et vérifier qu'il n'y a pas de poison dedans.</p>`
            },
            {
                title: "L'Interopérabilité",
                icon: "fa-handshake",
                content: `
                    <p class="mb-2">C'est la capacité des outils à parler entre eux. Goliath aime créer des "Jardins Fermés" (Apple, Google) pour t'empêcher de partir.</p>
                    <p class="text-slate-300">Le Village NIRD utilise des formats ouverts (.odt, .pdf, .png) pour que tes fichiers soient lisibles dans 50 ans, peu importe le logiciel.</p>`
            }
        ]
    }
];

// --- ROUTES ---

// 1. Mon Village (Dashboard)
app.get('/', (req, res) => {
    res.render('index', {
        tab: 'village',
        title: 'Mon Village',
        data: villageData
    });
});

// 2. Quêtes (Missions)
app.get('/quests', (req, res) => {
    res.render('index', {
        tab: 'quests',
        title: 'Journal de Quêtes',
        quests: quests,
        data: villageData
    });
});

// 3. L'Armurerie (Tools)
app.get('/armory', (req, res) => {
    console.log('Armory route called');
    console.log('armoryData:', armory);
    res.render('index', {
        tab: 'armory',
        title: "Outils",
        armoryData: armory
    });
});

// 4. Le Grimoire (Wiki)
app.get('/grimoire', (req, res) => {
    res.render('index', {
        tab: 'grimoire',
        title: 'Wiki',
        grimoireData: grimoire
    });
});

// 5. Profil
app.get('/profile', (req, res) => {
    res.render('index', {
        tab: 'profile',
        title: 'Profil',
        data: villageData
    });
});

// 6. Complete Quest
app.get('/complete-quest/:id', (req, res) => {
    const questId = req.params.id;
    const quest = quests.find(q => q.id === questId);

    if (quest) {
        // --- Update Village Stats ---
        villageData.stats.currentXP += quest.xp;
        villageData.stats.sovereigntyScore = Math.min(100, villageData.stats.sovereigntyScore + quest.xp / 10);

        // Level Up Check
        if (villageData.stats.currentXP >= villageData.stats.nextLevelXP) {
            villageData.stats.level++;
            villageData.stats.currentXP -= villageData.stats.nextLevelXP;
            villageData.stats.nextLevelXP = Math.floor(villageData.stats.nextLevelXP * 1.5);
            villageData.stats.rank = villageData.levelRanks[villageData.stats.level] || "Maître de la Souveraineté";
            villageData.alerts.push({ type: 'info', msg: `Niveau supérieur ! Vous êtes maintenant ${villageData.stats.rank}.` });

            // Set level-up data for the client
            const levelUpData = {
                level: villageData.stats.level,
                rank: villageData.stats.rank
            };

            res.send(`<script>
                localStorage.setItem('level-up', JSON.stringify(${JSON.stringify(levelUpData)}));
                window.location.href = '/quests';
            </script>`);
        } else {
            // --- Generate New Quests ---
            quests = generateQuests();

            // Add a new alert
            villageData.alerts.push({ type: 'info', msg: `Quête terminée : "${quest.title}" !` });

            res.redirect('/quests');
        }
    } else {
        res.redirect('/quests');
    }
});


// 7. Reset Village
app.get('/reset', (req, res) => {
    villageData = {
        stats: {
            level: 1,
            currentXP: 0,
            nextLevelXP: 100,
            rank: "Éveillé Digital",
            sovereigntyScore: 50, // Percentage
            co2Saved: "0kg"
        },
        alerts: [
            { type: 'info', msg: "Bienvenue ! Accomplissez des quêtes pour améliorer le village." }
        ],
        levelRanks: {
            1: "Éveillé Digital",
            2: "Protecteur Numérique",
            3: "Gardien des Données",
            4: "Défenseur de la Vie Privée",
            5: "Maître de la Souveraineté"
        }
    };
    quests = generateQuests();
    res.redirect('/');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🛡️ Village NIRD ouvert sur http://localhost:${PORT}`);
});
