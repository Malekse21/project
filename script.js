/**
 * NIRD Village - Core Logic
 * Handles role switching, dynamic dashboard content, inventory, and persistence.
 * Updated for Tailwind CSS & FontAwesome.
 */

// Data Configuration for Roles
const ROLE_DATA = {
    student: {
        title: "Le Villageois",
        rank: "Apprenti Résistant",
        greeting: "Salut, Villageois",
        stats: [
            { label: "Données Sauvées", value: "124 MB", icon: "fa-database", color: "text-emerald-400" },
            { label: "Bouclier Vie Privée", value: "45%", icon: "fa-user-shield", color: "text-blue-400" },
            { label: "Traqueurs Bloqués", value: "1,240", icon: "fa-ban", color: "text-red-400" }
        ],
        quests: [
            { title: "Installer Firefox", desc: "Le navigateur du peuple libre.", xp: "+50 XP", icon: "fa-brands fa-firefox-browser" },
            { title: "Nettoyer sa boîte mail", desc: "Supprimez 50 vieux emails.", xp: "+30 XP", icon: "fa-envelope-open-text" },
            { title: "Stop Géolocalisation", desc: "Ne laissez pas l'Empire vous suivre.", xp: "+20 XP", icon: "fa-location-cross" }
        ],
        talents: [
            { name: "Bouclier de Données", level: "Niveau 3", desc: "Bloque les traceurs publicitaires.", progress: 65, icon: "fa-shield-virus" },
            { name: "Sobriété Numérique", level: "Niveau 2", desc: "Réduit l'empreinte carbone.", progress: 40, icon: "fa-leaf" },
            { name: "Navigation Furtive", level: "Niveau 1", desc: "Surf anonyme et sécurisé.", progress: 25, icon: "fa-user-secret" }
        ]
    },
    teacher: {
        title: "Le Druide",
        rank: "Maître du Savoir",
        greeting: "Bonjour, Druide",
        stats: [
            { label: "Classes Libérées", value: "3", icon: "fa-school", color: "text-amber-400" },
            { label: "Ressources Libres", value: "15", icon: "fa-book-open", color: "text-emerald-400" },
            { label: "Étudiants Formés", value: "84", icon: "fa-graduation-cap", color: "text-blue-400" }
        ],
        quests: [
            { title: "Cours LibreOffice", desc: "Montrez la voie de l'open source.", xp: "+100 XP", icon: "fa-file-word" },
            { title: "Atelier Vie Privée", desc: "Éduquez les jeunes villageois.", xp: "+150 XP", icon: "fa-chalkboard-user" },
            { title: "Partage de Savoir", desc: "Sur une plateforme libre.", xp: "+40 XP", icon: "fa-share-nodes" }
        ],
        talents: [
            { name: "Partage de Connaissance", level: "Niveau 5", desc: "Diffusion massive de ressources.", progress: 90, icon: "fa-book-journal-whills" },
            { name: "Mentorat Open Source", level: "Niveau 4", desc: "Guidage vers l'indépendance.", progress: 75, icon: "fa-hand-holding-heart" },
            { name: "Création de Contenu", level: "Niveau 3", desc: "Guides et tutoriels éthiques.", progress: 60, icon: "fa-pen-nib" }
        ]
    },
    admin: {
        title: "Le Chef du Village",
        rank: "Gardien du Code",
        greeting: "Bienvenue, Chef",
        stats: [
            { label: "Vie Matériel", value: "+2 Ans", icon: "fa-computer", color: "text-blue-400" },
            { label: "Économies", value: "4,500 €", icon: "fa-coins", color: "text-amber-400" },
            { label: "Serveurs Optimisés", value: "98%", icon: "fa-server", color: "text-emerald-400" }
        ],
        quests: [
            { title: "Audit Énergétique", desc: "Réduisez la consommation.", xp: "+200 XP", icon: "fa-bolt" },
            { title: "Mail Éthique", desc: "Changez de fournisseur.", xp: "+300 XP", icon: "fa-envelope" },
            { title: "Politique RGPD", desc: "Mettez à jour le registre.", xp: "+100 XP", icon: "fa-file-shield" }
        ],
        talents: [
            { name: "Infrastructure Verte", level: "Niveau 5", desc: "Optimisation énergétique.", progress: 95, icon: "fa-city" },
            { name: "Conformité RGPD", level: "Niveau 4", desc: "Protection juridique.", progress: 80, icon: "fa-scale-balanced" },
            { name: "Budget Libre", level: "Niveau 5", desc: "Réallocation des fonds.", progress: 85, icon: "fa-sack-dollar" }
        ]
    }
};

