
const webpush = require('web-push');
const publicKey = 'BF_cZPVjvQyMHBNcnwOGw10RSEOlvUAWkUCUw6NxOkj0uRxfRSB0jggUZG7JytvLdDgrGCaLOTLMN0l5h8p9UbY';
const privateKey = '6te5gvrK-bUmdzxwI0Elw1QERE7YUoQwBS78MqE8_6k';

let sub = null;

function interceptSubscription(req, res, next) {
    sub = req.body;
    webpush.setVapidDetails('mailto:bob.ituniversity@gmail.com', publicKey, privateKey);
    console.log('subscription is set');
}
function sendPush(){
    const payload = {
        "notification": {
            "data": {
                "onActionClick": {
                  "default": {"operation": "focusLastFocusedOrOpen", "url": "/#/users/user-list"}
                }
              },
            title: "Fun oh Heuristic",
            vibrate: [100, 50, 100]
        }
    };
  
    setInterval(() => {
        if(sub!=null){
            console.log(sub.endpoint);
           
                webpush.sendNotification(sub, JSON.stringify(payload)).catch((error) => {
                    if (error.statusCode === 410) {
                        // Gérer l'abonnement expiré, par exemple, supprimer l'abonnement côté client
                        console.log("Abonnement expiré. Suppression de l'abonnement côté client.");
                        // Code pour supprimer l'abonnement expiré
                    } else {
                        // Gérer d'autres erreurs
                        console.error("Erreur lors de l'envoi de la notification :", error);
                    }
                });
                console.log("Notification envoyée avec succès.");
           
        }
    }, 10000);

}

module.exports ={interceptSubscription, sendPush}