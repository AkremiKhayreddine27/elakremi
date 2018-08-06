## Réservation

| attribut | valeur par défaut | à modifier |
| -------| ------------------| -----------|
| montant| nombre de nuitée * tariff par nuit (paramétrage du tariff) | oui
| caution | valeur fixe (paramétrage du tariff) | oui |
| acompte | pourcentage (paramétrage du tariff) | oui |
| solde | la somme des revenues - la somme des dépenses | non |
| réglé | la somme des revenues réglé - la somme des dépenses réglé | non |

* lorsqu'on crée une réservation : 
> Si `l'acompte` = 0 : on crée pas une revenue de type `acompte séjour`.

> Si le `caution` = 0 : on crée pas une revenue de type `caution`.
* lorsqu'on modif une réservation :

| valeur | avant modification | aprés modification | action |
| -------| -------------------| ------------------ | -------|
| acompte | n | 0 | supprimer la revenue de type `acompte`  |
| acompte | 0 | n | ajouter une revenue de type `acompte` |
| caution | n | 0 | supprimer la revenue de type `caution` |
| caution | 0 | n | ajouter une revenue de type `caution` |