// Inventory Data
const INVENTORY_ITEMS = [
    { name: "Firefox", type: "Navigateur", icon: "fa-brands fa-firefox-browser", desc: "Le renard de feu qui protège vos données.", color: "text-orange-500" },
    { name: "VLC", type: "Média", icon: "fa-solid fa-play-circle", desc: "Le cône qui lit tout, sans espionnage.", color: "text-orange-400" },
    { name: "Signal", type: "Communication", icon: "fa-solid fa-comment-dots", desc: "Messagerie chiffrée et sécurisée.", color: "text-blue-400" },
    { name: "Linux", type: "Système", icon: "fa-brands fa-linux", desc: "Le noyau de la liberté numérique.", color: "text-yellow-400" },
    { name: "Thunderbird", type: "Email", icon: "fa-solid fa-envelope", desc: "Gestionnaire de mail libre et puissant.", color: "text-blue-500" },
    { name: "LibreOffice", type: "Bureautique", icon: "fa-solid fa-file-lines", desc: "La suite bureautique sans abonnement.", color: "text-green-500" },
    { name: "uBlock Origin", type: "Extension", icon: "fa-solid fa-shield-halved", desc: "Le bouclier ultime contre la pub.", color: "text-red-500" },
    { name: "Bitwarden", type: "Sécurité", icon: "fa-solid fa-key", desc: "Coffre-fort pour vos mots de passe.", color: "text-blue-600" }
];

class DashboardManager {
    constructor() {
        this.roleSelect = document.getElementById('role-select');
        this.greetingEl = document.getElementById('greeting');
        this.rankEl = document.getElementById('rank');
        this.statsContainer = document.getElementById('stats-container');
        this.questList = document.getElementById('quest-list');
        this.talentsContainer = document.getElementById('talents-container');
        this.inventoryContainer = document.getElementById('inventory-container');
        this.navItems = document.querySelectorAll('.nav-item');
        this.views = document.querySelectorAll('.view-section');
        this.co2ValueEl = document.querySelector('.co2-value');
        this.co2BarEl = document.querySelector('.meter-fill');

        this.currentRole = 'student'; // Default role
        this.co2Amount = 0.4; // Starting grams

        this.init();
    }

