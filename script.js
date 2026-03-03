// ========================
// Classe Question
// ========================
class Question {
    constructor(enonce, reponses, reponseCorrecte) {
        this.enonce = enonce;
        this.reponses = reponses;
        this.reponseCorrecte = reponseCorrecte; // index de la bonne réponse
    }

    afficher() {
        // On crée une div qui contiendra la question + les choix
        const container = document.createElement("div");

        // Titre / énoncé
        const titre = document.createElement("h2");
        titre.textContent = this.enonce;
        container.appendChild(titre);

        // Liste des réponses (boutons radio)
        for (let i = 0; i < this.reponses.length; i++) {
            const label = document.createElement("label");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "reponse"; // important : même name pour grouper les radios
            radio.value = i;        // on stocke l'index dans value

            label.appendChild(radio);
            label.append(" " + this.reponses[i]);

            container.appendChild(label);
            container.appendChild(document.createElement("br"));
        }

        return container;
    }
}

// ========================
// Classe Quiz
// ========================
class Quiz {
    constructor() {
        this.questions = [];
        this.score = 0;
        this.index = 0;

        this.zoneQuiz = document.getElementById("quiz");
    }

    ajouterQuestion(question) {
        this.questions.push(question);
    }

    afficherQuestion(question) {
        // On vide la zone d'affichage
        this.zoneQuiz.innerHTML = "";

        // On ajoute le HTML généré par Question.afficher()
        this.zoneQuiz.appendChild(question.afficher());
    }

    collecterReponse() {
        // On récupère le bouton radio sélectionné
        const selection = document.querySelector('input[name="reponse"]:checked');

        // Si rien n'est sélectionné, on stoppe et on prévient
        if (!selection) {
            alert("Choisis une réponse avant de valider 🙂");
            return;
        }

        const reponseUtilisateur = parseInt(selection.value, 10);
        const questionActuelle = this.questions[this.index];

        // Vérification
        if (reponseUtilisateur === questionActuelle.reponseCorrecte) {
            this.score++;
        }

        // Question suivante
        this.index++;

        // Si on a fini toutes les questions => résultat
        if (this.index >= this.questions.length) {
            this.afficherResultat();
        } else {
            this.afficherQuestion(this.questions[this.index]);
        }
    }

    afficherResultat() {
        this.zoneQuiz.innerHTML = "";

        const resultat = document.createElement("h2");
        resultat.textContent = `Terminé ! Ton score : ${this.score} / ${this.questions.length}`;
        this.zoneQuiz.appendChild(resultat);

        const bouton = document.getElementById("submit");
        bouton.textContent = "Recommencer le quiz";

        // On change le comportement du bouton
        bouton.onclick = () => {
            this.recommencer();
        };
    }

    recommencer() {
        this.score = 0;
        this.index = 0;

        const bouton = document.getElementById("submit");
        bouton.textContent = "Valider la réponse";
        bouton.onclick = () => {
            this.collecterReponse();
        };
        this.afficherQuestion(this.questions[this.index]);
    }
}

// ========================
// Création du quiz + questions (Module 2)
// ========================
const quiz = new Quiz();

quiz.ajouterQuestion(
    new Question(
        "En JavaScript, un objet sert surtout à regrouper :",
        ["Des fonctions uniquement", "Des données et des actions (propriétés et méthodes)", "Des nombres uniquement"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Comment s'appelle une fonction qui sert à créer des objets (ancienne façon) ?",
        ["Une boucle", "Un constructeur (function)", "Un tableau"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Quel mot-clé permet d'utiliser une classe pour créer un objet ?",
        ["create", "new", "this"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Dans une classe ES6, à quoi sert le constructor() ?",
        ["À supprimer un objet", "À initialiser les propriétés de l'objet", "À afficher une page web"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Dans une méthode, à quoi correspond 'this' ?",
        ["À la page HTML", "À l'objet actuel (l'instance)", "À un tableau de réponses"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Pourquoi utiliser le prototype en JavaScript ?",
        ["Pour partager des méthodes entre plusieurs objets", "Pour faire du CSS", "Pour créer des variables globales"],
        0
    )
);

quiz.ajouterQuestion(
    new Question(
        "Quel mot-clé permet de faire de l'héritage entre classes en ES6 ?",
        ["extends", "export", "include"],
        0
    )
);

quiz.ajouterQuestion(
    new Question(
        "Dans une classe enfant, quel mot-clé permet d'appeler le constructeur du parent ?",
        ["parent()", "super()", "base()"],
        1
    )
);

quiz.ajouterQuestion(
    new Question(
        "Quelle est la bonne manière de définir une méthode dans une classe ES6 ?",
        ["maMethode() { ... }", "function maMethode() { ... }", "method: maMethode = () => { ... }"],
        0
    )
);

quiz.ajouterQuestion(
    new Question(
        "Que signifie 'POO' ?",
        ["Protocole Orienté Ordinateur", "Programme Objet Ordonné", "Programmation Orienté Objet"],
        2
    )
);

// On affiche la première question
quiz.afficherQuestion(quiz.questions[0]);

// Quand on clique sur "Valider la réponse"
document.getElementById("submit").onclick = function () {
    quiz.collecterReponse();
};