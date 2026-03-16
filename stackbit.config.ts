import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '18',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        // === PAGE D'ACCUEIL ===
        {
          name: 'HomePage',
          type: 'page',
          urlPath: '/',
          filePath: 'content/pages/index.json',
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Titre du site' },
            { name: 'heroTagline', type: 'string', label: 'Slogan (hero)' },
            { name: 'heroSubtitle', type: 'text', label: 'Sous-titre (hero)' },
            { name: 'manifesto', type: 'text', label: 'Texte du manifeste' },
            { name: 'collectifDescription', type: 'text', label: 'Description du collectif' },
            { name: 'statManifestants', type: 'string', label: 'Nombre de manifestant·es' },
            { name: 'contactText', type: 'text', label: 'Texte section contact' }
          ]
        },
        // === ÉVÉNEMENTS ===
        {
          name: 'Evenement',
          type: 'data',
          filePath: 'content/data/evenements/{slug}.json',
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Titre' },
            { name: 'date', type: 'date', required: true, label: 'Date' },
            {
              name: 'type_evenement',
              type: 'enum',
              label: 'Type',
              options: [
                { label: 'Mobilisation / Manif', value: 'mobilisation' },
                { label: 'Culture / Spectacle', value: 'culture' },
                { label: 'Formation / Atelier', value: 'formation' },
                { label: 'Réunion', value: 'reunion' }
              ]
            },
            { name: 'lieu', type: 'string', label: 'Lieu' },
            { name: 'description', type: 'text', label: 'Description' }
          ]
        },
        // === ASSOCIATIONS ===
        {
          name: 'Association',
          type: 'data',
          filePath: 'content/data/associations/{slug}.json',
          fields: [
            { name: 'name', type: 'string', required: true, label: 'Nom' },
            { name: 'description', type: 'text', label: 'Description' },
            { name: 'icon', type: 'string', label: 'Emoji / Icône' },
            { name: 'color', type: 'string', label: 'Couleur (hex)', default: '#E63946' },
            { name: 'url', type: 'url', label: 'Lien vers le site' },
            { name: 'order', type: 'number', label: 'Ordre d\'affichage', default: 0 }
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ]
});
