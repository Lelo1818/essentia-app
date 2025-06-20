export interface InspirationalText {
  id: string;
  title: string;
  content: string;
  theme: "recovery" | "growth" | "purpose" | "courage" | "transformation" | "wisdom";
  mood: "reflective" | "uplifting" | "motivational" | "peaceful" | "empowering";
  phase: string[];
  audioNarration?: string;
  backgroundMusic?: string;
  estimatedReadTime: number; // in minutes
  keyQuotes: string[];
  author?: string;
  originalSource?: string;
}

export const inspirationalTexts: InspirationalText[] = [
  {
    id: "recovery-after-fall",
    title: "Recovery: What Comes After the Fall",
    content: `Recovery. What comes after the fall. Nobody likes to fall, but everyone falls at some point. What differentiates those who move forward is not to avoid the fall, but to learn to get up in a different way. 

Recovery is not going back to what it was before. Recovery is not erasing what happened. Recovery is transforming what broke you into something that strengthens you. Because deep down, no one is the same again after rebuilding. That's not good news.

What does the fall teach that success cannot? That vulnerability is not weakness, but courage in its purest form. That getting up is not about strength, but about choice. The choice to believe that tomorrow can be different from today.

Recovery is an art. The art of rebuilding yourself with the same pieces, but with a different design. It's understanding that scars are not signs of failure, but proof that you fought. And that you're still here.

So when you fall - and you will fall - remember: the fall is not the end of your story. It's just the beginning of a new chapter. A chapter where you discover that your greatest strength was never not falling. It was always getting up.`,
    theme: "recovery",
    mood: "empowering",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_RECOVERY_SUAVE]",
    backgroundMusic: "[MÚSICA_INSTRUMENTAL_ESPERANÇA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Recovery is transforming what broke you into something that strengthens you",
      "Vulnerability is not weakness, but courage in its purest form",
      "Scars are proof that you fought. And that you're still here"
    ]
  },
  {
    id: "inner-forest",
    title: "A Floresta Interior",
    content: `Existe uma floresta dentro de você. Uma floresta antiga, onde crescem árvores que você nem sabia que plantou. Algumas nasceram de lágrimas, outras de sorrisos. Algumas de palavras não ditas, outras de silêncios profundos.

Nesta floresta interior, cada árvore tem uma história. A árvore da coragem cresceu naquele dia em que você enfrentou o medo. A árvore da compaixão brotou quando você escolheu entender ao invés de julgar. A árvore da sabedoria se fortaleceu a cada erro que se tornou aprendizado.

Há trilhas nesta floresta que só você conhece. Caminhos que levam aos seus sonhos mais profundos, às suas verdades mais íntimas. E há clareiras - espaços de paz onde você pode simplesmente ser quem você é, sem máscaras, sem pretensões.

Quando o mundo exterior parecer caótico, lembre-se: você sempre pode voltar para sua floresta interior. Lá, entre as árvores da sua própria criação, você encontrará tudo o que precisa para continuar crescendo.`,
    theme: "purpose",
    mood: "peaceful",
    phase: ["clareira", "chamado", "respiracao"],
    audioNarration: "[NARRAÇÃO_FLORESTA_CONTEMPLATIVA]",
    backgroundMusic: "[SOM_FLORESTA_VENTO_FOLHAS]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Existe uma floresta dentro de você",
      "Cada árvore tem uma história",
      "Você sempre pode voltar para sua floresta interior"
    ]
  },
  {
    id: "breath-of-transformation",
    title: "O Sopro da Transformação",
    content: `Respire. Não apenas o ar que entra e sai dos seus pulmões, mas a vida que pulsa em cada célula do seu ser. Cada respiração é uma oportunidade de renovação, uma chance de deixar ir o que não serve mais e acolher o que está por vir.

A respiração consciente é a ponte entre quem você era e quem você está se tornando. É o primeiro passo em direção à sua transformação. Porque quando você aprende a respirar com intenção, você aprende a viver com propósito.

Inspire confiança. Expire medo. Inspire amor. Expire julgamento. Inspire possibilidades. Expire limitações. Cada ciclo respiratório é um microritual de transformação.

Há uma sabedoria antiga que diz: "A vida está na respiração." Não apenas na manutenção da vida biológica, mas na criação consciente da vida que você deseja viver. Então respire profundo, respire com intenção, respire sua nova existência.`,
    theme: "transformation",
    mood: "peaceful",
    phase: ["respiracao", "rituais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_RESPIRAÇÃO_GUIADA]",
    backgroundMusic: "[SOM_RESPIRAÇÃO_HARMÔNICA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Cada respiração é uma oportunidade de renovação",
      "A respiração consciente é a ponte entre quem você era e quem está se tornando",
      "Respire sua nova existência"
    ]
  },
  {
    id: "fire-of-purpose",
    title: "O Fogo do Propósito",
    content: `Dentro de você queima um fogo. Não o fogo da destruição, mas o fogo da criação. O fogo que ilumina caminhos escuros, que aquece corações frios, que transforma cru em cozido, desconhecido em familiar.

Este fogo é seu propósito. Ele sempre esteve lá, mesmo quando você não conseguia vê-lo. Talvez tenha sido reduzido a brasas pelas tempestades da vida, mas nunca se extinguiu completamente. Porque o fogo do propósito é eterno.

Alguns tentaram apagar seu fogo. Disseram que era perigoso, que era irreal, que era tempo perdido. Mas você sabe a verdade: um mundo sem o seu fogo é um mundo mais frio, mais escuro, menos vivo.

Agora é hora de reavivar as chamas. De soprar suavemente nas brasas até que se tornem labaredas novamente. De alimentar seu fogo com combustível da coragem, do amor, da determinação.

Deixe seu fogo queimar forte. Deixe-o iluminar não apenas seu caminho, mas também o caminho daqueles que caminham nas sombras. Porque quando você vive seu propósito, você não apenas se salva - você salva o mundo ao seu redor.`,
    theme: "purpose",
    mood: "empowering",
    phase: ["rituais", "portais", "chamado"],
    audioNarration: "[NARRAÇÃO_FOGO_PROPÓSITO]",
    backgroundMusic: "[SOM_FOGUEIRA_CREPITANDO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Dentro de você queima um fogo",
      "O fogo do propósito é eterno",
      "Quando você vive seu propósito, você salva o mundo ao seu redor"
    ]
  },
  {
    id: "wisdom-of-seasons",
    title: "A Sabedoria das Estações",
    content: `A natureza não tem pressa, mas tudo é realizado. As estações ensinam o que a sociedade esqueceu: que há tempo para tudo. Tempo para plantar e tempo para colher. Tempo para crescer e tempo para descansar. Tempo para soltar e tempo para segurar.

Você também tem suas estações interiores. Momentos de primavera, quando novas ideias brotam e a esperança floresce. Verões de abundância, quando você está em plena energia e criatividade. Outonos de reflexão, quando você colhe os frutos de seu crescimento. Invernos de recolhimento, quando você se prepara para o próximo ciclo.

A sabedoria está em honrar cada estação da sua jornada. Em não forçar flores no inverno nem exigir frutos na primavera. Em entender que cada fase tem seu propósito, sua beleza, suas lições.

Onde você está agora na sua jornada interior? Que estação sua alma está vivendo? Honre este momento. Abrace sua estação atual. Confie no tempo natural das coisas.

Porque assim como a natureza, você também está sempre no tempo certo.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_ESTAÇÕES_SABEDORIA]",
    backgroundMusic: "[SOM_NATUREZA_CICLOS]",
    estimatedReadTime: 2,
    keyQuotes: [
      "A natureza não tem pressa, mas tudo é realizado",
      "Você também tem suas estações interiores",
      "Você também está sempre no tempo certo"
    ]
  },
  {
    id: "courage-to-begin",
    title: "A Coragem de Começar",
    content: `O começo é sempre o mais difícil. Não porque seja impossível, mas porque é desconhecido. O começo exige que você deixe a segurança do familiar e se aventure no território do "ainda não sei".

Mas aqui está o segredo que poucos te contam: você não precisa saber tudo antes de começar. Você não precisa ter todas as respostas, todos os recursos, toda a confiança. Você só precisa de uma coisa: a coragem de dar o primeiro passo.

A coragem não é a ausência do medo. É sentir o medo e agir mesmo assim. É olhar para o desconhecido e dizer: "Não sei o que vai acontecer, mas vou descobrir." É confiar que você tem dentro de si tudo o que precisa para lidar com o que vier.

Cada grande jornada começou com um único passo. Cada obra-prima começou com uma única pincelada. Cada transformação começou com uma única decisão. A sua também pode começar agora.

Então respire fundo. Sinta seus pés no chão. E dê o primeiro passo em direção ao que seu coração está chamando. O caminho se fará ao caminhar.`,
    theme: "courage",
    mood: "motivational",
    phase: ["clareira", "chamado", "portais"],
    audioNarration: "[NARRAÇÃO_CORAGEM_COMEÇAR]",
    backgroundMusic: "[MÚSICA_INSTRUMENTAL_INSPIRADORA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Você só precisa da coragem de dar o primeiro passo",
      "A coragem é sentir o medo e agir mesmo assim",
      "O caminho se fará ao caminhar"
    ]
  },
  {
    id: "sacred-pause",
    title: "A Pausa Sagrada",
    content: `Entre o estímulo e a resposta, há um espaço. Nesse espaço está nosso poder de escolher nossa resposta. Em nossa resposta está nosso crescimento e nossa liberdade.

Esta é a pausa sagrada. O momento de respirar antes de reagir. O instante de sentir antes de pensar. O espaço de ser antes de fazer.

Em um mundo que glorifica a velocidade, a pausa é um ato revolucionário. É dizer: "Eu escolho responder conscientemente ao invés de reagir automaticamente." É criar espaço para a sabedoria emergir.

Na pausa sagrada, você se reconecta com sua essência. Com seus valores. Com suas intenções mais profundas. Você lembra quem você realmente é, além das pressões e expectativas externas.

Pratique a pausa sagrada. Entre cada respiração. Entre cada pensamento. Entre cada palavra. Entre cada ação. Nestes pequenos espaços de consciência, você encontrará sua liberdade.

Porque a verdadeira força não está na velocidade da reação, mas na qualidade da resposta.`,
    theme: "wisdom",
    mood: "peaceful",
    phase: ["respiracao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_PAUSA_SAGRADA]",
    backgroundMusic: "[SOM_SILÊNCIO_CONTEMPLATIVO]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Entre o estímulo e a resposta, há um espaço",
      "A pausa é um ato revolucionário",
      "A verdadeira força está na qualidade da resposta"
    ]
  },
  {
    id: "fall-as-portal",
    title: "A Queda Não É o Fim. É o Portal.",
    content: `A maioria das pessoas ainda vive como se cair fosse o oposto de vencer. Mas o que você trouxe aqui desmonta essa ilusão com coragem e lucidez.

Você lembrou que:
- A queda revela o que o sucesso disfarça.
- A dor não precisa ser evitada — ela precisa ser integrada.
- E o tempo não cura sozinho. É o uso que você faz dele que te transforma.

Esse texto é um chamado. Um despertar para a reconstrução verdadeira — aquela que não mascara, não anula, não volta a ser como era. Aquela que transcende.

A queda não é o fim da sua história. É o portal para uma versão mais autêntica de quem você pode se tornar.`,
    theme: "recovery",
    mood: "empowering",
    phase: ["transicao", "rituais", "encerramento"],
    audioNarration: "[NARRAÇÃO_QUEDA_PORTAL]",
    backgroundMusic: "[MÚSICA_TRANSFORMAÇÃO_PROFUNDA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "A queda revela o que o sucesso disfarça",
      "A dor não precisa ser evitada — ela precisa ser integrada",
      "A queda não é o fim. É o portal."
    ]
  },
  {
    id: "intelligent-posture",
    title: "A Postura Inteligente",
    content: `Chegando aqui na ponte de luz... Meu nome é Paulo de Souza, e eu queria te contar uma coisa sobre inteligência.

Hoje em dia, muita gente fala de inteligência artificial — e com razão. Mas deixa eu te lembrar de algo:

A nossa inteligência natural, o nosso cérebro, é uma máquina de perguntas.

Ele se desenvolveu enfrentando problemas. A neuroplasticidade, essa capacidade de aprender e mudar, se ativa com desafios. Nosso cérebro precisa disso. Gosta disso. Vive disso.

A gente aprendeu a fazer boas perguntas para a IA. Mas será que estamos fazendo boas perguntas pra nós mesmos?

Só que tem um detalhe: Essas perguntas precisam nascer fora do medo. Fora da arrogância. Fora da ignorância.

Em vez de dizer: "Eu sou bom nisso." Experimente perguntar: "O que eu preciso fazer pra me tornar bom nisso?"

Em vez de afirmar: "Minha vida está difícil." Pergunte: "O que eu preciso fazer pra construir a vida que eu quero viver?"

Nosso cérebro responde ao que perguntamos. Então, faça perguntas inteligentes, com propósito. Porque, assim como a inteligência artificial precisa de boas perguntas para ser útil, a sua inteligência natural também.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["chamado", "portais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_POSTURA_INTELIGENTE]",
    backgroundMusic: "[SOM_PONTE_LUZ_CONTEMPLATIVO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Nosso cérebro é uma máquina de perguntas",
      "Faça perguntas inteligentes, com propósito",
      "O que eu preciso fazer pra construir a vida que eu quero viver?"
    ]
  },
  {
    id: "economy-of-intention",
    title: "A Economia da Intenção",
    content: `Hoje, o mundo não gira mais só na moeda do dinheiro. Gira na moeda da intenção.

Vivemos na era da atenção disputada, monetizada, manipulada. Mas se você olhar com calma... vai ver que a atenção é rasa. É a intenção que transforma.

Na economia da atenção: Você consome. Você é distraído. Você perde tempo.

Na economia da intenção: Você foca. Você se desenvolve. Você transforma informação em ação.

O que importa agora?
- Não é o que você vê — é onde e por quê você está olhando.
- Não é o quanto você faz — é o que de fato importa.
- Não é o quanto você sabe — é o que você faz com o que sabe.

Intenção liberta. Atenção pode ser sequestrada por algoritmos. Mas a intenção é escolha. É consciência.

Então, eu te pergunto: Qual é a tua intenção hoje?

Antes de começar o dia, antes de abrir o app, antes de estudar, antes de agir... Pergunte: Qual é a minha intenção?

E coloca ela em tudo — Mesmo que seja só pra aprender, descobrir ou se conectar. Mas coloca. Porque é isso que move o mundo. E é isso que muda a sua vida.`,
    theme: "purpose",
    mood: "motivational",
    phase: ["chamado", "portais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_ECONOMIA_INTENÇÃO]",
    backgroundMusic: "[MÚSICA_FOCO_CONSCIENTE]",
    estimatedReadTime: 3,
    keyQuotes: [
      "O mundo gira na moeda da intenção",
      "Intenção liberta. Atenção pode ser sequestrada",
      "Qual é a tua intenção hoje?"
    ]
  },
  {
    id: "living-spirituality",
    title: "Espiritualidade Viva",
    content: `Eu deixei o aeroporto em Lisboa com tudo que eu tinha em uma mala. O ar frio daquela terra me deu um tapa no rosto. O medo inicial cedeu espaço ao entusiasmo — palavra que vem do grego e significa: "ter Deus dentro de si."

Naquele momento, eu não sabia... Mas era o começo de uma jornada que me levaria a descobrir uma espiritualidade prática, viva, renovável — todos os dias.

Espiritualidade hoje não é mais religião. Muita gente se considera espiritual, mas não religiosa. Acreditam em algo que vai além das tradições. Algo que sustenta, dá base, mas não oprime.

A nova espiritualidade:
- Não precisa ser mística.
- Não precisa ser distante.
- Ela pode ser respirada.
- Ela pode ser vivida agora.

Está em: um momento de paz interior, a alegria de respirar ao sol, a leveza de ser quem você é, a inocência boa de uma criança que sorri.

Essas experiências são transcendentes, mesmo sem precisar de uma divindade absoluta.

Mas olhar pra dentro... não é fácil. Nossas mentes carregam feridas, ruídos, memórias difíceis. Mas é exatamente nessa jornada interior que moram os valores mais altos da vida humana: Amor. Compaixão. Empatia. Beleza. Sabedoria. Paz.

Espiritualidade prática: Não precisa de dogmas. Não precisa de rituais. Ela pode ser tocada todos os dias. É sobre crescer. Transcender. Encontrar sentido no simples.

Porque todos somos buscadores. E sim, Deus habita dentro de nós. Basta acender a luz — nas atitudes.`,
    theme: "transformation",
    mood: "peaceful",
    phase: ["clareira", "respiracao", "encerramento"],
    audioNarration: "[NARRAÇÃO_ESPIRITUALIDADE_VIVA]",
    backgroundMusic: "[SOM_LISBOA_CONTEMPLATIVO]",
    estimatedReadTime: 4,
    keyQuotes: [
      "Entusiasmo significa ter Deus dentro de si",
      "Espiritualidade pode ser vivida agora",
      "Deus habita dentro de nós. Basta acender a luz"
    ]
  },
  {
    id: "power-of-giving",
    title: "O Poder de Doar",
    content: `O que você entrega ao mundo… fica em você.

A ideia de doar sempre foi mal compreendida. Muitos enxergam a doação como perda, como sacrifício, como esforço. Mas a verdade é que ninguém perde quando doa. A gente só descobre que tinha mais do que imaginava.

O tempo que você doa não é perdido. A atenção que você doa não é desperdiçada. O conhecimento que você compartilha nunca deixa de voltar.

E o mais curioso? A vida retribui. Mas nunca pelo caminho mais óbvio.

Mas afinal… o que é doar de verdade? Doar não é sobre dinheiro. É sobre oferecer o que você tem de mais valioso: Tempo. Atenção. Escuta. Conhecimento. Presença.

Doar não vem da falta. Vem da abundância.

Se você sente que precisa segurar tudo o que tem, talvez o problema não esteja fora… Mas dentro.

Doar é um estado. As pessoas que mais constroem, inovam e transformam o mundo são aquelas que entenderam isso: O verdadeiro impacto não está no que acumulam. Está no que deixam para os outros.

Em um mundo de relações frágeis, baseadas em troca e interesse, doar é o único caminho para criar laços que resistem ao tempo.

Como doar, então? Doe presença. Doe conhecimento. Doe reconhecimento. Doe oportunidade.

A única doação que transforma é aquela feita sem cálculo, sem expectativa, sem contrato. Porque é por isso que se chama doar — não barganhar.

Então doe. Doe aquilo que você tem de melhor: você mesmo. Você vai ver. Vai ficar mais rico. Mais interessante. Mais valioso.`,
    theme: "growth",
    mood: "uplifting",
    phase: ["portais", "chamado", "encerramento"],
    audioNarration: "[NARRAÇÃO_PODER_DOAR_EXPANDIDO]",
    backgroundMusic: "[MÚSICA_ABUNDÂNCIA_CORAÇÃO]",
    estimatedReadTime: 4,
    keyQuotes: [
      "O que você entrega ao mundo… fica em você",
      "Doar não vem da falta. Vem da abundância",
      "Doe aquilo que você tem de melhor: você mesmo"
    ]
  },
  {
    id: "power-of-partnerships",
    title: "O Poder das Parcerias",
    content: `O mundo valoriza a ideia do "self-made". Do sucesso solitário. Da narrativa de quem chegou lá sozinho.

Mas a verdade? Ninguém constrói nada grande sem colaboração.

Parcerias não são só trabalho em equipe. São redes de apoio. Trocas reais. Crescimento mútuo.

A pergunta não é: "Será que eu preciso de parceiros?" A pergunta é: "Os parceiros que eu tenho estão me fortalecendo ou consumindo minha energia?"

Porque colaboração não é estar junto. É crescer junto.

Como criar parcerias que geram valor?

1. Verdade vem antes do interesse. Parceria de verdade não nasce da necessidade, mas da conexão genuína.

2. Pensar diferente é um presente. As melhores parcerias não são feitas por quem sempre concorda. São feitas por quem se complementa.

3. Sinergia vale mais que talento. Ter gente habilidosa ao lado é bom. Mas sem alinhamento de valores, nada flui.

4. Confiança não se terceiriza. Parceria não é contrato. É compromisso diário.

5. O jogo não é competição. É complementaridade. Se você vê todo mundo como rival, vai perder a chance de criar alianças reais.

6. O futuro é de quem soma. Dividir desgasta. Somar constrói.

7. Parcerias transformam ideias em realidade. Fazer tudo sozinho pode até parecer mais rápido. Mas nunca vai ser mais forte.

8. Coisas grandes são construídas em rede. Com apoio. Com inteligência coletiva. Com troca certa.

Então, se você tem um projeto, um sonho, uma visão — pare de tentar carregar o mundo sozinho. Conecte-se com quem vibra na mesma frequência. Desenvolva parcerias do jeito certo. E veja o impossível virar possível.`,
    theme: "growth",
    mood: "motivational",
    phase: ["portais", "engajamento", "chamado"],
    audioNarration: "[NARRAÇÃO_PODER_PARCERIAS]",
    backgroundMusic: "[MÚSICA_COLABORAÇÃO_HARMÔNICA]",
    estimatedReadTime: 4,
    keyQuotes: [
      "Ninguém constrói nada grande sem colaboração",
      "Colaboração não é estar junto. É crescer junto",
      "O futuro é de quem soma. Dividir desgasta"
    ]
  },
  {
    id: "challenging-moments",
    title: "Os Momentos Desafiadores",
    content: `Eu prefiro chamar de desafiadores, porque não é sempre isso que a gente enfrenta, é sempre o que você também está enfrentando.

Há sempre um lugar, um processo, um caminho que nos leva a entender que esses momentos são necessários. Todos eles já precisaram, nos fazem ser melhores, inclusive mais fortes.

Nesses momentos desafiadores, eles ocorrem muitas vezes como consequências do passado. Alguma coisa aconteceu, a gente decidiu de um jeito que agora precisa lidar com as consequências.

Sabe o que a gente precisa fazer? Aprender, reposicionar, reformular. É isso que a gente precisa fazer: aceitar o que aconteceu sem se penalizar, seguir em frente de outra maneira.

Existem também os desafiadores do presente, aqueles que nos desafiam pelos dilemas do presente, agora, neste momento. Por isso precisamos insistir, precisamos desenvolver alternativas.

E os desafiadores do futuro - esses requerem que a gente aprenda, aceite, agradeça e siga em frente.

Cada momento desafiador é uma oportunidade de crescimento. Não é sobre o que acontece com você, mas sobre como você responde ao que acontece.`,
    theme: "courage",
    mood: "empowering",
    phase: ["transicao", "rituais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_MOMENTOS_DESAFIADORES]",
    backgroundMusic: "[MÚSICA_SUPERAÇÃO_CORRIDA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Momentos desafiadores nos fazem ser melhores",
      "Aceitar o que aconteceu sem se penalizar",
      "Cada momento desafiador é uma oportunidade de crescimento"
    ],
    author: "Paulo de Souza",
    originalSource: "Reflexões durante corrida"
  },
  {
    id: "three-doors-story",
    title: "A História das Três Portas",
    content: `Você conhece a História das Três Portas? É uma pesquisa do estudo comportamental, num jogo virtual, onde as pessoas entravam nessas portas e tinham várias recompensas por trás delas.

O jogo era o seguinte: se elas demorassem e uma porta ficasse inativa durante muito tempo, ela ia acabar. Não teria mais aquela oportunidade.

O que acontecia? As pessoas entravam e saíam para não inativar nenhuma porta. E, com isso, elas não se aprofundavam nas experiências e possibilidades que tinham ali.

Ao invés de mergulhar para encontrar uma porta, descobrir o que havia ali e ir a fundo para descobrir qual era a recompensa, elas se preocupavam em não perder.

Essa é a economia comportamental. Nosso cérebro tem mais dor, sente mais na dor de perda do que no ganho de alguma coisa que possa acontecer.

Será que você não está pulando de porta em porta, sem se aprofundar muito naquilo que já você tem na sua mão? A resposta, o processo, o resultado?

Às vezes, a melhor estratégia não é manter todas as opções abertas, mas escolher uma porta e explorar completamente o que ela tem a oferecer.

O medo de perder oportunidades pode nos impedir de realmente aproveitar as oportunidades que temos.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["chamado", "portais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_TRÊS_PORTAS]",
    backgroundMusic: "[SOM_REFLEXÃO_CAMINHADA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Nosso cérebro sente mais a dor de perda do que o ganho",
      "Às vezes é melhor escolher uma porta e explorá-la completamente",
      "O medo de perder pode nos impedir de aproveitar o que temos"
    ],
    author: "Paulo de Souza",
    originalSource: "Reflexões sobre economia comportamental"
  },
  {
    id: "preparing-for-the-leap",
    title: "Preparando para o Salto",
    content: `Os olhos da série preparando o salto. O capítulo de hoje é medo.

Há quatro anos, eu estava dando o meu primeiro salto no mundo e agora estou preparando o meu novo salto. E vou compartilhar contigo o que fazer nesse momento.

A primeira coisa é saber por que quer saltar.

A verdade é que o salto nunca acontece no momento em que você pula. Começa muito antes, na inquietação que você ignorou, na dúvida que foi crescendo, na sensação de que o que você fez até aqui já não é suficiente para o que quer levar adiante.

Todo salto começa antes de acontecer: na mente, no medo, no frio na barriga. O medo de não saber onde vai aterrissar, o medo de se despedir da versão antiga de si mesmo, o medo de perder o controle.

Mas olha só: o medo não é o problema. É o apego que ainda está te segurando no chão.

Toda grande mudança começa assim: com hesitação, incerteza, dúvidas se você realmente vai conseguir. Mas, pelo menos, isso significa que você está saindo da zona de conforto e evoluindo.

E aí entra a visualização. Você precisa ver além, pesquisar, imaginar, ver o salto antes dele acontecer.

Eu me tornei experiente em saltar. Você verá que isso acontecerá com você também.

Apenas uma dica: mantenha o medo por perto. Ele vai aprimorar o seu processo. É um combustível para saltar com você e, rapidamente, você vai transformá-lo em coragem.`,
    theme: "courage",
    mood: "motivational",
    phase: ["portais", "chamado", "rituais"],
    audioNarration: "[NARRAÇÃO_PREPARANDO_SALTO]",
    backgroundMusic: "[MÚSICA_CORAGEM_MOVIMENTO]",
    estimatedReadTime: 4,
    keyQuotes: [
      "O salto começa muito antes de você pular",
      "O medo não é o problema. É o apego que te segura",
      "Mantenha o medo por perto. Ele vai se transformar em coragem"
    ]
  },
  {
    id: "determine-your-value",
    title: "Determine Seu Valor",
    content: `É de verdade que levarei comigo uma nova viagem, não é? Então vou compartilhar alguns insights fundamentais.

Primeiro: determine o seu valor, mas também saiba entender o que é valor para o outro. Se estiverem alinhados, tudo bem. Caso não, siga o seu caminho.

Segundo: os seus inimigos não estão fora de você, estão dentro. Podem aparecer se você não se cuidar. A melhor arma contra eles é estar no presente, observar ao invés de julgar, e praticar a aceitação.

A verdade é simples: você não pode controlar como os outros te veem, mas pode controlar como você se vê e como você entrega valor ao mundo.

Quando você sabe o seu valor, não precisa convencer ninguém. Quando você não sabe, nenhuma validação externa será suficiente.

O segredo está em alinhar seu valor interno com o valor que você entrega. Quando há essa congruência, as pessoas certas naturalmente se aproximam e as pessoas erradas naturalmente se afastam.

Isso não é sobre arrogância. É sobre clareza. É sobre saber quem você é e o que você tem para oferecer, sem precisar diminuir nem inflar sua importância.`,
    theme: "purpose",
    mood: "empowering",
    phase: ["chamado", "portais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_DETERMINE_VALOR]",
    backgroundMusic: "[MÚSICA_AUTOCONFIANÇA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Determine seu valor, mas entenda o que é valor para o outro",
      "Seus inimigos não estão fora, estão dentro",
      "Quando você sabe seu valor, não precisa convencer ninguém"
    ]
  },
  {
    id: "who-are-you-really",
    title: "Quem Você É de Verdade",
    content: `Quem você seria por trás de todas as metas que usa, por trás das poses para agradar os outros, das expectativas que carrega, das histórias que conta para se encaixar?

Quem você seria, de uma vez por todas, se parasse de tentar ser alguém e simplesmente fosse?

Desde que você era criança, a sociedade vem te ensinando a se encaixar. Escola, trabalho, redes sociais - tudo parece feito para te moldiar, para te transformar em mais um na multidão.

Você aprendeu a seguir roteiros que outros escreveram para a sua vida. Mas e se esse roteiro não for seu? E se essa pessoa que você está tentando ser não for quem você realmente é?

A questão não é rejeitar tudo e se isolar. A questão é encontrar o equilíbrio entre pertencer e permanecer autêntico. Entre se conectar e não se perder.

Ser autêntico não significa ser perfeito. Significa ser real. Significa aceitar suas contradições, suas dúvidas, suas imperfeições - e ainda assim se mostrar ao mundo.

Porque no final, as pessoas não se conectam com perfeição. Elas se conectam com verdade. Com vulnerabilidade. Com humanidade.

Então pare um momento e se pergunte: quem eu seria se não estivesse tentando ser ninguém além de mim mesmo?`,
    theme: "purpose",
    mood: "reflective",
    phase: ["clareira", "respiracao", "chamado"],
    audioNarration: "[NARRAÇÃO_QUEM_VOCÊ_É]",
    backgroundMusic: "[MÚSICA_INTROSPECÇÃO_SUAVE]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Quem você seria se simplesmente fosse?",
      "As pessoas se conectam com verdade, não com perfeição",
      "Ser autêntico significa ser real, não perfeito"
    ]
  },
  {
    id: "time-and-presence",
    title: "Tempo e Presença",
    content: `Em Interestelar, algumas horas de um planeta distante custavam anos na Terra. Tempo não é absoluto. Ele se curva, se expande, se desacelera, e na vida real não é diferente.

A longevidade não está só no corpo, mas na forma como sentimos o tempo.

Um minuto de presença vale mais do que horas distraídas. Relações de confiança criam um espaço onde o tempo desacelera. O propósito é que faz um ano valer por dez.

A ciência já provou que o tempo é uma percepção. Quando estamos engajados, presentes, vivendo com intenção, o tempo se expande. Quando estamos no piloto automático, os anos passam sem deixar rastro.

Você pode viver 80 anos e experimentar apenas algumas horas de vida real. Ou pode viver 40 anos tão presentes, tão intencionais, que cada momento se torna uma eternidade.

O segredo da longevidade emocional não está em acumular anos, mas em multiplicar momentos. Não está em existir por muito tempo, mas em estar verdadeiramente vivo no tempo que você tem.

Então a pergunta não é: quanto tempo você tem? A pergunta é: quão presente você está no tempo que tem?`,
    theme: "wisdom",
    mood: "peaceful",
    phase: ["respiracao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_TEMPO_PRESENÇA]",
    backgroundMusic: "[MÚSICA_TEMPORAL_CONTEMPLATIVA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Um minuto de presença vale mais que horas distraídas",
      "O propósito faz um ano valer por dez",
      "Quão presente você está no tempo que tem?"
    ]
  },
  {
    id: "ma-japanese-void",
    title: "Ma - O Vazio Japonês",
    content: `É uma das leituras de um enteograma japonês representado pelo sol no meio de um portal. Simples como a expressão japonesa se propõe a ser.

"Ma" é entendido como um intervalo de tempo, um espaço entre dois elementos, ou seja, um vazio.

No ocidente contemporâneo, a gente precisa preencher tudo. Os espaços vazios nos assombram. Isso faz com que encontremos e até estabeleçamos respostas superficiais para questões complexas.

É melhor ficar com o vazio do que com uma resposta rasa.

O "Ma" nos ensina que o vazio não é ausência - é potencial. Não é falta - é espaço para o novo emergir. Não é silêncio morto - é o silêncio grávido de possibilidades.

Na música, as pausas são tão importantes quanto as notas. Na arquitetura, os espaços vazios definem a funcionalidade. Na vida, os intervalos são onde a transformação acontece.

Viver como um designer e um cientista significa respeitar o espaço do "não sei". Significa honrar a pausa. Significa entender que nem tudo precisa ser preenchido, explicado, resolvido imediatamente.

Às vezes, a resposta mais sábia é: "Eu não sei. E está tudo bem não saber por enquanto."

O "Ma" é uma abordagem que traz mais autenticidade e profundidade para o aprendizado e para a vida.`,
    theme: "wisdom",
    mood: "peaceful",
    phase: ["respiracao", "clareira", "bem-estar"],
    audioNarration: "[NARRAÇÃO_MA_JAPONÊS]",
    backgroundMusic: "[SOM_SILÊNCIO_CONTEMPLATIVO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "O vazio não é ausência - é potencial",
      "É melhor ficar com o vazio que com resposta rasa",
      "Às vezes a resposta mais sábia é: eu não sei"
    ]
  },
  {
    id: "live-dont-perform",
    title: "Viva, Não Performe",
    content: `Porque buscamos validação em muitas superficialidades. Vivemos na era do reflexo - não olhamos mais para dentro, mas para o espelho que os outros seguram.

Queremos ser vistos, curtidos, compartilhados, como se a validação externa fosse a prova de que existimos. "Penso, logo existo" foi substituído por "Posto, logo existo".

Somos condicionados a colecionar aparências e não significados. A validação que buscamos é como água salgada - parece matar a sede, mas só aumenta a sede.

O problema não está em querer ser visto, colocar sua proposta na mesa e se conectar. O problema está em trocar o real pelo fake e se confundir com isso.

O ponto zero de qualquer trajetória é ser você mesmo. Se você começa não sendo você mesmo, você vai se perdendo no caminho, ou já nasceu perdido.

Se você tem conteúdo e valor para entregar - por sua experiência, sua intenção, sua dedicação - isso é importante e fundamental. Não precisa de artifícios para ter credibilidade, porque as pessoas reais se interessam pelo que você tem a oferecer de verdade.

Não existem pessoas perfeitas, relacionamentos perfeitos, estratégias perfeitas. É na imperfeição, na vulnerabilidade, que existe a conexão verdadeira.

Eu, por exemplo, sou falho - e isso me torna o meu melhor mentor. Porque é onde eu trabalho, onde eu melhoro, onde eu me desenvolvo, onde eu entendo os desafios.

Então: viva, logo existe.`,
    theme: "purpose",
    mood: "empowering",
    phase: ["chamado", "engajamento", "bem-estar"],
    audioNarration: "[NARRAÇÃO_VIVA_NÃO_PERFORME]",
    backgroundMusic: "[MÚSICA_AUTENTICIDADE]",
    estimatedReadTime: 4,
    keyQuotes: [
      "O ponto zero de qualquer trajetória é ser você mesmo",
      "É na imperfeição que existe a conexão verdadeira",
      "Viva, logo existe"
    ]
  },
  {
    id: "fall-in-love",
    title: "Apaixone-se",
    content: `Apaixone-se. Apaixone-se por você mesmo, sem achar feio aquilo que não é espelho.

Apaixone-se pela vida, que é o verdadeiro Deus. A vida não é sua, nem minha. Ela é um acontecimento universal do qual fazemos parte.

Apaixone-se pelos seres que tocam em você, por aqueles que você toca de alguma maneira - seja pelo amor, a amizade, a escuta, o sorriso e até o sofrimento.

Apaixone-se pelo toque, pelos sons, pelos aromas, pelos olhos. Apaixone-se pela beleza das entrelinhas, do jeito de ser, dos detalhes que importam.

Apaixone-se pelos projetos, pelos sonhos, pelos reconhecimentos. Apaixone-se pelos sinais, pelas dúvidas, pelas histórias.

Dizem que uma paixão dura cerca de um ano, porque é uma projeção que logo se transforma em realidade. Então, apaixone-se pela realidade.

E ao fazer isso, tenha tanta paixão pelo meio, pelo outro. E descubra que toda emoção é um benefício. E você é um alquimista de emoções.

É dentro de você que o mundo acontece primeiro. Então, apaixone-se por conhecer as emoções.

Porque quando você se apaixona verdadeiramente pela vida, pela realidade, por si mesmo - você deixa de buscar a felicidade e passa a ser felicidade.`,
    theme: "transformation",
    mood: "uplifting",
    phase: ["clareira", "respiracao", "encerramento"],
    audioNarration: "[NARRAÇÃO_APAIXONE_SE]",
    backgroundMusic: "[MÚSICA_AMOR_PRÓPRIO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Apaixone-se por você mesmo, sem achar feio aquilo que não é espelho",
      "A vida é um acontecimento universal do qual fazemos parte",
      "É dentro de você que o mundo acontece primeiro"
    ]
  },
  {
    id: "what-you-dont-understand",
    title: "O que Você Não Entende Te Domina",
    content: `O que você não entende ainda te domina. O que você não compreende em si mesmo - a dor não resolvida, os medos silenciosos - continua influenciando suas escolhas, relações e resultados.

É como navegar em um mar desconhecido, onde você não vê o fundo, mas esse fundo influencia muito a superfície.

Jung dizia que até você se tornar consciente, o inconsciente vai dirigir sua vida e você vai chamar isso de destino.

Então, vou dar algumas estratégias para iluminar esse destino:

Primeiro: identificar padrões. Observar as repetições nas relações, nas reações e nas decisões que você toma automaticamente.

Segundo: nomear as emoções. Quando sentir algo intenso, pergunte: "O que exatamente eu estou sentindo e de onde vem isso?"

Terceiro: questionar as crenças. Muitas crenças vieram lá de trás e ainda continuam no presente sem você questionar se ainda servem.

Quarto: reescrever a narrativa. Substituir "sempre erro" por "estou aprendendo algo novo".

A arte da estratégia não é só para negócios - é para a vida toda. Ser racional, consciente e intencional.

E sabe qual é a única posição presente em qualquer pesquisa sobre felicidade? Ser dono da própria vida, ter autonomia para decidir conscientemente.

Quando você entende o que antes te dominava, você se torna livre para escolher.`,
    theme: "wisdom",
    mood: "empowering",
    phase: ["chamado", "portais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_O_QUE_NÃO_ENTENDE]",
    backgroundMusic: "[MÚSICA_AUTOCONHECIMENTO]",
    estimatedReadTime: 4,
    keyQuotes: [
      "O que você não entende ainda te domina",
      "Até você se tornar consciente, o inconsciente dirige sua vida",
      "Ser dono da própria vida é ter autonomia para decidir conscientemente"
    ]
  },
  {
    id: "confidence-and-doubt",
    title: "Confiança e Dúvida",
    content: `Confiança e dúvida ocupam o mesmo lugar, assim como amor e indiferença, sabedoria e arrogância, serenidade e ansiedade, paz e medo, prosperidade e egoísmo, atenção e distração.

Para ter uma, é preciso deixar a outra. Para deixar a outra, é preciso nutrir uma.

Escolher quem vamos nutrir vai definir nosso presente, nosso futuro. Seja mudar de país, mudar de emprego, ou simplesmente viver melhor.

Tudo é decisão, atitude e consistência. Mas isso não quer dizer ser perfeito - algumas coisas podem até caminhar juntas e está tudo bem.

Por exemplo: medo e coragem, vulnerabilidade e força, relacionamento e individualidade, disciplina e liberdade.

Somos humanos, imperfeitos e, muitas vezes, incoerentes. Mas temos um imenso poder de escolha, aqui e agora.

Como disse Chico Xavier: "Não há ninguém que possa voltar atrás e fazer um novo começo. Mas qualquer um pode começar agora e fazer um novo fim."

A questão não é eliminar todas as contradições - é escolher conscientemente quais aspectos de nós mesmos vamos alimentar.

Porque você é sempre uma escolha de distância de quem quer se tornar.`,
    theme: "wisdom",
    mood: "motivational",
    phase: ["transicao", "portais", "encerramento"],
    audioNarration: "[NARRAÇÃO_CONFIANÇA_DÚVIDA]",
    backgroundMusic: "[MÚSICA_REFLEXÃO_ESPERANÇA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Para ter uma, é preciso deixar a outra",
      "Qualquer um pode começar agora e fazer um novo fim",
      "Você é sempre uma escolha de distância de quem quer se tornar"
    ]
  },
  {
    id: "karma-dharma-transformation",
    title: "Karma, Dharma e Você",
    content: `Karma e Dharma não são apenas conceitos antigos. São ferramentas vivas. Estratégicas. Nos ajudam a entender o que nos move — e o que nos trava.

Karma não é o que o mundo faz com você. É o que você faz com você mesmo. É reação sem consciência. É repetir padrões por medo, por inércia, por ignorância.

Dharma é o oposto. É presença. É intenção alinhada. É quando sua ação vibra com tudo aquilo que você nasceu pra ser.

Dharma não exige prontidão. Exige verdade. Não é sobre estar preparado. É sobre fazer o que precisa ser feito — mesmo com dúvida, mesmo com medo.

Karma + Dharma = alquimia. Quando você age com consciência, transforma o peso em movimento. A dor vira propósito. A queda vira impulso. A repetição vira caminho.

É um sistema natural de causa e efeito. Quando você age inconscientemente, reage com medo ou ignorância, karma se acumula e você fica preso nos mesmos ciclos.

Mas quando você escolhe a consciência, quando alinha intenção com ação, você transforma karma em dharma. Peso em movimento. Estagnação em força.

A grande virada não acontece em datas. Ela acontece quando você escolhe agir com intenção. Quando decide transformar a repetição em caminho.

Essa escolha está nas suas mãos. A partir de agora.`,
    theme: "transformation",
    mood: "empowering",
    phase: ["portais", "rituais", "encerramento"],
    audioNarration: "[NARRAÇÃO_KARMA_DHARMA]",
    backgroundMusic: "[MÚSICA_SABEDORIA_ORIENTAL]",
    estimatedReadTime: 4,
    keyQuotes: [
      "Karma é o que você faz com você mesmo",
      "Dharma é quando sua ação vibra com tudo que você nasceu pra ser",
      "Transforma o peso em movimento, a dor em propósito"
    ]
  },
  {
    id: "pain-and-path-reflection",
    title: "Reflexão - Sobre a Dor e o Caminho",
    content: `Pensando em como lidei com as dores neste ano… Dores internas, dores externas. Dores de crédito, dores sociais, dores econômicas.

Como vivemos, não é? Tantas expectativas, necessidades, demandas dos outros — e nossas também.

E essas dores… Essas dores são superadas por algumas coisas.

Resiliência. A nossa capacidade de perseverar, de persistir. Isso é essencial.

E a capacidade de aprender. Porque quanto mais a gente aprende, mais preparado fica. Preparado para o ambiente, para o contexto, para os desafios.

Essas duas forças — resiliência e aprendizado — são a base. Precisamos evoluir.

A dor não é inútil. Ela nos ensina. Nos fortalece. Nos prepara para enfrentar o que vier. Mas só se a gente escolher aprender com ela ao invés de apenas suportá-la.

A combinação de resistir e aprender é o que nos faz crescer. É o que nos torna mais preparados para viver plenamente, mesmo em meio às tempestades.`,
    theme: "growth",
    mood: "reflective",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_DOR_CAMINHO]",
    backgroundMusic: "[MÚSICA_REFLEXÃO_PROFUNDA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Essas dores são superadas por resiliência e aprendizado",
      "Quanto mais a gente aprende, mais preparado fica",
      "A dor nos ensina, nos fortalece, nos prepara"
    ],
    author: "Paulo de Souza",
    originalSource: "Reflexões pessoais"
  },
  {
    id: "manifesto-the-time-is-now",
    title: "MANIFESTO - A Hora é Agora",
    content: `A vida que você vive hoje, as coisas que você faz, os sonhos que você tem… São realmente seus?

Ou você está no piloto automático, acreditando que "um dia" vai ser o dia?

A verdade é que um dia nunca chega. O futuro não acontece — ele é construído. E toda decisão que você adia, entrega sua vida nas mãos de algo que não tem nada a ver com a sua história.

Chegou a hora de mudar esse jogo. De parar de aceitar o mínimo, quando você nasceu pra viver o máximo. Sua história é uma obra-prima inacabada — e só você pode completá-la.

O medo é real. A dúvida também. Mas a coragem… a coragem é agir mesmo com medo.

Você não precisa ser perfeito. Você só precisa começar. Um passo. Uma escolha. Uma ação.

Tudo o que você quer está do outro lado da zona de conforto.

Hoje. Agora. Não depois. Levante-se. Decida-se. A vida não é sobre encontrar quem você é. É sobre criar quem você escolhe ser.`,
    theme: "courage",
    mood: "motivational",
    phase: ["chamado", "portais", "rituais"],
    audioNarration: "[NARRAÇÃO_MANIFESTO_AGORA]",
    backgroundMusic: "[MÚSICA_ÉPICA_TRANSFORMAÇÃO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "O futuro não acontece — ele é construído",
      "A coragem é agir mesmo com medo",
      "É sobre criar quem você escolhe ser"
    ]
  },
  {
    id: "five-truths-that-anchor-us",
    title: "5 Verdades que nos Ancoram",
    content: `Vamos morrer um dia. Todos nós. Tudo é passageiro — inclusive a nossa própria vida. Isso não é triste. Isso é urgência com sentido.

O mais importante da vida são as pessoas que amamos e que nos amam. No fim das contas, é isso que vai importar. É isso que sustenta.

Todos temos um propósito. Uma missão, um chamado. Algo que pulsa dentro. Nosso papel é descobrir, redescobrir e realizar isso todos os dias, de forma melhor, mais alinhada, mais real.

Vamos nos decepcionar. Com os outros. Com nós mesmos. Mas são justamente nesses momentos que a sensibilidade pode nascer. É quando a cortina cai que a janela se abre.

Fazemos parte de um universo inacreditável. E ainda assim, nos achamos o centro. Não somos mais, nem menos. Somos parte. E nisso está o verdadeiro valor.

Pensa nisso. Respira isso. Volta aqui sempre que esquecer.

Essas verdades não são deprimentes - são libertadoras. Elas nos ancoram no que realmente importa e nos liberam do que é superficial.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["bem-estar", "encerramento", "respiracao"],
    audioNarration: "[NARRAÇÃO_CINCO_VERDADES_ANCORA]",
    backgroundMusic: "[MÚSICA_ÂNCORA_CONTEMPLATIVA]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Isso não é triste. Isso é urgência com sentido",
      "É quando a cortina cai que a janela se abre",
      "Não somos mais, nem menos. Somos parte"
    ]
  },
  {
    id: "letter-from-impossible-practitioner",
    title: "Carta de um Praticante do Impossível",
    content: `Eu acredito na dignidade como direito de todos. Acredito no afeto, no cuidado, no amor — não como privilégio, mas como base da vida.

E também acredito que a vida não é uma linha reta, nem uma sucessão de vitórias. A vida, pra mim, é feita de quedas, erros, desafios e frustrações. Mas isso não a torna menos plena. Pelo contrário. É exatamente aí que mora a plenitude.

É de vazio em vazio que a vida vai se enchendo. De gente verdadeira. Gente que olha no olho, que abraça com alma, que caminha junto nos altos e baixos. É nesse encontro que eu vejo algo divino — não num Deus distante, mas na humanidade compartilhada.

Einstein disse que há duas formas de viver: como se nada fosse milagre, ou como se tudo fosse. Eu escolho viver como se tudo fosse.

Por isso eu sou, com orgulho, um praticante do impossível. Porque não é sobre já saber viver. É sobre continuar aprendendo, mesmo depois de tudo. É sobre se abrir para o novo, mesmo quando o velho parece mais seguro.

É sobre sair do padrão, acreditar no milagre, e fazer da própria vida uma obra em construção.

Não estou no fim da jornada. Estou no começo de uma nova. E talvez seja isso que mais me move: saber que sempre dá pra recomeçar. Sempre dá pra viver de um jeito mais verdadeiro.

Assinado: Lelo, praticante do impossível.`,
    theme: "transformation",
    mood: "uplifting",
    phase: ["portais", "rituais", "encerramento"],
    audioNarration: "[NARRAÇÃO_CARTA_LELO]",
    backgroundMusic: "[MÚSICA_CARTA_PESSOAL]",
    estimatedReadTime: 4,
    keyQuotes: [
      "É de vazio em vazio que a vida vai se enchendo",
      "Sou, com orgulho, um praticante do impossível",
      "Sempre dá pra viver de um jeito mais verdadeiro"
    ],
    author: "Lelo (Daniel Allegri)",
    originalSource: "Carta pessoal"
  },
  {
    id: "this-too-shall-pass",
    title: "Isso Também Passará",
    content: `Antes de receber uma imagem emocional, um rei venceu uma batalha e sentiu-se invencível. Quando uma onda de elogios o cercava entre esses espelhos, pensando nessa instabilidade, ele pediu ajuda de um sábio.

O mestre entregou um anel com uma inscrição simples: "Isso também passará."

Lui ficou intrigado. O mestre explicou: "Use este anel em todos os momentos. Ele lembrará que nem a glória nem a dor duram para sempre."

Com o tempo, Lui aprendeu a agir com equilíbrio. Nas vitórias, lembrou-se de ser humilde. Nas crises, encontrou força para seguir em frente.

Essa lição vale até hoje, especialmente no esporte e na vida. Um exemplo marcante é Rafael Nadal. Com sua trajetória de resiliência, em 2009, após dominar o tênis mundial, ele enfrentou lesões graves e uma derrota inesperada e prolongada. Muitos acreditaram que sua carreira chegaria ao fim.

Mas quando surgiu a dificuldade, Nadal entendeu que as adversidades eram temporárias. Aceitou o momento ruim, ajustou a técnica e trabalhou incansavelmente.

Em 2013, ele retornou triunfal, vencendo dois Grand Slams e retornando ao posto de número um.

A lição, tanto na vida quanto no esporte: tudo é transitório. O segredo está no equilíbrio. Agir com modéstia nas vitórias e resiliência nas adversidades.

Porque isso também passará - tanto a dor quanto a glória.`,
    theme: "wisdom",
    mood: "peaceful",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_ISSO_PASSARÁ]",
    backgroundMusic: "[MÚSICA_SABEDORIA_ATEMPORAL]",
    estimatedReadTime: 4,
    keyQuotes: [
      "Nem a glória nem a dor duram para sempre",
      "Tudo é transitório. O segredo está no equilíbrio",
      "Isso também passará - tanto a dor quanto a glória"
    ]
  },
  {
    id: "now-is-innovation",
    title: "O Agora é Inovação",
    content: `Uma pessoa comum, quando domina o agora, se torna uma poderosa inovadora do futuro. Mas só é inovadora se age no presente.

Não importa se você é dono de uma grande empresa, um profissional liberal ou uma pessoa comum que ama a vida — quando suas habilidades encontram desafios compatíveis, nasce o flow, e o flow nos leva a evoluir: como seres humanos e como profissionais.

Estar no presente é o melhor jeito de construir o futuro. Não adianta viver no futuro e achar que ele vai se realizar por si só. A construção começa aqui.

Se não estivermos presentes para realizar, nada se concretiza. Fica só no campo da ilusão.

A inovação nasce da presença. E a evolução profissional também nasce da evolução espiritual — não no sentido religioso, mas no sentido de propósito, entrega e significado.

O flow é esse estado onde o tempo para, onde você está completamente absorto no que faz, onde suas capacidades se alinham perfeitamente com o desafio à sua frente.

É nesse estado que as melhores ideias nascem. É nesse estado que a inovação acontece. É nesse estado que você se torna a melhor versão de si mesmo.

E tudo começa com uma escolha simples: estar presente. Aqui. Agora.

Pensa nisso. E vem comigo. Uma pessoa comum.`,
    theme: "purpose",
    mood: "motivational",
    phase: ["clareira", "chamado", "bem-estar"],
    audioNarration: "[NARRAÇÃO_AGORA_INOVAÇÃO]",
    backgroundMusic: "[MÚSICA_FLOW_CONCENTRAÇÃO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Uma pessoa comum, quando domina o agora, se torna inovadora do futuro",
      "A inovação nasce da presença",
      "Estar no presente é o melhor jeito de construir o futuro"
    ],
    author: "Lelo (Daniel Allegri)",
    originalSource: "Reflexões sobre inovação e presença"
  },
  {
    id: "rhythm-and-strategy",
    title: "Ritmo e Estratégia",
    content: `Você está no desafio da mesma montanha em que um grupo, levando mochilas carregadas e lutando contra o ar rarefeito a 10 mil pés, começa a se espalhar.

O grupo da frente vai desaparecendo de vista enquanto o grupo de trás vai se atrasando no terreno íngreme da montanha. Sentindo-se exaustos e frustrados, eles pensam em desistir.

Sob a orientação do seu líder, eles experimentam uma nova abordagem: o ritmo. Começam o primeiro compasso depois de uma pausa para regular a respiração. Depois eles ajustam o ritmo novamente, mudando para alguns passos. E uma única respiração de descanso.

Eles estão se movendo e permaneceram descansados ao mesmo tempo.

Quando o grupo de trás chega ao topo, sua atitude muda completamente. A pressão se alivia. Eles passaram pelo grupo da frente, que havia desmaiado de fadiga ou pelos efeitos extremos da pressa descontrolada. Foram rápidos demais.

Segundo a Lei de Amara, tendemos a superestimar o curto prazo e subestimar o longo prazo. Só que direção e ritmo valem mais do que velocidade pura.

A estratégia é ampliar a visão, encontrando o ritmo certo entre movimento e descanso, numa velocidade consistente.

O "outro prazo" de hoje já é o longo prazo de amanhã.

Na vida, como na montanha, não é sobre correr mais rápido que os outros. É sobre encontrar seu ritmo sustentável, respirar conscientemente, e manter a direção certa.

Pensa nisso e utilize essa estratégia a seu favor. Você está subindo sua própria montanha.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["bem-estar", "transicao", "encerramento"],
    audioNarration: "[NARRAÇÃO_RITMO_ESTRATÉGIA]",
    backgroundMusic: "[SOM_MONTANHA_RESPIRAÇÃO]",
    estimatedReadTime: 4,
    keyQuotes: [
      "Direção e ritmo valem mais do que velocidade pura",
      "Encontrar o ritmo certo entre movimento e descanso",
      "Não é sobre correr mais rápido, é sobre encontrar seu ritmo sustentável"
    ]
  }
];

export const getTextsByTheme = (theme: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.theme === theme);
};

export const getTextsByPhase = (phase: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.phase.includes(phase));
};

export const getTextsByMood = (mood: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.mood === mood);
};

export const getRandomText = (): InspirationalText => {
  return inspirationalTexts[Math.floor(Math.random() * inspirationalTexts.length)];
};

export const getTextById = (id: string): InspirationalText | undefined => {
  return inspirationalTexts.find(text => text.id === id);
};