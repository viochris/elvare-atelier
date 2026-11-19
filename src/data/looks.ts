export interface LookItem {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly collection: string;
  readonly editorialNote: string;
  readonly silhouette: string;
  readonly fabric: string;
  readonly craftDetail: string;
  readonly image: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly aspectClass: string;
}

export const COLLECTION_LOOKS: readonly LookItem[] = [
  {
    id: 'look-01',
    number: 'LOOK 01',
    title: "L'OMBRE TRENCH",
    collection: 'ARCHITECTURAL OUTERWEAR',
    editorialNote:
      'Double-breasted obsidian virgin wool sculpted with razor-sharp shoulder architecture and elongated storm lapels.',
    silhouette:
      'Extended floor-grazing A-line volume balanced by a severe geometric shoulder and fluid double-pleated trousers.',
    fabric: '100% Double-Faced Italian Virgin Wool Gabardine (540gsm), Cupro Twill Lining',
    craftDetail: 'Hand-felled collar stand, concealed horn buttons, raw-edge internal taping.',
    image: '/images/look-01.jpg',
    alt: 'Model wearing Look 01 L Ombre Trench, a double-breasted obsidian virgin wool coat with structured shoulders and wide-leg trousers against warm plaster.',
    width: 900,
    height: 1200,
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'look-02',
    number: 'LOOK 02',
    title: 'IVOIRE DRAPED COLUMN',
    collection: 'EVENING & FLUID SILK',
    editorialNote:
      'Floor-length warm ivory heavy silk crepe suspended from an asymmetrical bias-cut cowl shoulder.',
    silhouette:
      'Uninterrupted vertical column cut on the bias to follow natural movement without rigid boning or darts.',
    fabric: '100% Heavyweight Mulberry Silk Crêpe de Chine (32 momme), Warm Ivory Dye',
    craftDetail: 'Single-seam French finishing, weighted silk hem for controlled drape.',
    image: '/images/look-02.jpg',
    alt: 'Model wearing Look 02 Ivoire Draped Column, a floor-length warm ivory silk crepe gown with asymmetrical draped neckline against dark plaster.',
    width: 900,
    height: 1200,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'look-03',
    number: 'LOOK 03',
    title: 'STRUCTURE TAILLEUR',
    collection: 'ATELIER TAILORING',
    editorialNote:
      'Single-button charcoal melange blazer engineered with elongated sleeves over wide-leg fluid wool trousers.',
    silhouette:
      'Relaxed masculine torso softened by low-slung waist tailoring and sweeping trouser volume.',
    fabric: '85% Super 150s Merino Wool, 15% Mongolian Cashmere Melange, Silk Camisole Base',
    craftDetail: 'Floating horsehair chest canvas, hand-worked Milanese lapel buttonhole.',
    image: '/images/look-03.jpg',
    alt: 'Model wearing Look 03 Structure Tailleur, an oversized charcoal melange wool-cashmere blazer and wide trousers over ivory silk.',
    width: 900,
    height: 1200,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'look-04',
    number: 'LOOK 04',
    title: 'NOCTURNE LEATHER COAT',
    collection: 'SIGNATURE OUTERWEAR',
    editorialNote:
      'Full-length matte black lambskin coat layered over fine-gauge ivory merino knitwear and charcoal wool.',
    silhouette:
      'Narrow elongated duster proportion engineered to move cleanly in stride with minimal hardware.',
    fabric: 'Full-Grain Matte Plongé Lambskin, Fine-Gauge 18gg Ivory Merino Knit',
    craftDetail: 'Skived flatlock seams, tonal saddle-stitched belt loops, silk sleeve lining.',
    image: '/images/look-04.jpg',
    alt: 'Model in mid-stride wearing Look 04 Nocturne Leather Coat, a full-length matte black lambskin coat over an ivory turtleneck.',
    width: 900,
    height: 1200,
    aspectClass: 'aspect-[3/4]',
  },
] as const;

export const ATELIER_SALONS = [
  { id: 'paris', label: 'Paris · Rue Saint-Honoré Salon' },
  { id: 'milan', label: 'Milan · Via Brera Atelier' },
  { id: 'private', label: 'Private Virtual Consultation' },
] as const;
