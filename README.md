Il vous est possible de configurer une URL de notification depuis le BO de votre association.
Cette URL recevra alors des notifications de la part de HelloAsso.
Il en existe trois types:
- Création de campagnes
- Réalisation de commande
- Réalisation d'un paiement

La [documentation de notre API](https://api.helloasso.com/v5/swagger/ui/index#/) décrit cette fonctionnalité

# Fonctionnement
Cette application reçoit la notification (appel POST à la racine) et stock le contenu dans un fichier. Elle permet aussi l'affichage des notifications reçues via une interface de visualisation.

![alt text](https://github.com/HelloAsso/node-notification-handler-sample/blob/main/doc/screenshot.png?raw=true)

C'est un cas d'application fictif, dans la réalité la notification vous permettra surement de mettre à jour votre S.I. mais une fois la partie réception faite, vous êtes logiquement en maitrise !

# Déploiement
Cette application nécessite d'avoir un environnement Node.js. Avant de tester ou déployer ce site, il faut récupérer les dépendances:

`yarn install`

Puis lancer le projet

`yarn run dev`

Il faudra également simuler l'envoi de notification (curl, postman, insomnia, ...) car HelloAsso ne sera pas en mesure d'envoyer sur votre localhost 😅.

Voici des exemples curl pour chaque type de notification:

Création de campagnes
```
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: application/json' \
  --data '{"data":{"organizationLogo":"https:\/\/www.helloasso.com\/assets\/img\/logos\/croppedimage-f1fc3a6ba48746788ec4df2eb2023e8f.png","organizationName":"Demo Boutique","tiers":[{"id":1711234,"description":"","tierType":"Donation","price":2000,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true},{"id":1711238,"tierType":"Donation","price":0,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true},{"id":1711239,"description":"","tierType":"MonthlyDonation","price":1000,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true},{"id":1711235,"description":"","tierType":"Donation","price":5000,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true},{"id":1711236,"description":"","tierType":"Donation","price":10000,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true},{"id":1711237,"description":"","tierType":"Donation","price":15000,"vatRate":0,"paymentFrequency":"Single","isEligibleTaxReceipt":true}],"currency":"EUR","meta":{"createdAt":"2021-02-17T10:17:49.4470247+01:00","updatedAt":"2021-02-17T10:17:49.4470247+01:00"},"state":"Public","title":"<h1>Faire un don \u00e0 Demo Boutique<\/h1>","privateTitle":"Test","widgetButtonUrl":"https:\/\/www.helloasso.com\/associations\/demo-boutique\/formulaires\/1\/widget-bouton","widgetFullUrl":"https:\/\/www.helloasso.com\/associations\/demo-boutique\/formulaires\/1\/widget","formSlug":"1","formType":"Donation","url":"https:\/\/www.helloasso.com\/associations\/demo-boutique\/formulaires\/1","organizationSlug":"demo-boutique"},"eventType":"Form"}'
```

Réalisation de commande
```
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: application/json' \
  --data '{"data":{"payer":{"dateOfBirth":"1990-01-01T00:00:00+01:00","email":"eddy@helloasso.org","address":"1 rue un","city":"Bordeaux","zipCode":"33000","country":"FRA","firstName":"Eddy","lastName":"MONTUS"},"items":[{"payments":[{"id":7269832,"shareAmount":1000}],"user":{"firstName":"Eddy","lastName":"MONTUS"},"priceCategory":"Free","isCanceled":false,"id":1,"amount":1000,"type":"Payment","initialAmount":0,"state":"Processed"}],"payments":[{"items":[{"id":1,"shareAmount":1000,"shareItemAmount":1000}],"cashOutState":"Transfered","paymentReceiptUrl":"https:\/\/www.helloasso.com\/associations\/demo-boutique\/paiements\/vente-de-noel\/paiement-attestation\/1","id":7269832,"amount":1000,"date":"2021-02-17T09:19:51.2217994+00:00","paymentMeans":"Card","state":"Authorized"}],"amount":{"total":1000,"vat":0,"discount":0},"id":1,"date":"2021-02-17T09:19:40.770879+00:00","formSlug":"vente-de-noel","formType":"PaymentForm","organizationSlug":"demo-boutique"},"eventType":"Order"}'
```

Réalisation d'un paiement
```
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: application/json' \
  --data '{"data":{"payer":{"dateOfBirth":"1988-01-04T00:00:00+01:00","email":"eddy@helloasso.org","address":"71 rue mouneyra","city":"Bordeaux","zipCode":"33000","country":"FRA","firstName":"Eddy","lastName":"MONTUS"},"order":{"id":1,"date":"2021-02-17T09:19:40.770879+00:00","formSlug":"vente-de-noel","formType":"PaymentForm","organizationSlug":"demo-boutique"},"items":[{"shareAmount":1000,"shareItemAmount":1000,"id":1,"amount":1000,"type":"Payment","state":"Processed"}],"cashOutState":"Transfered","paymentReceiptUrl":"https:\/\/www.helloasso.com\/associations\/demo-boutique\/paiements\/vente-de-noel\/paiement-attestation\/1","id":7269832,"amount":1000,"date":"2021-02-17T09:19:40.770879+00:00","paymentMeans":"Card","state":"Authorized"},"eventType":"Payment"}'
```