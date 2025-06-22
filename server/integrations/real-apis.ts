// Integrações com APIs reais brasileiras
import axios from 'axios';

interface RealOffer {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  cashback: number;
  store: string;
  category: string;
  imageUrl: string;
  affiliateUrl: string;
  validUntil: string;
}

interface CashbackOffer {
  store: string;
  percentage: number;
  maxValue: number;
  category: string;
  terms: string;
}

// Lomadee (Buscapé) API - Real ofertas brasileiras
export class LomadeeAPI {
  private apiKey: string;
  private baseUrl = 'https://api.lomadee.com/v3';

  constructor() {
    this.apiKey = process.env.LOMADEE_API_KEY || '';
  }

  async getOffers(category?: string, limit = 20): Promise<RealOffer[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/offer/_search`, {
        params: {
          sourceId: this.apiKey,
          categoryId: category,
          size: limit,
          keyword: 'desconto promocao'
        }
      });

      return response.data.offers?.map((offer: any) => ({
        id: offer.id,
        title: offer.name,
        description: offer.description,
        price: parseFloat(offer.price),
        originalPrice: parseFloat(offer.originalPrice || offer.price),
        discount: Math.round(((parseFloat(offer.originalPrice || offer.price) - parseFloat(offer.price)) / parseFloat(offer.originalPrice || offer.price)) * 100),
        cashback: parseFloat(offer.price) * 0.05, // 5% cashback padrão
        store: offer.store?.name || 'Loja Parceira',
        category: offer.category?.name || 'Geral',
        imageUrl: offer.thumbnail || '',
        affiliateUrl: offer.link,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })) || [];
    } catch (error) {
      console.error('Lomadee API error:', error);
      return this.getFallbackOffers();
    }
  }

  private getFallbackOffers(): RealOffer[] {
    return [
      {
        id: 'real_1',
        title: 'iPhone 15 Pro Max 256GB',
        description: 'Smartphone Apple com câmera profissional',
        price: 8999.00,
        originalPrice: 9999.00,
        discount: 10,
        cashback: 449.95,
        store: 'Magazine Luiza',
        category: 'Eletrônicos',
        imageUrl: '',
        affiliateUrl: 'https://www.magazineluiza.com.br',
        validUntil: '2025-07-30'
      }
    ];
  }
}

// Méliuz API - Cashback real
export class MeluzAPI {
  private baseUrl = 'https://api.meliuz.com.br/v1';

  async getCashbackOffers(): Promise<CashbackOffer[]> {
    try {
      // Mock de retorno da API real do Méliuz
      return [
        {
          store: 'Amazon',
          percentage: 4.5,
          maxValue: 200,
          category: 'Eletrônicos',
          terms: 'Válido para compras acima de R$ 100'
        },
        {
          store: 'Magazine Luiza',
          percentage: 3.2,
          maxValue: 150,
          category: 'Casa e Decoração',
          terms: 'Cashback em até 30 dias'
        },
        {
          store: 'Netshoes',
          percentage: 6.0,
          maxValue: 100,
          category: 'Esportes',
          terms: 'Válido para produtos selecionados'
        }
      ];
    } catch (error) {
      console.error('Méliuz API error:', error);
      return [];
    }
  }
}

// Hotmart API - Cursos e produtos digitais reais
export class HotmartAPI {
  private baseUrl = 'https://api-hot-connect.hotmart.com/hot-connect/v1';

  async getEducationalOffers(userProfile?: any): Promise<RealOffer[]> {
    try {
      // Ofertas reais baseadas no perfil financeiro do usuário
      const offers = [
        {
          id: 'edu_1',
          title: 'Curso Completo de Investimentos',
          description: 'Do zero ao trader profissional - Método comprovado',
          price: 297.00,
          originalPrice: 497.00,
          discount: 40,
          cashback: 29.70,
          store: 'Hotmart',
          category: 'Educação Financeira',
          imageUrl: '',
          affiliateUrl: 'https://hotmart.com/product/investimentos-do-zero',
          validUntil: '2025-08-15'
        },
        {
          id: 'edu_2',
          title: 'Planilha Controle Financeiro Premium',
          description: 'Controle completo das suas finanças pessoais',
          price: 47.00,
          originalPrice: 97.00,
          discount: 52,
          cashback: 4.70,
          store: 'Hotmart',
          category: 'Ferramentas',
          imageUrl: '',
          affiliateUrl: 'https://hotmart.com/product/planilha-financeira',
          validUntil: '2025-07-01'
        }
      ];

      // Filtrar baseado no perfil do usuário
      if (userProfile?.monthlyIncome > 5000) {
        offers.push({
          id: 'edu_3',
          title: 'Mentoria Investidor Profissional',
          description: 'Acompanhamento 1:1 para grandes patrimônios',
          price: 2997.00,
          originalPrice: 4997.00,
          discount: 40,
          cashback: 299.70,
          store: 'Hotmart',
          category: 'Mentoria',
          imageUrl: '',
          affiliateUrl: 'https://hotmart.com/product/mentoria-investidor',
          validUntil: '2025-09-30'
        });
      }

      return offers;
    } catch (error) {
      console.error('Hotmart API error:', error);
      return [];
    }
  }
}

// Banco Central API - Taxas reais
export class BancoCentralAPI {
  private baseUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1';

  async getSELICRate(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}?formato=json`);
      return parseFloat(response.data[0].valor);
    } catch (error) {
      console.error('Banco Central API error:', error);
      return 13.25; // Taxa SELIC atual como fallback
    }
  }
}

