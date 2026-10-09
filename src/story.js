/* Story mode « Le Cercle du Roi Noir » : a fan campaign in the spirit of Code Geass.
   Original text; each chapter is one match against the engine (level = index in LEVELS). */
const STORY={
  title:'Le Cercle du Roi Noir',
  prologue:[
    {who:'',text:"Concession de Tokyo. Sous un casino fermé depuis des années, un escalier descend vers une salle que personne n'avoue connaître."},
    {who:'Rivalz',text:"Lelouch, sérieux… On avait dit un noble, un pari, et on rentre avant le dernier train. Pourquoi il y a des gardes devant la porte ?"},
    {who:'Lelouch',text:"Parce que le noble d'hier soir n'a pas supporté de perdre. Il a racheté ma dette de jeu au Cercle. Ma signature est sur leur registre."},
    {who:'Le Marquis',text:"Bienvenue, jeune homme. Ici, on ne paie pas en argent. Celui qui perd appartient au Cercle, et vous avez perdu le droit de partir."},
    {who:'Le Marquis',text:"Il existe une seule sortie : battre mes cinq champions, puis moi. Six parties. Une défaite, et vous recommencez la nuit suivante."},
    {who:'Lelouch',text:"Six pièces sur un échiquier. Et vous vous croyez le roi. Très bien, Marquis. Je vais vous apprendre ce que vaut un roi qui ne bouge jamais."},
    {who:'',text:"Pour vaincre le Cercle, Lelouch dispose d'un atout que personne ne soupçonne : une fois par partie, son regard peut lire le meilleur coup. Le bouton Geass apparaît pendant les matchs."}
  ],
  chapters:[
    {
      id:'pion', short:'Tobias', name:'Tobias Kell', title:'le Pion', piece:'P', level:0, color:'w', tc:0,
      place:'Salle des croupiers',
      intro:[
        {who:'Tobias',text:"Un lycéen ? Le Marquis se moque de moi. J'ai commencé ici comme toi, gamin. Avec une dette et des illusions."},
        {who:'Lelouch',text:"Et tu es resté un pion. Moi, j'ai l'intention d'aller au bout de l'échiquier."},
        {who:'Tobias',text:"Les pions qui avancent trop vite finissent toujours mangés. Joue."}
      ],
      win:[
        {who:'Tobias',text:"Déjà fini… Je jouais trop vite, comme toujours."},
        {who:'Lelouch',text:"Tu jouais sans plan. Un pion sans plan n'est qu'un sacrifice qui s'ignore."}
      ],
      lose:[{who:'Tobias',text:"Tu vois ? Même les lycéens prodiges finissent par trébucher. Reviens demain."}]
    },
    {
      id:'cavalier', short:'Mira', name:'Mira Sauveterre', title:'la Cavalière', piece:'N', level:1, color:'b', tc:0,
      place:'La galerie aux miroirs',
      intro:[
        {who:'Mira',text:"Tobias t'a sous-estimé. Pas moi. J'ai vu ta partie : propre, froide, efficace."},
        {who:'Mira',text:"Mais je ne joue pas en ligne droite. Mes cavaliers sautent là où tu ne regardes pas."},
        {who:'Lelouch',text:"Une fourchette ne fonctionne que si l'adversaire laisse ses pièces au mauvais endroit. Je n'en laisse aucune au hasard."}
      ],
      win:[
        {who:'Mira',text:"Tu as anticipé chaque saut. Comment…"},
        {who:'Lelouch',text:"Un cavalier contrôle huit cases au maximum. Il suffit de compter jusqu'à huit."}
      ],
      lose:[{who:'Mira',text:"Échec, et tu ne l'as pas vu venir. Les sauts ne pardonnent pas."}]
    },
    {
      id:'fou', short:'Anselme', name:'Frère Anselme', title:'le Fou', piece:'B', level:2, color:'w', tc:0,
      place:'La chapelle désaffectée',
      intro:[
        {who:'Anselme',text:"On m'appelle le Fou, mais je ne suis qu'un homme patient. J'ai quitté le monastère pour une seule raison : les diagonales ne mentent jamais."},
        {who:'Lelouch',text:"Alors tu vas aimer celle qui mène à ton roi."},
        {who:'Anselme',text:"L'arrogance est un péché, mon fils. Et sur un échiquier, c'est surtout une faiblesse."}
      ],
      win:[
        {who:'Anselme',text:"Mes deux fous… coupés de leurs diagonales. Tu as fermé le centre avant même que je comprenne."},
        {who:'Lelouch',text:"La patience ne sert à rien si l'on attend au mauvais endroit."}
      ],
      lose:[{who:'Anselme',text:"Prie pour une meilleure partie demain. Les diagonales, elles, ne dorment pas."}]
    },
    {
      id:'tour', short:'Gregor', name:'Gregor Hald', title:'la Tour', piece:'R', level:3, color:'b', tc:0,
      place:"L'ancienne chambre forte",
      intro:[
        {who:'Gregor',text:"Trois champions tombés. Le Marquis commence à transpirer. Moi, non."},
        {who:'Gregor',text:"J'ai servi dix ans dans l'armée. Je sais tenir une position. Personne n'a jamais percé ma défense."},
        {who:'Lelouch',text:"Une forteresse n'a qu'un défaut : elle ne peut pas se déplacer. Il suffit de lui faire croire que l'attaque vient d'ailleurs."}
      ],
      win:[
        {who:'Gregor',text:"Mes tours sur la mauvaise colonne… Tu m'as fait défendre un mur vide."},
        {who:'Lelouch',text:"La meilleure stratégie, c'est celle où l'ennemi construit lui-même le piège."},
        {who:'Rivalz',text:"(par message) Lelouch, il est quatre heures du matin. Milly va me tuer si tu rates encore le conseil des élèves."}
      ],
      lose:[{who:'Gregor',text:"Les murs tiennent toujours. Reviens quand tu sauras assiéger."}]
    },
    {
      id:'dame', short:'Séverine', name:'Séverine de Morlaix', title:'la Dame', piece:'Q', level:3, color:'b', tc:5,
      place:'Le salon pourpre',
      intro:[
        {who:'Séverine',text:"Lelouch. Quel joli nom pour un garçon qui ne sortira jamais d'ici."},
        {who:'Séverine',text:"Je ne joue pas lentement, mon cher. Dix minutes chacun. À cette vitesse, on ne réfléchit plus : on révèle qui l'on est."},
        {who:'Lelouch',text:"Parfait. J'ai déjà calculé cette partie pendant que vous parliez."}
      ],
      win:[
        {who:'Séverine',text:"Tu as joué plus vite que moi… et mieux. Personne n'avait jamais fait tomber ma dame."},
        {who:'Lelouch',text:"La pièce la plus puissante est aussi celle qu'on protège le plus. C'est ce qui la rend prévisible."},
        {who:'Séverine',text:"Le Marquis t'attend. Méfie-toi : lui ne joue jamais pour l'argent."}
      ],
      lose:[{who:'Séverine',text:"Le temps, mon cher. Il gagne toujours. Revenez quand vous saurez le dompter."}]
    },
    {
      id:'roi', short:'Le Marquis', name:'Marquis de Valcourt', title:'le Roi Noir', piece:'K', level:4, color:'w', tc:6,
      place:'La salle du trône',
      intro:[
        {who:'Le Marquis',text:"Cinq champions. Tu as fait en une semaine ce que personne n'a fait en vingt ans."},
        {who:'Le Marquis',text:"Mais mes champions étaient des pièces. Moi, je suis celui qui les déplace. Ici, tout le monde m'obéit."},
        {who:'Lelouch',text:"C'est bien votre erreur. Un roi qui se cache derrière ses pièces ne sait plus se battre lui-même."},
        {who:'Lelouch',text:"Moi, je bouge le premier. Et ce soir, c'est votre royaume qui tombe."}
      ],
      win:[
        {who:'Le Marquis',text:"Échec… et mat. Par un lycéen."},
        {who:'Lelouch',text:"Votre registre, Marquis. Ma signature, et celle de tous ceux que vous gardez ici. Brûlez-les."},
        {who:'Le Marquis',text:"…Le Cercle reconnaît sa défaite. Tu es libre."}
      ],
      lose:[{who:'Le Marquis',text:"Tu as joué comme un roi. Mais il n'y a qu'un roi dans cette salle. À demain soir."}]
    }
  ],
  epilogue:[
    {who:'',text:"L'aube se lève sur la Concession. La moto de Rivalz attend devant l'entrée du casino, moteur encore chaud."},
    {who:'Rivalz',text:"Alors ? Dis-moi que c'est fini. Dis-moi qu'on peut aller en cours comme des gens normaux."},
    {who:'Lelouch',text:"C'est fini. Le Cercle n'existe plus. Et toutes les dettes de leur registre ont brûlé avec lui."},
    {who:'Rivalz',text:"Tu sais que tu es complètement fou ? Monte, on a contrôle de maths dans une heure."},
    {who:'Lelouch',text:"(Un lycéen ordinaire. Pour l'instant, c'est le meilleur coup à jouer.)"},
    {who:'',text:"Lelouch a regagné sa liberté. Il peut rejouer chaque chapitre depuis l'onglet Histoire."}
  ]
};
if(typeof module!=='undefined') module.exports=STORY;
