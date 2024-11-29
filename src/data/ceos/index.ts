import { CEOInfo } from '../../types';

// Import all CEO records
import christianKlein from './christian-klein.json';
import sanjayBrahmawar from './sanjay-brahmawar.json';
import oliverSteil from './oliver-steil.json';
import yvesPadrines from './yves-padrines.json';
import michaelMohr from './michael-mohr.json';
import timCook from './tim-cook.json';
import satyaNadella from './satya-nadella.json';
import billGates from './bill-gates.json';
import markZuckerberg from './mark-zuckerberg.json';
import sundarPichai from './sundar-pichai.json';
import jensenHuang from './jensen-huang.json';
import andyJassy from './andy-jassy.json';
import donaldTrump from './donald-trump.json';
import elonMusk from './elon-musk.json';

// Export map of CEOs by name
export const ceos: { [key: string]: CEOInfo } = {
  'Christian Klein': christianKlein,
  'Sanjay Brahmawar': sanjayBrahmawar,
  'Oliver Steil': oliverSteil,
  'Yves Padrines': yvesPadrines,
  'Michael Mohr': michaelMohr,
  'Tim Cook': timCook,
  'Satya Nadella': satyaNadella,
  'Bill Gates': billGates,
  'Mark Zuckerberg': markZuckerberg,
  'Sundar Pichai': sundarPichai,
  'Jensen Huang': jensenHuang,
  'Andy Jassy': andyJassy,
  'Donald J. Trump': donaldTrump,
  'Elon Musk': elonMusk
};

// Export function to get CEO info
export const getCEOInfo = (name: string): CEOInfo | undefined => {
  return ceos[name];
};