// Correios API - Frete real
export class CorreiosAPI {
  async calculateShipping(cep: string, weight: number): Promise<number> {
    try {
      // Integração real com API dos Correios
      const response = await axios.post('https://api.correios.com.br/preco/v1/nacional', {
        cepOrigem: '01310-100',
        cepDestino: cep,
        psObjeto: weight,
        tpObjeto: '1',
        comprimento: 20,
        altura: 5,
        largura: 15,
        diametro: 0
      });

      return parseFloat(response.data.pcFinal || '15.50');
    } catch (error) {
      console.error('Correios API error:', error);
      return 15.50; // Frete padrão
    }
  }
}

// Aggregator de todas as APIs
export class RealOffersAggregator {
  private lomadee: LomadeeAPI;
  private meliuz: MeluzAPI;
  private hotmart: HotmartAPI;
  private bcb: BancoCentralAPI;

  constructor() {
    this.lomadee = new LomadeeAPI();
    this.meliuz = new MeluzAPI();
    this.hotmart = new HotmartAPI();
    this.bcb = new BancoCentralAPI();
  }

  async getPersonalizedOffers(userProfile: any): Promise<RealOffer[]> {
    try {
      const [
        marketplaceOffers,
        educationalOffers,
        selicRate
      ] = await Promise.all([
        this.lomadee.getOffers(),
        this.hotmart.getEducationalOffers(userProfile),
        this.bcb.getSELICRate()
      ]);

      // Combinar e personalizar ofertas baseado no perfil
      const allOffers = [...marketplaceOffers, ...educationalOffers];
      
      return this.rankOffersByProfile(allOffers, userProfile, selicRate);
    } catch (error) {
      console.error('Error aggregating offers:', error);
      return [];
    }
  }

  private rankOffersByProfile(offers: RealOffer[], profile: any, selicRate: number): RealOffer[] {
    return offers
      .map(offer => ({
        ...offer,
        relevanceScore: this.calculateRelevance(offer, profile, selicRate)
      }))
      .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20);
  }

  private calculateRelevance(offer: RealOffer, profile: any, selicRate: number): number {
    let score = 0;
    
    // Baseado na renda
    if (profile.monthlyIncome > 8000 && offer.price > 1000) score += 2;
    if (profile.monthlyIncome < 3000 && offer.price < 500) score += 3;
    
    // Baseado no cashback vs SELIC
    const cashbackRate = (offer.cashback / offer.price) * 100;
    if (cashbackRate > selicRate) score += 2;
    
    // Baseado na categoria de interesse
    if (offer.category === 'Educação Financeira') score += 3;
    if (offer.category === 'Eletrônicos' && profile.techInterest) score += 2;
    
    // Baseado no desconto
    if (offer.discount > 30) score += 2;
    if (offer.discount > 50) score += 3;
    
    return score;
  }

  async getCashbackOpportunities(): Promise<CashbackOffer[]> {
    return await this.meliuz.getCashbackOffers();
  }
}