    init() {
        // Load persisted state
        this.loadState();

        // Event Listener for Role Switcher
        this.roleSelect.addEventListener('change', (e) => {
            this.currentRole = e.target.value;
            this.loadRole(this.currentRole);
            this.saveState();
        });

        // Event Listeners for Navigation
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetView = e.target.getAttribute('data-view');
                if (targetView) {
                    this.switchView(targetView);

                    // Update Active Nav State
                    this.navItems.forEach(nav => nav.classList.remove('active', 'bg-white/5', 'text-primary', 'border-primary/30'));
                    e.target.classList.add('active', 'bg-white/5', 'text-primary', 'border-primary/30');
                }
            });
        });

        // Initial Load
        this.roleSelect.value = this.currentRole;
        this.loadRole(this.currentRole);
        this.renderInventory();
        this.startCO2Counter();
    }

    saveState() {
        localStorage.setItem('nird_role', this.currentRole);
    }

    loadState() {
        const savedRole = localStorage.getItem('nird_role');
        if (savedRole && ROLE_DATA[savedRole]) {
            this.currentRole = savedRole;
        }
    }

    startCO2Counter() {
        setInterval(() => {
            // Simulate CO2 increase (approx 0.01g per second for a server session)
            this.co2Amount += 0.01;
            this.co2ValueEl.textContent = `${this.co2Amount.toFixed(2)}g`;

            // Update visual bar (capped at 100%)
            let percentage = Math.min((this.co2Amount / 5) * 100, 100); // 5g is max for bar
            this.co2BarEl.style.width = `${percentage}%`;

            // Change color if high
            if (percentage > 80) {
                this.co2BarEl.classList.remove('bg-secondary');
                this.co2BarEl.classList.add('bg-red-500');
            }
        }, 1000);
    }

    switchView(viewId) {
        this.views.forEach(view => {
            if (view.id === `${viewId}-view`) {
                view.classList.add('active');
                view.classList.remove('hidden');
            } else {
                view.classList.remove('active');
                view.classList.add('hidden');
            }
        });
    }

    loadRole(roleKey) {
        const data = ROLE_DATA[roleKey];
        if (!data) return;

        // Update Header
        this.greetingEl.textContent = data.greeting;
        this.rankEl.textContent = `Rang: ${data.rank}`;

        // Update Stats
        this.renderStats(data.stats);

        // Update Quests
        this.renderQuests(data.quests);

        // Update Talents
        this.renderTalents(data.talents);
    }

    renderStats(stats) {
        this.statsContainer.innerHTML = stats.map(stat => `
            <article class="bg-panel p-6 rounded-xl border border-gray-700 shadow-lg hover:border-primary/50 transition-colors group">
                <div class="flex justify-between items-start mb-4">
                    <h4 class="text-gray-400 text-sm uppercase font-bold tracking-wider">${stat.label}</h4>
                    <div class="p-2 bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <i class="fa-solid ${stat.icon} ${stat.color} text-xl"></i>
                    </div>
                </div>
                <div class="text-3xl font-bold text-white">${stat.value}</div>
            </article>
        `).join('');
    }

    renderQuests(quests) {
        this.questList.innerHTML = quests.map(quest => `
            <li class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-secondary hover:bg-gray-800 transition-all group cursor-pointer">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-deep transition-colors">
                        <i class="${quest.icon}"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-200 group-hover:text-white">${quest.title}</h4>
                        <p class="text-sm text-gray-500">${quest.desc}</p>
                    </div>
                </div>
                <div class="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    ${quest.xp}
                </div>
            </li>
        `).join('');
    }

    renderTalents(talents) {
        if (!talents) return;
        this.talentsContainer.innerHTML = talents.map(talent => `
            <article class="bg-panel border border-gray-700 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i class="fa-solid ${talent.icon} text-6xl text-primary"></i>
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl text-primary border border-gray-700 group-hover:border-primary transition-colors">
                        <i class="fa-solid ${talent.icon}"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-white">${talent.name}</h4>
                        <span class="text-xs font-bold text-primary uppercase tracking-wider">${talent.level}</span>
                    </div>
                </div>
                <p class="text-sm text-gray-400 mb-6 h-10">${talent.desc}</p>
                <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-primary w-[${talent.progress}%] shadow-glow relative">
                        <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>
            </article>
        `).join('');
    }

    renderInventory() {
        if (!this.inventoryContainer) return;
        this.inventoryContainer.innerHTML = INVENTORY_ITEMS.map(item => `
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center hover:border-primary hover:bg-gray-700 transition-all cursor-pointer group">
                <div class="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <i class="${item.icon} ${item.color} text-3xl"></i>
                </div>
                <h4 class="font-bold text-white mb-1">${item.name}</h4>
                <span class="text-xs text-gray-500 uppercase tracking-wider mb-2">${item.type}</span>
                <p class="text-xs text-gray-400">${item.desc}</p>
            </div>
        `).join('');
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
