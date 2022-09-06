export function loadLists() {
    return [
      { 
        title: 'Tarefas', 
        creatable: true,
        cards: [
          {
            id: 1,
            content: 'Estudar módulo 01 de NodeJS',
            labels: ['#7159c1'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 2,
            content: 'Recriar a interface do Pipefy',
            labels: ['#7159c1'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 3,
            content: 'Estudar módulo 03 de React Native',
            labels: ['#7159c1'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 4,
            content: 'Estudar NextJS: Utilizando server-side rendering com ReactJS',
            labels: ['#54e1f7'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 5,
            content: 'Estudar testes e deploy ReactJS',
            labels: ['#54e1f7'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
        ]
      },
      { 
        title: 'Fazendo', 
        creatable: false,
        cards: [
          {
            id: 6,
            content: 'Recriando clone do Pipefy',
            labels: [],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 14,
            content: 'Estudar postgres',
            labels: [],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 15,
            content: 'Estudar Devops',
            labels: [],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 16,
            content: 'Team meeting',
            labels: [],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
        ]
      },
      { 
        title: 'Pausado', 
        creatable: false,
        cards: [
          {
            id: 7,
            content: 'Estudar sobre Geolocalização e mapas com React Native',
            labels: ['#7159c1'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 8,
            content: 'Estudar testes e deploy ReactJS',
            labels: ['#54e1f7'],
            user: 'https://avatars2.githubusercontent.com/u/20051707?s=460&v=4'
          },
          {
            id: 9,
            content: 'Ajustes na biblioteca unform',
            labels: [],
          }
        ]
      },
      { 
        title: 'Concluído', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 10,
            content: 'Estudar deploy e CI com React Native',
            labels: [],
          },
          {
            id: 12,
            content: 'Estudar deploy ReactJS',
            labels: ['#54e1f7'],
          },
          {
            id: 13,
            content: 'Estudar Node.js, ReactJS e React Native',
            labels: ['#7159c1'],
          }
        ]
      },
    ];
  }