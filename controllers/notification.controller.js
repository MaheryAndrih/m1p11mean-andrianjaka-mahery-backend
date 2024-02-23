const receiveSubscription = async (req, res) => {
    const sub = req.body;
    console.log(sub);
    res.json(sub);
}

module.exports = {receiveSubscription}