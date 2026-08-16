# MSTKPRINT37 — Site GitHub Pages

Site statique prêt pour GitHub Pages. Aucun serveur ni abonnement nécessaire.

## Mise en ligne rapide
1. Crée un nouveau dépôt GitHub, par exemple `mstkprint37-site`.
2. Envoie tout le contenu de ce dossier à la racine du dépôt.
3. Dans GitHub : **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Deploy from a branch**.
5. Sélectionne la branche `main` et le dossier `/ (root)`, puis **Save**.
6. GitHub affichera ensuite l'adresse publique du site.

## Domaine mstkprint37.com
Ne change pas les DNS tant que tu veux conserver ton site actuel. Quand la nouvelle version est validée, tu peux connecter ton domaine à GitHub Pages depuis **Settings → Pages → Custom domain** puis modifier les DNS chez ton registrar.

## Personnaliser le catalogue
Les produits sont dans `app.js`, au début du fichier, dans la constante `products`.
- `name` = nom du produit
- `category` = kawaii / deco / cadeau
- `desc` = description
- `price` = prix
- `icon` = visuel temporaire

Pour utiliser de vraies photos, remplace ensuite la zone `.product-art` par une balise `<img>` ou demande une V2 avec tes photos.

## Commandes
Le panier ne prend aucun paiement. Il prépare un message WhatsApp avec le détail du panier et l'envoie au numéro MSTKPRINT37.
##Déploiement V14

Commit changes sur la branche main.
