import { Deck } from './types';

// Data extracted manually from PIOC 13 and PIOC 14 images
export const INITIAL_DECKS: Deck[] = [
  {
    id: 'pioc-13',
    title: 'PIOC 13 : Le son « é » (Verbes)',
    description: 'Verbes se terminant en -er (et quelques exceptions)',
    words: [
      { id: '1', french: 'accepter', type: 'verbe', exampleSentence: 'Je dois accepter son invitation.', english: 'to accept' },
      { id: '2', french: 'accompagner', type: 'verbe', exampleSentence: 'Je vais t\'accompagner à l\'école.', english: 'to accompany' },
      { id: '3', french: 'allumer', type: 'verbe', exampleSentence: 'Peux-tu allumer la lumière ?', english: 'to turn on / to light' },
      { id: '4', french: 'amener', type: 'verbe', exampleSentence: 'Il va amener son frère au parc.', english: 'to bring (someone)' },
      { id: '5', french: 'appuyer', type: 'verbe', exampleSentence: 'Il faut appuyer sur le bouton.', english: 'to press / to support' },
      { id: '6', french: 'céder', type: 'verbe', exampleSentence: 'Il ne faut jamais céder à la peur.', english: 'to yield / to give in' },
      { id: '7', french: 'conserver', type: 'verbe', exampleSentence: 'Nous allons conserver ces documents.', english: 'to keep / to preserve' },
      { id: '8', french: 'demeurer', type: 'verbe', exampleSentence: 'Ils vont demeurer ici pour la nuit.', english: 'to remain / to stay' },
      { id: '9', french: 'deviner', type: 'verbe', exampleSentence: 'Essaie de deviner la réponse.', english: 'to guess' },
      { id: '10', french: 'élever', type: 'verbe', exampleSentence: 'C\'est difficile d\'élever des animaux.', english: 'to raise' },
      { id: '11', french: 'emmener', type: 'verbe', exampleSentence: 'Papa va m\'emmener au cinéma.', english: 'to take (someone)' },
      { id: '12', french: 'libérer', type: 'verbe', exampleSentence: 'Il faut libérer le passage.', english: 'to free / to release' },
      { id: '13', french: 'livrer', type: 'verbe', exampleSentence: 'Le camion va livrer les colis.', english: 'to deliver' },
      { id: '14', french: 'murmurer', type: 'verbe', exampleSentence: 'Elle aime murmurer des secrets.', english: 'to whisper' },
      { id: '15', french: 'noyer', type: 'verbe', exampleSentence: 'Attention de ne pas te noyer.', english: 'to drown' },
      { id: '16', french: 'promener', type: 'verbe', exampleSentence: 'Je vais promener mon chien.', english: 'to walk (a pet)' },
      { id: '17', french: 'réparer', type: 'verbe', exampleSentence: 'Il doit réparer son vélo.', english: 'to repair' },
      { id: '18', french: 'situer', type: 'verbe', exampleSentence: 'Peux-tu situer le Québec sur la carte ?', english: 'to locate' },
      { id: '19', french: 'soulever', type: 'verbe', exampleSentence: 'C\'est trop lourd à soulever.', english: 'to lift' },
      { id: '20', french: 'taper', type: 'verbe', exampleSentence: 'Il ne faut pas taper sur la table.', english: 'to hit / to type' },
    ]
  },
  {
    id: 'pioc-14',
    title: 'PIOC 14 : Le son « é » (Noms)',
    description: 'Noms féminins en -ée, -té, -tié et exceptions',
    words: [
      { id: '21', french: 'la durée', type: 'nom f.', exampleSentence: 'Quelle est la durée du film ?', english: 'duration' },
      { id: '22', french: 'une matinée', type: 'nom f.', exampleSentence: 'J\'ai passé une belle matinée.', english: 'morning' },
      { id: '23', french: 'une poignée', type: 'nom f.', exampleSentence: 'J\'ai pris une poignée de bonbons.', english: 'handful / handle' },
      { id: '24', french: 'une actualité', type: 'nom f.', exampleSentence: 'C\'est une actualité importante.', english: 'news / current event' },
      { id: '25', french: 'une antiquité', type: 'nom f.', exampleSentence: 'Ce vase est une antiquité.', english: 'antique' },
      { id: '26', french: 'une communauté', type: 'nom f.', exampleSentence: 'Nous vivons dans une belle communauté.', english: 'community' },
      { id: '27', french: 'une éternité', type: 'nom f.', exampleSentence: 'Attendre semble durer une éternité.', english: 'eternity' },
      { id: '28', french: 'une extrémité', type: 'nom f.', exampleSentence: 'Il habite à l\'autre extrémité de la ville.', english: 'extremity / end' },
      { id: '29', french: 'la facilité', type: 'nom f.', exampleSentence: 'Il apprend avec facilité.', english: 'ease' },
      { id: '30', french: 'la lâcheté', type: 'nom f.', exampleSentence: 'La lâcheté n\'est pas une qualité.', english: 'cowardice' },
      { id: '31', french: 'une minorité', type: 'nom f.', exampleSentence: 'Une minorité de gens pense cela.', english: 'minority' },
      { id: '32', french: 'une nationalité', type: 'nom f.', exampleSentence: 'Quelle est ta nationalité ?', english: 'nationality' },
      { id: '33', french: 'la propreté', type: 'nom f.', exampleSentence: 'La propreté est importante ici.', english: 'cleanliness' },
      { id: '34', french: 'la pureté', type: 'nom f.', exampleSentence: 'La pureté de l\'eau est testée.', english: 'purity' },
      { id: '35', french: 'la solidarité', type: 'nom f.', exampleSentence: 'La solidarité nous rend plus forts.', english: 'solidarity' },
      { id: '36', french: 'une spécialité', type: 'nom f.', exampleSentence: 'La poutine est une spécialité locale.', english: 'specialty' },
      { id: '37', french: 'la sureté', type: 'nom f.', exampleSentence: 'Il est en sécurité et en sureté.', english: 'safety / security' },
      { id: '38', french: 'la saleté', type: 'nom f.', exampleSentence: 'Il faut nettoyer la saleté.', english: 'dirt / filth' },
      { id: '39', french: 'un évier', type: 'nom m.', exampleSentence: 'Je lave la vaisselle dans l\'évier.', english: 'sink' },
      { id: '40', french: 'un clocher', type: 'nom m.', exampleSentence: 'Je vois le clocher de l\'église.', english: 'bell tower' },
    ]
  }
];