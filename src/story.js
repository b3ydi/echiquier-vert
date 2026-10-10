/* Story mode « Le Cercle du Roi Noir » : a fan campaign in the spirit of Code Geass.
   Original text; each chapter is one match against the engine (level = index in LEVELS).

   A scene is a list of shots: {who, e, text} where `who` is a key of STORY.chars ('' = narration)
   and `e` its expression. Optional per shot: bg (backdrop, persists), caption (place/time line),
   fx ('flash' | 'shake' | 'geass'), card ({title, sub}: full-screen title card), clear (empty the stage).
   Characters with no artwork yet show their chess piece instead of a face. */
const STORY={
  title:'Le Cercle du Roi Noir',
  chars:{
    lelouch:{name:'Lelouch',def:'smirk',img:{smirk:'assets/lelouch-smirk.webp',surprised:'assets/lelouch-surprised.webp',thinking:'assets/lelouch-thinking.webp',geass:'assets/lelouch-geass.webp',fury:'assets/lelouch-fury.webp'}},
    rivalz:{name:'Rivalz',def:'happy',img:{happy:'assets/rivalz-happy.webp',shocked:'assets/rivalz-shocked.webp',sheepish:'assets/rivalz-sheepish.webp',angry:'assets/rivalz-angry.webp'}},
    baron:{name:'Baron Harlow',def:'smug',img:{smug:'assets/baron-smug.webp',angry:'assets/baron-angry.webp',shocked:'assets/baron-shocked.webp',scheming:'assets/baron-scheming.webp'}},
    isabella:{name:'Lady Isabella',def:'smug',img:{smug:'assets/isabella-smug.webp',angry:'assets/isabella-angry.webp',shocked:'assets/isabella-shocked.webp',laugh:'assets/isabella-laugh.webp'}},
    vance:{name:'Général Vance',def:'smug',img:{smug:'assets/vance-smug.webp',angry:'assets/vance-angry.webp',scheming:'assets/vance-scheming.webp',fury:'assets/vance-fury.webp'}},
    mira:{name:'Mira',piece:'N'},
    anselme:{name:'Frère Anselme',piece:'B'},
    gregor:{name:'Gregor',piece:'R'},
    severine:{name:'Séverine',piece:'Q'},
    marquis:{name:'Le Marquis',piece:'K'}
  },
  prologue:[
    {bg:'city',caption:'Concession de Tokyo · 23 h 40',who:'',text:"La pluie n'a pas cessé depuis le coucher du soleil. Dans les salons des quartiers nobles, on joue encore, et on parie gros."},
    {bg:'salon',caption:'Salon du baron Harlow',who:'rivalz',e:'happy',text:"Et de trois ! Lelouch, tu viens de battre le baron en dix-neuf coups. Il va pleurer dans sa cravate !"},
    {who:'lelouch',e:'smirk',text:"Les nobles jouent comme ils gouvernent : en croyant que leur nom suffit à gagner."},
    {who:'baron',e:'angry',text:"Vous avez triché. Personne ne me bat chez moi, devant mes invités."},
    {who:'lelouch',e:'thinking',text:"Personne ? Vous devriez revoir vos statistiques, baron. Je compte trois parties ce soir."},
    {who:'baron',e:'scheming',text:"Gardez votre argent, jeune homme. Je vais vous offrir bien mieux… une invitation."},
    {bg:'black',fx:'flash',clear:true,who:'',text:"Le lendemain, une lettre scellée de cire noire attendait Lelouch à l'Académie. Au bas d'une dette de cinq millions, il y avait sa signature. Imitée à la perfection."},
    {bg:'academy',caption:"Académie · toit du bâtiment des élèves",who:'rivalz',e:'shocked',text:"Cinq millions ?! Lelouch, c'est quoi ce papier ? Tu n'as jamais signé ça !"},
    {who:'lelouch',e:'surprised',text:"Non. Mais c'est un faux parfait. Quelqu'un a racheté ma réputation de joueur… et l'a revendue."},
    {who:'rivalz',e:'sheepish',text:"Dis-moi qu'on va voir la police. Comme des gens normaux."},
    {who:'lelouch',e:'thinking',text:"La police obéit aux nobles. Non, Rivalz. On va au rendez-vous."},
    {bg:'stairs',caption:'Minuit · sous un casino abandonné',clear:true,who:'',text:"Sous un casino fermé depuis des années, un escalier descend vers une salle dont personne n'avoue l'existence. Des gardes masqués s'écartent sans un mot."},
    {bg:'hall',caption:'Le Cercle du Roi Noir',who:'marquis',text:"Bienvenue, Lelouch. Votre dette appartient au Cercle. Et vous avec elle."},
    {who:'marquis',text:"Ici, on ne paie pas en argent. Battez tous ceux que je placerai devant vous, puis moi, et votre nom disparaîtra du registre. Perdez, et vous jouerez pour moi. Pour toujours."},
    {who:'rivalz',e:'angry',text:"C'est n'importe quoi ! Il est encore au lycée, vous ne pouvez pas—"},
    {who:'marquis',text:"Le garçon a signé. Ou du moins, sa main l'a fait."},
    {who:'lelouch',e:'geass',fx:'geass',text:"Des pièces sur un échiquier… et vous vous prenez pour le roi."},
    {who:'lelouch',e:'fury',fx:'shake',text:"Très bien, Marquis. Je vais vous montrer ce qui arrive à un roi qui ne bouge jamais."},
    {bg:'black',clear:true,who:'',text:"Pour vaincre le Cercle, Lelouch possède un atout que personne ne soupçonne : une fois par partie, son regard peut lire le meilleur coup. C'est son premier Skill, le bouton apparaît pendant les matchs."}
  ],
  // Generic lines for Lelouch during a match.
  lelouch:{
    capture:[{e:'smirk',text:"Merci. J'en ferai meilleur usage que vous."},{e:'smirk',text:"Une pièce sacrifiée sans plan n'est qu'une pièce perdue."}],
    check:[{e:'fury',text:"Échec. Où comptez-vous fuir ?"},{e:'smirk',text:"Votre roi est à découvert."}],
    hurt:[{e:'thinking',text:"Calme. Ce n'est qu'un détour dans le plan."},{e:'surprised',text:"Je ne l'avais pas vu venir… Intéressant."}],
    geass:[{e:'geass',text:"Montre-moi le chemin… Geass !"}]
  },
  chapters:[
    {
      id:'pion', char:'baron', name:'Baron Edmond Harlow', title:'le Pion', piece:'P', level:0, ai:{depth:1,noise:420}, color:'w', tc:0,
      place:'Le salon des recruteurs',
      intro:[
        {bg:'hall',who:'baron',e:'smug',text:"Surpris, Lelouch ? Le Cercle récompense ceux qui lui amènent du talent. Et vous êtes ma plus belle prise."},
        {who:'lelouch',e:'thinking',text:"Donc c'était vous. Le faux, la dette, la lettre."},
        {who:'baron',e:'scheming',text:"Je suis le Pion du Marquis. Le premier obstacle. Et cette fois, j'ai étudié toutes vos parties."},
        {who:'lelouch',e:'smirk',text:"Un pion qui se croit dangereux parce qu'il a avancé de deux cases. Installez l'échiquier."}
      ],
      win:[
        {who:'baron',e:'shocked',text:"Impossible… J'avais étudié chacune de vos parties !"},
        {who:'lelouch',e:'smirk',text:"Vous avez étudié celles que je voulais que vous voyiez."},
        {who:'baron',e:'angry',text:"Riez tant que vous pouvez. Le Marquis ne vous laissera jamais sortir d'ici !"},
        {bg:'black',clear:true,who:'',text:"Dans une loge, au-dessus de la salle, quelqu'un a suivi toute la partie derrière un éventail de dentelle. Et n'a pas du tout apprécié la fin."}
      ],
      lose:[{who:'baron',e:'smug',text:"Vous voyez ? Même les prodiges finissent sur le registre. Revenez demain soir."}],
      barks:{
        capture:[{e:'smug',text:"Merci pour ce cadeau, mon cher."},{e:'scheming',text:"Une pièce de plus pour ma collection."},{e:'smug',text:"Vous perdez du matériel… comme vous avez perdu votre liberté."}],
        check:[{e:'scheming',text:"Échec ! Alors, le génie de l'Académie ?"},{e:'smug',text:"Votre roi tremble, Lelouch."}],
        advantage:[{e:'scheming',text:"Le registre vous attend déjà."},{e:'smug',text:"Je mène. Vous le sentez, n'est-ce pas ?"}],
        hurt:[{e:'angry',text:"Ma pièce ! Un coup de chance, rien de plus."},{e:'angry',text:"Vous osez ?!"}],
        checked:[{e:'shocked',text:"Q-quoi ? Échec ?!"},{e:'shocked',text:"Non, non, non… ce n'était pas prévu."}]
      }
    },
    {
      id:'mecene', char:'isabella', name:'Lady Isabella von Britannia', title:'la Mécène', piece:'Q', level:1, color:'b', tc:0,
      place:"La loge impériale de l'Opéra",
      intro:[
        {bg:'black',clear:true,who:'',text:"Le lendemain, un carton doré attendait Lelouch sous sa porte. « Lady Isabella von Britannia vous fait l'honneur de sa loge. » Ce n'était pas une invitation. C'était une convocation."},
        {bg:'opera',caption:'Opéra impérial · loge privée',who:'isabella',e:'smug',text:"Alors c'est vous, le petit prodige qui a fait pleurer ce pauvre Harlow. Approchez. Je ne mords que les gens importants."},
        {who:'lelouch',e:'thinking',text:"Lady Isabella. On dit que vous financez la moitié des tables du Cercle."},
        {who:'isabella',e:'laugh',text:"La moitié ? Vous me vexez. Le Marquis tient le registre, mais c'est mon or qui fait tourner ses roues. Et un général de mes amis qui fait taire les curieux."},
        {who:'isabella',e:'smug',text:"Les échecs sont la société en miniature, mon cher. Les pions meurent pour que la noblesse triomphe. Vous êtes un pion. Brillant, je vous l'accorde. Mais un pion."},
        {who:'lelouch',e:'smirk',text:"Un pion qui atteint la dernière rangée devient ce qu'il veut. Même une reine."},
        {who:'isabella',e:'angry',text:"Quelle insolence. Je ne joue presque jamais moi-même… mais pour vous, je ferai une exception. Mes invités adorent regarder un roturier tomber."}
      ],
      win:[
        {who:'isabella',e:'shocked',text:"Non… Pas devant toute la loge. Pas battue par un… un lycéen !"},
        {who:'lelouch',e:'smirk',text:"Vous l'avez dit vous-même : les pions meurent pour que la noblesse triomphe. Vous avez simplement oublié de vérifier qui était le pion."},
        {who:'isabella',e:'angry',text:"Riez, profitez-en. Je connais un homme pour qui un échiquier est un champ de bataille. Il n'y fait jamais de prisonniers."},
        {who:'isabella',e:'smug',text:"Le général Vance me doit une faveur. Quand il en aura fini avec vous, vous supplierez qu'on vous rende au registre."},
        {bg:'black',clear:true,who:'',text:"Lelouch quitte l'Opéra sous les regards glacés de l'aristocratie. Le nom de Vance, lui, reste gravé dans sa mémoire."}
      ],
      lose:[{who:'isabella',e:'laugh',text:"Exactement comme prévu. Rangez-le avec les autres pions, voulez-vous ? Et resservez-moi du champagne."}],
      barks:{
        capture:[{e:'smug',text:"Un pion de moins. Personne ne le pleurera."},{e:'laugh',text:"Oh, ne faites pas cette tête. C'est le destin des petites pièces."},{e:'smug',text:"Merci, mon cher. Je la ferai encadrer."}],
        check:[{e:'smug',text:"Échec. Vous entendez ? Mes invités applaudissent."},{e:'laugh',text:"Votre roi tremble comme un roturier devant l'Empereur."}],
        advantage:[{e:'laugh',text:"Mon champagne aura bien meilleur goût ce soir."},{e:'smug',text:"Inclinez-vous, Lelouch. C'est ainsi que le monde doit tourner."}],
        hurt:[{e:'angry',text:"Comment osez-vous toucher à mes pièces ?"},{e:'shocked',text:"Ce… c'était une pièce de valeur !"}],
        checked:[{e:'shocked',text:"Un roturier qui menace mon roi ? Inconcevable !"},{e:'angry',text:"Vous oubliez à qui vous parlez."}]
      }
    },
    {
      id:'cavalier', char:'mira', name:'Mira Sauveterre', title:'la Cavalière', piece:'N', level:1, color:'b', tc:0,
      place:'La galerie aux miroirs',
      intro:[
        {bg:'mirrors',who:'mira',text:"Lady Isabella vous a sous-estimé. Pas moi. J'ai vu votre partie : propre, froide, efficace."},
        {who:'mira',text:"Mais je ne joue pas en ligne droite. Mes cavaliers sautent là où vous ne regardez pas."},
        {who:'lelouch',e:'thinking',text:"Une fourchette ne fonctionne que si l'adversaire laisse ses pièces au mauvais endroit. Je n'en laisse aucune au hasard."}
      ],
      win:[
        {who:'mira',text:"Vous avez anticipé chaque saut. Comment…"},
        {who:'lelouch',e:'smirk',text:"Un cavalier contrôle huit cases au maximum. Il suffit de compter jusqu'à huit."}
      ],
      lose:[{who:'mira',text:"Échec, et vous ne l'avez pas vu venir. Les sauts ne pardonnent pas."}],
      barks:{
        capture:[{text:"Hop. Vous ne l'aviez pas vue, celle-là."}],
        check:[{text:"Un saut, et votre roi n'a plus d'abri."}],
        advantage:[{text:"Vous commencez à transpirer, Lelouch."}],
        hurt:[{text:"Bien joué… pour cette fois."}],
        checked:[{text:"Tiens donc. Vous mordez."}]
      }
    },
    {
      id:'fou', char:'anselme', name:'Frère Anselme', title:'le Fou', piece:'B', level:2, color:'w', tc:0,
      place:'La chapelle désaffectée',
      intro:[
        {bg:'chapel',who:'anselme',text:"On m'appelle le Fou, mais je ne suis qu'un homme patient. J'ai quitté le monastère pour une seule raison : les diagonales ne mentent jamais."},
        {who:'lelouch',e:'smirk',text:"Alors vous allez aimer celle qui mène à votre roi."},
        {who:'anselme',text:"L'arrogance est un péché, mon fils. Et sur un échiquier, c'est surtout une faiblesse."}
      ],
      win:[
        {who:'anselme',text:"Mes deux fous… coupés de leurs diagonales. Vous avez fermé le centre avant même que je comprenne."},
        {who:'lelouch',e:'thinking',text:"La patience ne sert à rien si l'on attend au mauvais endroit."}
      ],
      lose:[{who:'anselme',text:"Priez pour une meilleure partie demain. Les diagonales, elles, ne dorment pas."}],
      barks:{
        capture:[{text:"Que cette pièce repose en paix."}],
        check:[{text:"La diagonale s'ouvre. Repentez-vous."}],
        advantage:[{text:"Votre orgueil vous coûte cher, mon fils."}],
        hurt:[{text:"Une épreuve de plus. J'en ai connu d'autres."}],
        checked:[{text:"Seigneur… je n'avais pas vu cette case."}]
      }
    },
    {
      id:'tour', char:'gregor', name:'Gregor Hald', title:'la Tour', piece:'R', level:3, color:'b', tc:0,
      place:"L'ancienne chambre forte",
      intro:[
        {bg:'vault',who:'gregor',text:"Trois champions tombés. Le Marquis commence à transpirer. Moi, non."},
        {who:'gregor',text:"J'ai servi dix ans dans l'armée. Je sais tenir une position. Personne n'a jamais percé ma défense."},
        {who:'lelouch',e:'thinking',text:"Une forteresse n'a qu'un défaut : elle ne peut pas se déplacer. Il suffit de lui faire croire que l'attaque vient d'ailleurs."}
      ],
      win:[
        {who:'gregor',text:"Mes tours sur la mauvaise colonne… Vous m'avez fait défendre un mur vide."},
        {who:'lelouch',e:'smirk',text:"La meilleure stratégie, c'est celle où l'ennemi construit lui-même le piège."},
        {who:'rivalz',e:'sheepish',text:"(par message) Lelouch, il est quatre heures du matin. Milly va me tuer si tu rates encore le conseil des élèves."}
      ],
      lose:[{who:'gregor',text:"Les murs tiennent toujours. Revenez quand vous saurez assiéger."}],
      barks:{
        capture:[{text:"Une brèche de moins dans mon mur."}],
        check:[{text:"Colonne ouverte. Feu."}],
        advantage:[{text:"Vous vous épuisez contre ma muraille."}],
        hurt:[{text:"Touché. Mais le mur tient."}],
        checked:[{text:"Une percée ? Impossible."}]
      }
    },
    {
      id:'dame', char:'severine', name:'Séverine de Morlaix', title:'la Dame', piece:'Q', level:3, color:'b', tc:5,
      place:'Le salon pourpre',
      intro:[
        {bg:'salon',who:'severine',text:"Lelouch. Quel joli nom pour un garçon qui ne sortira jamais d'ici."},
        {who:'severine',text:"Je ne joue pas lentement, mon cher. Dix minutes chacun. À cette vitesse, on ne réfléchit plus : on révèle qui l'on est."},
        {who:'lelouch',e:'smirk',text:"Parfait. J'ai déjà calculé cette partie pendant que vous parliez."}
      ],
      win:[
        {who:'severine',text:"Vous avez joué plus vite que moi… et mieux. Personne n'avait jamais fait tomber ma dame."},
        {who:'lelouch',e:'thinking',text:"La pièce la plus puissante est aussi celle qu'on protège le plus. C'est ce qui la rend prévisible."},
        {who:'severine',text:"Le Marquis vous attend. Mais quelqu'un est arrivé avant vous ce soir : un homme en uniforme. Lady Isabella n'oublie jamais une humiliation."}
      ],
      lose:[{who:'severine',text:"Le temps, mon cher. Il gagne toujours. Revenez quand vous saurez le dompter."}],
      barks:{
        capture:[{text:"Charmant. Je garde celle-ci."}],
        check:[{text:"Échec, mon cher. Le temps file."}],
        advantage:[{text:"Vous perdez le fil… et la partie."}],
        hurt:[{text:"Vous m'amusez de moins en moins."}],
        checked:[{text:"Oh ? Vous avez des griffes."}]
      }
    },
    {
      id:'general', char:'vance', name:'Général Hector Vance', title:"le Général", piece:'R', level:4, ai:{time:2400}, color:'b', tc:0,
      place:'La salle des cartes',
      intro:[
        {bg:'black',fx:'shake',clear:true,who:'',text:"Des bottes résonnent dans l'escalier du casino. Cette nuit, ce ne sont pas les gardes masqués du Cercle qui ouvrent les portes. Ce sont des soldats."},
        {bg:'warroom',caption:"Le Cercle · occupé par l'armée impériale",who:'vance',e:'smug',text:"Lelouch. Lady Isabella m'a beaucoup parlé de vous. Un lycéen qui humilie la noblesse… J'ai fait fusiller des hommes pour moins que ça."},
        {who:'lelouch',e:'thinking',text:"Général Hector Vance. La division qui a rasé trois villes en une semaine. Vous êtes bien loin de votre front."},
        {who:'vance',e:'scheming',text:"Le front est partout où l'on défie l'Empire. Ce soir, il passe par cet échiquier."},
        {who:'vance',e:'angry',text:"La guerre et les échecs, c'est la même chose : de la logistique, de la force, et des sacrifices. Je ne compte jamais mes morts. Seulement mes victoires."},
        {who:'lelouch',e:'fury',text:"C'est exactement pour ça que vous perdrez. Un général qui méprise ses soldats ne voit pas le moment où son armée cesse de le protéger."},
        {who:'vance',e:'fury',fx:'shake',text:"Assez ! Asseyez-vous. Je vais vous broyer pièce par pièce, et vous allez sentir chacune d'elles tomber."},
        {who:'lelouch',e:'geass',fx:'geass',text:"Venez, Général. Je vais vous apprendre la seule guerre que vous n'avez jamais menée : celle qu'on gagne avant le premier coup de feu."}
      ],
      win:[
        {who:'vance',e:'fury',text:"Impossible… Mes lignes étaient parfaites ! Chaque pièce à sa place !"},
        {who:'lelouch',e:'smirk',text:"Justement. Vous les avez sacrifiées une à une, et à la fin, plus personne ne protégeait votre roi."},
        {who:'vance',e:'angry',text:"Ce n'est pas terminé. L'Empire n'oublie jamais ceux qui le défient, Lelouch."},
        {who:'lelouch',e:'thinking',text:"(Non. Et moi non plus.)"},
        {bg:'black',clear:true,who:'',text:"Les soldats se retirent sans un mot. Au fond de la salle, une porte que Lelouch n'avait jamais remarquée s'ouvre sur un escalier. Le Marquis l'attend."}
      ],
      lose:[{who:'vance',e:'smug',text:"Voilà ce qu'est la guerre, garçon. Rentrez chez vous, et remerciez l'Empire d'être encore en vie."}],
      barks:{
        capture:[{e:'smug',text:"Perte acceptable. Pour moi."},{e:'scheming',text:"Une pièce de moins. Votre ligne cède, soldat."},{e:'angry',text:"En avant ! On ne fait pas de prisonniers."}],
        check:[{e:'angry',text:"Échec ! Rendez-vous, et je serai clément. Peut-être."},{e:'fury',text:"Votre roi est encerclé. Capitulez !"}],
        advantage:[{e:'scheming',text:"Je sens votre moral s'effondrer. C'est toujours ainsi que ça commence."},{e:'smug',text:"Mes troupes avancent, les vôtres reculent. La suite est déjà écrite."}],
        hurt:[{e:'smug',text:"Un soldat tombe, dix autres prennent sa place."},{e:'angry',text:"Vous croyez m'affaiblir ? Je n'ai jamais pleuré un soldat."}],
        checked:[{e:'fury',text:"Insolent ! Vous osez attaquer mon commandement ?!"},{e:'angry',text:"Une escarmouche. Rien de plus."}]
      }
    },
    {
      id:'roi', char:'marquis', name:'Marquis de Valcourt', title:'le Roi Noir', piece:'K', level:4, color:'w', tc:6,
      place:'La salle du trône',
      intro:[
        {bg:'throne',who:'marquis',text:"Même Vance a reculé. Vous avez fait en une semaine ce que personne n'a fait en vingt ans."},
        {who:'marquis',text:"Mais mes champions étaient des pièces. Moi, je suis celui qui les déplace. Ici, tout le monde m'obéit."},
        {who:'lelouch',e:'thinking',text:"C'est bien votre erreur. Un roi qui se cache derrière ses pièces ne sait plus se battre lui-même."},
        {who:'lelouch',e:'geass',fx:'geass',text:"Moi, je bouge le premier. Et ce soir, c'est votre royaume qui tombe."}
      ],
      win:[
        {who:'marquis',text:"Échec… et mat. Par un lycéen."},
        {who:'lelouch',e:'fury',text:"Votre registre, Marquis. Ma signature, et celles de tous ceux que vous gardez ici. Brûlez-les."},
        {who:'marquis',text:"…Le Cercle reconnaît sa défaite. Vous êtes libre."}
      ],
      lose:[{who:'marquis',text:"Vous avez joué comme un roi. Mais il n'y a qu'un roi dans cette salle. À demain soir."}],
      barks:{
        capture:[{text:"Tout ce qui est sur cet échiquier m'appartient."}],
        check:[{text:"Agenouillez-vous."}],
        advantage:[{text:"Vous voyez enfin votre place, Lelouch."}],
        hurt:[{text:"Un pion de moins. J'en ai mille autres."}],
        checked:[{text:"Vous osez menacer le roi ?"}]
      }
    }
  ],
  epilogue:[
    {bg:'dawn',music:'menu',caption:"L'aube sur la Concession",clear:true,who:'',text:"Au-dessus du casino abandonné, le ciel pâlit. La moto de Rivalz attend devant l'entrée, moteur encore chaud."},
    {who:'rivalz',e:'shocked',text:"Alors ? Dis-moi que c'est fini. Dis-moi qu'on peut aller en cours comme des gens normaux."},
    {who:'lelouch',e:'smirk',text:"C'est fini. Le Cercle n'existe plus. Et toutes les dettes de leur registre ont brûlé avec lui."},
    {who:'rivalz',e:'happy',text:"Tu es complètement fou, tu le sais ? Monte, on a contrôle de maths dans une heure !"},
    {who:'lelouch',e:'thinking',text:"(Un lycéen ordinaire. Pour l'instant, c'est le meilleur coup à jouer.)"},
    {bg:'black',clear:true,card:{title:'Fin',sub:'Lelouch a regagné sa liberté'},who:'',text:"Chaque chapitre peut être rejoué depuis l'onglet Histoire."}
  ]
};
if(typeof module!=='undefined') module.exports=STORY;
