const config = {
  MAX_PODS: 90,
  BANK_PUT_ITEMS: [
    { item: 289, quantity: 0 },
  ],
  BANK_GET_ITEMS: [
    { item: 289, quantity: 1 },
  ],
}

const move = [
  { map: 83887104, custom: buyWheat },
]

const bank = [
  { map: 83887104, npcBank: true },
]
// remove star from `function*` for esprima
async function* buyWheat() {
  const item = 289;
  const lot = 100;
  const prixMin = 300;
  const itemWeight = inventory.itemWeight(item);
  printMessage(itemWeight);
  // Active l'achat.
  yield* await bid.startBuying();
  if (isInDialog()) {
    printMessage("Je suis en mode achat.");
    // Retourne le prix du lot de 100 blé.
    const prixBle = await bid.getItemPrice(item, lot);
    printMessage(`Le prix de 100 blé est de ${prixBle}`);
    // Si le prix est inferieur à ce qu'on veut
    if (prixBle < prixMin) {
      // Nombre maximum qu'on peut avoir dans l'inventaire.
      const maxItems = Math.ceil((inventory.podsMax - inventory.pods) / itemWeight);
      // Nombre maimum de lots possible à acheter.
      const maxLots = Math.ceil(maxItems / lot);
      // Achat de tous les lots.
      printMessage(`Je peut acheter ${maxLots}.`);
      for (let i = 0; i < maxLots; i++) {
        yield* await bid.buyItem(item, lot); // Achète 100 blé.
      }
      // On quitte le dialogue.
      yield* await leaveDialog();
      if (inventory.podsP < 90) {
        printMessage(`Je ne suis pas plein, j'attend 5 mins avant de réouvrir l'HDV.`);
        yield* await delay(5 * 60 * 1000);
      } else {
        printMessage(`Je vais poser en banque.`);
      }
    } else {
      printMessage(`Je n'achète pas, ${prixBle - prixMin}k trop cher. Attente de 5 minutes...`);
      yield* await delay(5 * 60 * 1000);
    }
  }
}
