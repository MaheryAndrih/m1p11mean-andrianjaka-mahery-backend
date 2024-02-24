
const webpush = require('web-push');
const publicKey = 'BF_cZPVjvQyMHBNcnwOGw10RSEOlvUAWkUCUw6NxOkj0uRxfRSB0jggUZG7JytvLdDgrGCaLOTLMN0l5h8p9UbY';
const privateKey = '6te5gvrK-bUmdzxwI0Elw1QERE7YUoQwBS78MqE8_6k';

let sub = null;

function interceptSubscription(req, res, next) {
    sub = req.body;
    webpush.setVapidDetails('mailto:bob.ituniversity@gmail.com', publicKey, privateKey);
    console.log('subscription is set');
}

function sendPush(payload, response){

    if(sub!=null){
        console.log(sub.endpoint);
        
            webpush.sendNotification(sub, JSON.stringify(payload)).catch((error) => {
                if (error.statusCode === 410) {
                    console.log("Abonnement expiré. Suppression de l'abonnement côté client.");
                } else {
                    console.error("Erreur lors de l'envoi de la notification :", error);
                }
                response.json(error);
                return;
            });

            response.json("notification sent");
            console.log("Notification envoyée avec succès.");
        
    }else{
        response.json("subscription is not set");
    }
}

module.exports ={interceptSubscription, sendPush}