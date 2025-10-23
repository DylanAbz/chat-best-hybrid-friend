# Mes pratiques avec ChatGPT

Ce document présente la façon dont j'ai utilisé ChatGPT pour développer une application mobile hybride avec Expo, sans écrire de code moi-même.

---
## Prompt continu

J'ai commencé par donner le vrai contexte dans lequel j'étais moi, en lui donnant le début du sujet qui m'avait été donné :

```
Tu vas m'aider à faire ce projet : TP - Chat is my best hybrid friend Dans ce TP, vous allez devoir créer une petite application, simple en terme de fonctionnalités. L'objectif est de démontrer votre inutilité à coder lorsque l'on commence à maitriser une technologie. Vous serez noté sur votre capacité à livrer une application fonctionnelle rapidement (7 points). Vous devrez également démontrer votre capacité à maintenir un projet propre et bien documenté avec un Readme.md pertinent (3 points). Et vous serez noté sur votre utilisation pertinente d'un LLM comme assistant (10 points).
```

Lorsque je vais travailler avec ChatGPT, je préfère lui donner le contexte complet dès le début, pour qu'il puisse mieux comprendre mes besoins.
Étant donné qu'il avait tout le contexte, j'ai décidé de garder la même conversation tout au long du projet, pour qu'il puisse se souvenir de ce que je lui avais demandé au début.

## Itérations
J'ai ensuite procédé par itérations, en lui demandant de me fournir le code pour chaque fonctionnalité de l'application. Lors du premier prompt, je lui ai donné le contexte technique et la première fonctionnalité à implémenter :

```
j'ai déjà initialisé un projet react native, j'ai besoin de réaliser cette fonctionnalité dans mon index.tsx : Le fond d'écran doit être bleu clair si la batterie de l'appareil est supérieure à 50% et saumon si elle est inférieure à 50% Voici mon index.tsx pour l'instant : (_code_)
```

Après chacune de ses réponses, j'ai copié le code qu'il m'avait fourni dans mon projet, puis je l'ai testé. Lorsque tout fonctionnait correctement, j'ai pu faire des retours sur les bonnes pratiques. Par exemple, après qu'il m'ait proposé d'utiliser expo-av (qui va être déprécié), je lui ai demandé d'utiliser expo-sound à la place.
J'ai pu aussi faire des retours sur des interfaces qui ne m'allaient pas.

## Problèmes rencontrés
ChatGPT n'est pas toujours à jour sur les dernières versions des librairies, ou même sur celles qui sont dépréciées. Il utilise donc parfois des libraires qui ne sont plus recommandés ou même des méthodes qui n'existent plus. Ce cas m'est arrivé lors de l'implémentation du son du chat, où il m'a proposé d'utiliser expo-av, qui va être déprécié. J'ai dû lui demander de changer pour expo-sound.

Il n'était pas à jour sur expo-audio, j'ai donc fini par lui envoyer l'exemple de la documentation de la librairie pour qu'il réussisse à m'implémenter la fonctionnalité.

## Rappel de contexte
D'expérience, même lorsque l'on garde la même conversation, ChatGPT peut oublier le contexte initial au bout d'un moment. Il oublie notamment, le code qu'il a fourni avant. Pour pallier ce problème, je lui ai donc souvent renvoyé, après de grandes étapes, le code de la classe dans laquelle j'allais travailler, pour qu'il puisse s'en souvenir. 

Pour éviter ce problème, j'ai aussi essayé de faire le plus attention possible à ce qu'il modifiait entre chaque étape, il a notamment failli m'enlever des fonctions utilisées.

---
## Conclusion
Utiliser ChatGPT comme assistant de développement m'a permis de créer une application mobile hybride rapidement, mais, ne pas écrire une seule ligne de code m'a aussi posé des problèmes. Notamment lors du problème avec expo-audio, j'aurais pu gagner une dizaine de minutes en modifiant les 2 lignes concernées moi-même.

J'aurais pu penser à lui donner quelles libraries je voulais utiliser chaque fois pour éviter ces pertes de temps mais je ne les connaissais pas toujours. 

---

# Lien de la conversation complète
Voici le lien vers la conversation complète que j'ai eue avec ChatGPT pour réaliser ce projet : [lien](https://chatgpt.com/share/68fa31a9-efa0-8003-962f-d3046005a34a)