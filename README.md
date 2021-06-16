Ce document est le premier docuement à lire pour bien comprendre le code de myEMapp. 
Ici sera détaillé tout ce qu'il y a à savoir sur la structure générale de l'application. Les informations plus précises des différents éléments du dossier se trouveront en ReadMe dans les dossiers en question ou directement en commentaire dans le code.

A la racine du dossier (c'est-à-dire dans le dossier où se trouve ce document), les deux éléments importants sont App.js et assets : 
- App.js est le point d'entrée de l'application. C'est le premier fichier qui sera lu lorsque l'application se lance. 
- assets est le dossier où on trouve le logo (icon.png) et l'image qui s'affiche lorsque l'on lance l'application (splash.png)

Ensuite, l'entièreté du code se retrouve dans le dossier src, qui est un diminutif pour source. Voici la structure du dossier :

- assets. C'est ici que l'on met les ressources utilisées dans l'application (photo, police d'écritures, icônes etc...). 
- Components. C'est ici que l'on met tous les components utilisés dans l'application. Pour l'instant, le choix a été fait de regrouper les components selon leur écran d'appartenance.
- Modules. Chaque sous-dossier renvoie au module correspondant dans l'application. Petite précision, Root renvoie aux tout premiers écrans que voit l'utilisateur lorsqu'il ouvre l'application. Par exemple, l'écran de connexion, l'écran d'inscription...
- Navigation. Ici, on a les différents fichiers utilisés pour la navigation dans l'application. En quelques mots, les différentes Navigation sont emboîtées les unes dans les autres. 
- Store. Le dossier est entièrement dédié à Redux (librairie de gestion de variables globales). Se référer aux instructions là-bas pour plus de détails.
- styles. Le style de l'ensemble de l'application y est centralisé pour créer une interface homogène et cohérente. Pour le moment, nous ne disposons que d'un fichier pour le style du texte. 
